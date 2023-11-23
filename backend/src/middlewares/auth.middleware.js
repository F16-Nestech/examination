import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config.js';
import User from '../models/user.model.js';
import { userRoles } from '../config/user.js';

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
          req.user = user;
          next();
        } else {
          return res.status(StatusCodes.FORBIDDEN).json({
            type: 'Error',
            message: 'User relate with token not found',
          });
        }
      } else {
        return res.status(StatusCodes.FORBIDDEN).json({
          type: 'Error',
          message: 'Token is invalid',
        });
      }
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        type: 'Error',
        message: err.message,
      });
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      type: 'Error',
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
        type: 'Error',
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
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ type: 'Error', message: 'You do not have access right' });
    }
  });
};
