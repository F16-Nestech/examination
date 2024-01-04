import { userRoles } from '../config/user.js';
import Result from '../models/result.model.js';
import * as ApiService from '../services/api.service.js';

const STUDENT_ID_KEY = 'student_id';

export const createResult = async (req, res) => {
  const { test_id, answers } = req.body;

  await ApiService.create(
    Result,
    { body: { [STUDENT_ID_KEY]: req.user._id, test_id, answers } },
    res
  );
};

export const getAllResults = async (req, res) => {
  const { _id, role } = req.user;
  if (role === userRoles.ADMIN || userRoles.TEACHER) {
    return await ApiService.listAll(Result, req, res);
  }
  await ApiService.listAllByOwner(Result, req, res, STUDENT_ID_KEY);
};

export const getResultById = async (req, res) => {
  await ApiService.read(Result, req, res);
};

export const deleteResultById = async (req, res) => {
  await ApiService.removeByOwner(Result, req, res, STUDENT_ID_KEY);
};

export const updateResultById = async (req, res) => {
  // update answers, is_end_test
  const { answers, is_end_test } = req.body;
  await ApiService.update(
    Result,
    { body: { answers, is_end_test } },
    res,
    STUDENT_ID_KEY
  );
};
