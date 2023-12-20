import express from 'express';
import * as classController from '../controllers/class.controller.js';
import {
  verifyUser,
  verifyTeacherOrAdmin,
} from '../middlewares/auth.middleware.js';

const classRoute = express.Router();

classRoute.get('/', verifyUser, classController.getAllClasses);
classRoute.get('/:id', verifyUser, classController.getClassById);
classRoute.post('/', verifyTeacherOrAdmin, classController.createClass);
classRoute.delete(
  '/:id',
  verifyTeacherOrAdmin,
  classController.deleteClassById
);
classRoute.put('/:id', verifyTeacherOrAdmin, classController.updateClassById);

export default classRoute;
