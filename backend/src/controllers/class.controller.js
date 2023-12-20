import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';
import Class from '../models/class.model.js';
import User from '../models/user.model.js';
import * as ApiService from '../services/api.service.js';

export const createClass = async (req, res) => {
  const { student_ids } = req.body;
  // Not add class with no student
  if (!Array.isArray(student_ids) || student_ids.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      type: responseTypes.ERROR,
      message: 'Please add students to class',
    });
  }
  // Check student ids
  if (!Array.isArray(student_ids)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      type: responseTypes.ERROR,
      message: 'Please provide student_ids array',
    });
  }
  const isValidStudentIds = await ApiService.verifyDocIds(
    student_ids,
    User,
    res
  );
  if (isValidStudentIds) {
    await ApiService.create(Class, req, res);
  }
};

export const getAllClasses = async (req, res) => {
  await ApiService.listAll(Class, req, res);
};

export const getClassById = async (req, res) => {
  await ApiService.read(Class, req, res);
};

export const deleteClassById = async (req, res) => {
  const isHardDelete = req.query.hard_delete;
  if (isHardDelete) {
    return await ApiService.hardDelete(Class, req, res);
  } else {
    return await ApiService.softDelete(Class, req, res);
  }
};

export const updateClassById = async (req, res) => {
  const { student_ids } = req.body;
  if (student_ids !== undefined) {
    const isValidStudentIds = await ApiService.verifyDocIds(
      student_ids,
      User,
      res
    );
    if (isValidStudentIds) {
      return await ApiService.update(Class, req, res);
    }
  } else {
    return await ApiService.update(Class, req, res);
  }
};
