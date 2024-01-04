import QuestionSet from '../models/questionSet.model.js';
import * as ApiService from '../services/api.service.js';
import Question from '../models/question.model.js';
import { StatusCodes } from 'http-status-codes';

const TEACHER_ID_KEY = 'teacher_id';

export const createQuestionSet = async (req, res) => {
  const { _id, question_ids } = req.body;
  if (question_ids !== undefined) {
    const isValidQuestionIds = await ApiService.verifyDocIds(
      question_ids,
      Question,
      res
    );
    if (isValidQuestionIds) {
      return await ApiService.create(
        QuestionSet,
        { body: { ...req.body, [TEACHER_ID_KEY]: _id } },
        res
      );
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        type: responseTypes.ERROR,
        message: 'Invalid question',
      });
    }
  } else {
    return await ApiService.create(
      QuestionSet,
      { body: { ...req.body, [TEACHER_ID_KEY]: _id } },
      res
    );
  }
};
export const getAllQuestionSets = async (req, res) => {
  await ApiService.listAllByOwner(QuestionSet, req, res, TEACHER_ID_KEY);
};

export const getQuestionSetById = async (req, res) => {
  await ApiService.readByOwner(QuestionSet, req, res, TEACHER_ID_KEY);
};

export const deleteQuestionSetById = async (req, res) => {
  await ApiService.remove(QuestionSet, req, res, TEACHER_ID_KEY);
};

export const updateQuestionSetById = async (req, res) => {
  const { question_ids } = req.body;
  if (question_ids !== undefined) {
    const isValidQuestionIds = await ApiService.verifyDocIds(
      question_ids,
      Question,
      res
    );
    if (isValidQuestionIds) {
      return await ApiService.update(QuestionSet, req, res, TEACHER_ID_KEY);
    }
  } else {
    return await ApiService.update(QuestionSet, req, res, TEACHER_ID_KEY);
  }
};
