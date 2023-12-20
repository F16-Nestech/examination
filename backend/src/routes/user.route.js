import express from 'express';
import * as userController from '../controllers/user.controller.js';
import {
  verifyUser,
  verifyTeacherOrAdmin,
  verifyAdmin,
} from '../middlewares/auth.middleware.js';

const userRoute = express.Router();

// API
userRoute.get('/', verifyUser, userController.getAllUsers);
userRoute.post('/', verifyTeacherOrAdmin, userController.createUser);
userRoute.get('/:id', verifyUser, userController.getUserById);
userRoute.put('/:id', verifyUser, userController.updateUserById);
userRoute.delete('/:id', verifyAdmin, userController.deleteUserById);

userRoute.patch('/:id/role', verifyAdmin, userController.updateUserRole);
userRoute.patch('/:id/pwd', verifyUser, userController.updateUserPassword);

export default userRoute;
