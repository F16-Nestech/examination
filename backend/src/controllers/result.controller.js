import Result from '../models/result.model.js';
import * as ApiService from '../services/api.service.js';

export const createResult = async (req, res) => {
  await ApiService.create(Result, req, res);
};
export const getAllResults = async (req, res) => {
  await ApiService.listAll(Result, req, res);
};
export const getResultById = async (req, res) => {
  await ApiService.read(Result, req, res);
};
export const deleteResultById = async (req, res) => {
  await ApiService.softDelete(Result, req, res);
};
export const updateResultById = async (req, res) => {
  // update answers, is_end_test
  const { answers, is_end_test } = req.body;
  await ApiService.update(Result, { body: { answers, is_end_test } }, res);
};
