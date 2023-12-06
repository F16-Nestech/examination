import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import { userRoles } from '../config/user.js';
import responseTypes from '../config/responseType.js';

export const queryAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    return {
      type: responseTypes.SUCCESS,
      message: 'Successful query all users',
      statusCode: StatusCodes.OK,
      users,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const queryUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');

    if (!user) {
      return {
        type: responseTypes.ERROR,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }

    return {
      type: responseTypes.SUCCESS,
      message: 'Successful get user',
      statusCode: StatusCodes.OK,
      user,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

const salt = bcrypt.genSaltSync(10);

export const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const isUsernameValid = (username) => {
  return username.match(/[a-zA-Z0-9]{4-20}/);
};

const isPasswordValid = (password, username) => {
  return (
    password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ) && !password.includes(username)
  );
};

export const createNewUser = async (body) => {
  const { username, name, password } = body;

  // check field required
  if (!username || !name || !password) {
    return {
      type: responseTypes.ERROR,
      message: 'fieldsRequired',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
  // check username valid
  if (!isUsernameValid) {
    return {
      type: responseTypes.ERROR,
      message: 'username valid error',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // check username exist
  const isUsernameTaken = await User.isUsernameTaken(username);
  if (isUsernameTaken) {
    return {
      type: responseTypes.ERROR,
      message: 'username taken',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // check password
  if (!isPasswordValid(password, username)) {
    return {
      type: responseTypes.ERROR,
      message: 'Password valid error',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const hashPass = hashUserPassword(password);
  try {
    let user = await User.create({
      username,
      name,
      password: hashPass,
      role: userRoles.STUDENT,
    });

    await user.save();

    return {
      type: responseTypes.SUCCESS,
      message: 'Successful create new user',
      statusCode: StatusCodes.CREATED,
      user,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      user,
    };
  }
};

export const removeUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return {
        type: responseTypes.ERROR,
        message: 'user not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }
    return {
      type: responseTypes.SUCCESS,
      message: 'Successful delete user',
      statusCode: StatusCodes.OK,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const changeInfo = async (id, name, subject) => {
  try {
    const { name, subject } = info;
    const user = await User.findByIdAndUpdate(id, { name, subject });
    if (!user) {
      return {
        type: responseTypes.ERROR,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }
    return {
      type: responseTypes.SUCCESS,
      message: 'Update user info success',
      statusCode: StatusCodes.OK,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const changePassword = async (id, password) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return {
        type: responseTypes.ERROR,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }
    if (!isPasswordValid(password, user.username)) {
      return {
        type: responseTypes.ERROR,
        message: 'Password valid error',
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }
    const hashPass = hashUserPassword(password);
    await User.findByIdAndUpdate(id, { password: hashPass });
    return {
      type: responseTypes.SUCCESS,
      message: 'Update password success',
      statusCode: StatusCodes.OK,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const changeRole = async (id, role) => {
  try {
    if (!Object.values(userRoles).includes(role)) {
      return {
        type: responseTypes.ERROR,
        message: 'Role invalid',
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    const user = await User.findByIdAndUpdate(id, { role });
    if (!user) {
      return {
        type: responseTypes.ERROR,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      };
    }
    return {
      type: responseTypes.SUCCESS,
      message: 'Change role success',
      statusCode: StatusCodes.OK,
    };
  } catch (err) {
    return {
      type: responseTypes.ERROR,
      message: err.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
