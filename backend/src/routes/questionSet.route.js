import express from 'express';
import * as questionSetController from '../controllers/questionSet.controller.js';
import { verifyTeacherOrAdmin } from '../middlewares/auth.middleware.js';

const questionSetRoute = express.Router();

questionSetRoute.get(
  '/',
  verifyTeacherOrAdmin,
  questionSetController.getAllQuestionSets
);
questionSetRoute.get(
  '/:id',
  verifyTeacherOrAdmin,
  questionSetController.getQuestionSetById
);
questionSetRoute.post(
  '/',
  verifyTeacherOrAdmin,
  questionSetController.createQuestionSet
);
questionSetRoute.delete(
  '/:id',
  verifyTeacherOrAdmin,
  questionSetController.deleteQuestionSetById
);
questionSetRoute.put(
  '/:id',
  verifyTeacherOrAdmin,
  questionSetController.updateQuestionSetById
);

export default questionSetRoute;
