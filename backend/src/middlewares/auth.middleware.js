import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config.js';
import User from '../models/user.model.js';
import { userRoles } from '../config/user.js';
import responseTypes from '../config/responseType.js';

export const verifyUser = async (req, res, next) => {
  // Get token
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // check token in token header
  if (token) {
    try {
      const doc = jwt.verify(token, config.jwt.secret);
      if (doc) {
        // search user
        const user_id = doc.sub;
        const user = await User.findById(user_id);
        if (user) {
          if (user.is_blocked) {
            return res.status(StatusCodes.FORBIDDEN).json({
              type: responseTypes.ERROR,
              message: 'You have been blocked',
            });
          }
          req.user = user;
          next();
        } else {
          return res.status(StatusCodes.FORBIDDEN).json({
            type: responseTypes.ERROR,
            message: 'User relate with token not found',
          });
        }
      } else {
        return res.status(StatusCodes.FORBIDDEN).json({
          type: responseTypes.ERROR,
          message: 'Token is invalid',
        });
      }
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: err.message,
      });
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      type: responseTypes.ERROR,
      message: 'You are not authenticated',
    });
  }
};

export const verifyTeacherOrAdmin = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (
      req.user.role === userRoles.TEACHER ||
      req.user.role === userRoles.ADMIN
    ) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: 'You do not have access right',
      });
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role === userRoles.ADMIN) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json({
        type: responseTypes.ERROR,
        message: 'You do not have access right',
      });
    }
  });
};
