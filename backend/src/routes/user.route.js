import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  updateUserRole,
  updateUserPassword,
} from '../controllers/user.controller.js';
import {
  verifyUser,
  verifyTeacherOrAdmin,
  verifyAdmin,
} from '../middlewares/auth.middleware.js';

const userRoute = express.Router();

// API
userRoute.get('/', verifyUser, getAllUsers);
userRoute.post('/', verifyTeacherOrAdmin, createUser);
userRoute.get('/:id', verifyUser, getUserById);
userRoute.put('/:id', verifyUser, updateUserById);
userRoute.delete('/:id', verifyAdmin, deleteUserById);

userRoute.patch('/:id/role', verifyAdmin, updateUserRole);
userRoute.patch('/:id/pwd', verifyUser, updateUserPassword);

export default userRoute;
