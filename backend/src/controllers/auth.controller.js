import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';
import {
  login as userLogin,
  generateAccessTokens,
} from '../services/auth.service.js';
import Token from '../models/token.model.js';

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
      Token.deleteOne({ token });
      return res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: 'Refresh token expired',
      });
    }

    const accessToken = generateAccessTokens(doc.user_id);
    return res.status(StatusCodes.OK).json({
      type: responseTypes.ERROR,
      message: 'Generate access token success',
      accessToken,
    });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
