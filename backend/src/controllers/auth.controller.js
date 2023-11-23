import { StatusCodes } from 'http-status-codes';
import { login as userLogin } from '../services/auth.service.js';

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
    user,
    tokens,
  });
};
