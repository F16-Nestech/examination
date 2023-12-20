import express from 'express';
import * as questionController from '../controllers/question.controller.js';
import {
  verifyUser,
  verifyTeacherOrAdmin,
} from '../middlewares/auth.middleware.js';

const questionRoute = express.Router();
questionRoute.get('/', verifyUser, questionController.getAllQuestions);
questionRoute.get('/:id', verifyUser, questionController.getQuestionById);
questionRoute.post(
  '/',
  verifyTeacherOrAdmin,
  questionController.createQuestion
);
questionRoute.delete(
  '/:id',
  verifyTeacherOrAdmin,
  questionController.deleteQuestionById
);
questionRoute.put(
  '/:id',
  verifyTeacherOrAdmin,
  questionController.updateQuestionById
);

export default questionRoute;
