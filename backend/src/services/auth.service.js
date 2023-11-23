import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import Token from '../models/token.model.js';
import config from '../config/config.js';
import tokenTypes from '../config/token.js';

export const generateToken = (userId, expires, type) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, config.jwt.secret);
};

export const saveToken = async (token, userId, expires, type) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
  });

  return tokenDoc;
};

export const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );

  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );

  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    accessToken,
    refreshToken,
  };
};

const checkPassword = async (user, password) => {
  try {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return null;
    } else {
      return 'Password not match';
    }
  } catch (err) {
    return err.message;
  }
};

export const login = async (username, password) => {
  if (!username || !password) {
    return {
      type: 'Error',
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Bad request',
    };
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    return {
      type: 'Error',
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found',
    };
  }

  const result = await checkPassword(user, password);

  if (result) {
    return {
      type: 'Error',
      statusCode: StatusCodes.UNAUTHORIZED,
      message: result,
    };
  }

  const tokens = await generateAuthTokens(user);

  // user.password = undefined;
  delete user._doc.password;

  return {
    type: 'Success',
    statusCode: StatusCodes.OK,
    message: 'Login success',
    user,
    tokens,
  };
};
