import express from 'express';
import * as testController from '../controllers/test.controller.js';
import {
  verifyUser,
  verifyTeacherOrAdmin,
} from '../middlewares/auth.middleware.js';

const testRoute = express.Router();

testRoute.get('/', verifyUser, testController.getAllTests);
testRoute.get('/:id', verifyUser, testController.getTestById);
testRoute.post('/', verifyTeacherOrAdmin, testController.createTest);
testRoute.delete('/:id', verifyTeacherOrAdmin, testController.deleteTestById);
testRoute.put('/:id', verifyTeacherOrAdmin, testController.updateTestById);

export default testRoute;
