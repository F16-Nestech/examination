import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';
import {
  login as userLogin,
  generateAccessTokens,
} from '../services/auth.service.js';
import Token from '../models/token.model.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const { type, message, statusCode, user, tokens } = await userLogin(
    username,
    password
  );

  if (statusCode !== StatusCodes.OK) {
    return res.status(statusCode).json({
      type,
      message,
    });
  }

  return res.status(statusCode).json({
    type,
    message,
    result: user,
    tokens,
  });
};

export const refreshToken = async (req, res) => {
  // Get token
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const doc = Token.findOne({ token: token });
    if (!doc) {
      return res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: 'Refresh token not found',
      });
    }
    if (doc.expires < Date.now()) {
      await Token.deleteOne({ token });
      return res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: 'Refresh token expired',
      });
    }

    const jwtData = jwt.verify(token, config.jwt.secret);
    if (jwtData) {
      const user_id = jwtData.sub;
      const accessToken = await generateAccessTokens(user_id);
      return res.status(StatusCodes.OK).json({
        type: responseTypes.SUCCESS,
        message: 'Generate access token success',
        accessToken,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: responseTypes.ERROR,
        message: 'Check jwt error',
      });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  // Get token
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    await Token.deleteOne({ token });
    return res.status(StatusCodes.OK).json({
      type: responseTypes.SUCCESS,
      message: 'Logout success',
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
