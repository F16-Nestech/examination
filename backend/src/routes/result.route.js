import express from 'express';
import * as resultController from '../controllers/result.controller.js';
import {
  verifyUser,
  verifyTeacherOrAdmin,
} from '../middlewares/auth.middleware.js';

const resultRoute = express.Router();

resultRoute.get('/', verifyUser, resultController.getAllResults);
resultRoute.get('/:result_id', verifyUser, resultController.getResultById);
resultRoute.post('/', verifyTeacherOrAdmin, resultController.createResult);
resultRoute.delete(
  '/:id',
  verifyTeacherOrAdmin,
  resultController.deleteResultById
);
resultRoute.put('/id', verifyTeacherOrAdmin, resultController.updateResultById);

export default resultRoute;
