import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';
import Test from '../models/test.model.js';
import * as ApiService from '../services/api.service.js';

const TEACHER_ID_KEY = 'teacher_id';

export const createTest = async (req, res) => {
  const { question_ids } = req.body;
  const teacherId = req.user;
  if (question_ids !== undefined) {
    const isValidQuestionIds = await ApiService.verifyDocIds(
      question_ids,
      Question,
      res
    );
    if (!isValidQuestionIds) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        type: responseTypes.ERROR,
        message: 'Invalid question',
      });
    }
  }
  const testBody = question_ids
    ? { ...req.body, [TEACHER_ID_KEY]: teacherId._id }
    : { ...req.body, teacher_id: teacherId };
  return await ApiService.create(Test, { body: testBody }, res);
};

export const getAllTests = async (req, res) => {
  await ApiService.listAllByOwner(Test, req, res, TEACHER_ID_KEY);
};

export const getTestById = async (req, res) => {
  await ApiService.readByOwner(Test, req, res, TEACHER_ID_KEY);
};

export const deleteTestById = async (req, res) => {
  ApiService.removeByOwner(Test, req, res, TEACHER_ID_KEY);
};
export const updateTestById = async (req, res) => {
  await ApiService.create(Test, req, res, TEACHER_ID_KEY);
};
