import Question from '../models/question.model.js';
import * as ApiService from '../services/api.service.js';

export const createQuestion = async (req, res) => {
  await ApiService.create(Question, req, res);
};
export const getAllQuestions = async (req, res) => {
  await ApiService.listAll(Question, req, res);
};
export const getQuestionById = async (req, res) => {
  await ApiService.read(Question, req, res);
};
export const deleteQuestionById = async (req, res) => {
  const isHardDelete = req.query.hard_delete;
  if (isHardDelete) {
    return await ApiService.hardDelete(Question, req, res);
  } else {
    return await ApiService.softDelete(Question, req, res);
  }
};
export const updateQuestionById = async (req, res) => {
  await ApiService.update(Question, req, res);
};
