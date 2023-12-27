import Question from '../models/question.model.js';
import * as ApiService from '../services/api.service.js';

const TEACHER_ID_KEY = 'teacher_id';

export const createQuestion = async (req, res) => {
  const { subject, grade, is_multi_choice, content, choices, correct_answer } =
    req.body;
  await ApiService.create(
    Question,
    {
      body: {
        teacher_id: req.user._id,
        subject,
        grade,
        is_multi_choice,
        content,
        choices,
        correct_answer,
      },
    },
    res
  );
};

export const getAllQuestions = async (req, res) => {
  await ApiService.listAllByOwner(Question, req, res, TEACHER_ID_KEY);
};

export const getQuestionById = async (req, res) => {
  await ApiService.readByOwner(Question, req, res, TEACHER_ID_KEY);
};

export const deleteQuestionById = async (req, res) => {
  await ApiService.removeByOwner(Question, req, res, TEACHER_ID_KEY);
};

export const updateQuestionById = async (req, res) => {
  await ApiService.update(Question, req, res, TEACHER_ID_KEY);
};
