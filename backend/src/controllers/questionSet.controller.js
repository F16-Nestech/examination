import QuestionSet from '../models/questionSet.model.js';
import * as ApiService from '../services/api.service.js';
import Question from '../models/question.model.js';

export const createQuestionSet = async (req, res) => {
  const { question_ids } = req.body;
  if (question_ids !== undefined) {
    const isValidQuestionIds = await ApiService.verifyDocIds(
      question_ids,
      Question,
      res
    );
    if (isValidQuestionIds) {
      return await ApiService.create(QuestionSet, req, res);
    }
  } else {
    return await ApiService.create(QuestionSet, req, res);
  }
};
export const getAllQuestionSets = async (req, res) => {
  await ApiService.listAll(QuestionSet, req, res);
};
export const getQuestionSetById = async (req, res) => {
  await ApiService.read(QuestionSet, req, res);
};
export const deleteQuestionSetById = async (req, res) => {
  const isHardDelete = req.query.hard_delete;
  if (isHardDelete) {
    return await ApiService.hardDelete(QuestionSet, req, res);
  } else {
    return await ApiService.softDelete(QuestionSet, req, res);
  }
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
      return await ApiService.update(QuestionSet, req, res);
    }
  } else {
    return await ApiService.update(QuestionSet, req, res);
  }
};
