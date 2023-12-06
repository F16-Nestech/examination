import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';
import {
  queryAllUsers,
  createNewUser,
  queryUserById,
  removeUserById,
  changePassword,
  changeRole,
} from '../services/user.service.js';
import User from '../models/user.model.js';
import { isSubjectValid } from '../config/subject.js';
import { userRoles } from '../config/user.js';

export const getAllUsers = async (req, res) => {
  const { type, message, statusCode, users } = await queryAllUsers();

  if (statusCode !== StatusCodes.OK) {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  return res.status(statusCode).json({
    type,
    message,
    users,
  });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const { type, message, statusCode, user } = await queryUserById(id);

  if (statusCode !== StatusCodes.OK) {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  return res.status(statusCode).json({
    type,
    message,
    user,
  });
};

export const createUser = async (req, res) => {
  const { type, message, statusCode, user } = await createNewUser(req.body);
  return res.status(statusCode).json({
    type,
    message,
  });
};

export const updateUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: responseTypes.ERROR,
        message: 'User not found',
      });
    }

    // same role, different id
    if (req.user.role === user.role && req.user._id != id) {
      return res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: 'You can not change password of other users',
      });
    }

    // same id: teacher can change name, subject
    if (req.user._id == id) {
      if (req.body.subject && !isSubjectValid(req.body.subject)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          type: responseTypes.ERROR,
          message: 'Subject invalid',
        });
      } else {
        const editParams = {};
        if (req.body.name) editParams.name = req.body.name;
        if (req.body.subject && user.role === userRoles.TEACHER)
          editParams.subject = req.body.subject;

        await User.findByIdAndUpdate(id, editParams);

        return res.status(StatusCodes.OK).json({
          type: responseTypes.SUCCESS,
          message: 'Success',
        });
      }
    }

    // different id: teacher can: change name of student
    if (
      req.user._id != id &&
      req.user.role === userRoles.TEACHER &&
      user.role === userRoles.STUDENT
    ) {
      const editParams = {};
      if (req.body.name) editParams.name = req.body.name;

      await User.findByIdAndUpdate(id, editParams);

      return res.status(StatusCodes.OK).json({
        type: 'Success',
        message: 'Success',
      });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  const id = req.params.id;
  const { type, message, statusCode } = await changeRole(id, role);
  return res.status(statusCode).json({
    type,
    message,
  });
};

export const updateUserPassword = async (req, res) => {
  const id = req.params.id;

  if (req.user._id == id) {
    // check password match
    const isPasswordMatch = bcrypt.compareSync(
      req.body.current_password,
      req.user.password
    );
    if (isPasswordMatch) {
      const { type, message, statusCode } = await changePassword(
        id,
        req.body.new_password
      );
      return res.status(statusCode).json({
        type,
        message,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        type: responseTypes.ERROR,
        message: 'Password not match',
      });
    }
  }
  // teacher can change password of student, admin can change password of all user
  try {
    const user = User.findById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: responseTypes.ERROR,
        message: 'User not match',
      });
    }
    if (
      req.user.role === userRoles.ADMIN ||
      (req.user.role === userRoles.TEACHER && user.role === userRoles.STUDENT)
    ) {
      const { type, message, statusCode } = await changePassword(
        id,
        req.body.new_password
      );
      return res.status(statusCode).json({
        type,
        message,
      });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  const { type, message, statusCode, user } = await removeUserById(id);
  return res.status(statusCode).json({
    type,
    message,
  });
};
