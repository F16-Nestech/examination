import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';
import Test from '../models/test.model.js';
import * as ApiService from '../services/api.service.js';

export const createTest = async (req, res) => {
  await ApiService.create(Test, req, res);
};
export const getAllTests = async (req, res) => {
  await ApiService.create(Test, req, res);
};
export const getTestById = async (req, res) => {
  await ApiService.create(Test, req, res);
};
export const deleteTestById = async (req, res) => {
  const isHardDelete = req.query.hard_delete;
  if (isHardDelete) {
    return await ApiService.hardDelete(Test, req, res);
  } else {
    return await ApiService.softDelete(Test, req, res);
  }
};
export const updateTestById = async (req, res) => {
  await ApiService.create(Test, req, res);
};
