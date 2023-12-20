import { StatusCodes } from 'http-status-codes';
import responseTypes from '../config/responseType.js';

export const create = async (Model, req, res) => {
  try {
    // Creating a new document in the collection

    const result = await new Model(req.body).save();

    // Returning successful response
    return res.status(StatusCodes.CREATED).json({
      type: responseTypes.SUCCESS,
      message: 'Successfully created the document',
      result,
    });
  } catch (err) {
    // Server Error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
export const filter = async (Model, req, res) => {
  try {
    if (req.query.filter === undefined || req.query.equal === undefined) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: responseTypes.ERROR,
        message: 'filter not provided correctly',
      });
    }
    const result = await Model.find({ is_deleted: false })
      .where(req.query.filter)
      .equals(req.query.equal);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.SUCCESS,
      result,
      message:
        'Successfully found all documents where equal to: ' + req.params.equal,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
export const listAll = async (Model, req, res) => {
  try {
    //  Query the database for a list of all results
    const result = await Model.find({ is_deleted: false });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.SUCCESS,
      result,
      message: 'Successfully found all documents',
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
export const paginatedList = async (Model, req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;
  try {
    //  Query the database for a list of all results
    const resultsPromise = Model.find({ is_deleted: false })
      .skip(skip)
      .limit(limit)
      .populate();
    // Counting the total documents
    const countPromise = Model.countDocuments({ is_deleted: false });
    // Resolving both promises
    const [result, count] = await Promise.all([resultsPromise, countPromise]);
    // Calculating total pages
    const pages = Math.ceil(count / limit);

    // Getting Pagination Object
    const pagination = { page, pages, count };
    return res.status(StatusCodes.OK).json({
      type: responseTypes.SUCCESS,
      result,
      pagination,
      message: 'Successfully found all documents',
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
export const read = async (Model, req, res) => {
  try {
    // Find document by id
    const result = await Model.findOne({
      _id: req.params.id,
      is_deleted: false,
    });
    // If no results found, return document not found
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: responseTypes.ERROR,
        message: 'No document found by this id: ' + req.params.id,
      });
    } else {
      // Return success response
      return res.status(StatusCodes.OK).json({
        type: responseTypes.SUCCESS,
        result,
        message: 'We found this document by this id: ' + req.params.id,
      });
    }
  } catch (err) {
    // Server Error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};

export const verifyDocIds = async (ids, Model, res) => {
  for (let i = 0; i < ids.length; i++) {
    try {
      const _id = ids[i];
      const doc = await Model.findOne({ _id, is_deleted: false }).exec();

      if (!doc) {
        res.status(StatusCodes.NOT_FOUND).json({
          type: responseTypes.ERROR,
          message: 'Not found document id: ' + _id,
        });
        return false;
      }
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        type: responseTypes.ERROR,
        message: err.message,
      });
      return false;
    }
  }
  return true;
};

export const softDelete = async (Model, req, res) => {
  try {
    // Find the document by id and delete it
    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, is_deleted: false },
      { is_deleted: true }
    ).exec();
    // If no results found, return document not found
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: responseTypes.ERROR,
        message: 'Document not found or deleted previously',
      });
    } else {
      return res.status(StatusCodes.OK).json({
        type: responseTypes.SUCCESS,
        result,
        message: 'Successfully deleted the document by id: ' + req.params.id,
      });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};

export const hardDelete = async (Model, req, res) => {
  try {
    // Find the document by id and delete it
    const result = await Model.deleteOne({ _id: req.params.id }).exec();
    // If no results found, return document not found
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: responseTypes.ERROR,
        message: 'No document found by this id: ' + req.params.id,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        type: responseTypes.SUCCESS,
        result,
        message: 'Successfully deleted the document by id: ' + req.params.id,
      });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};

export const search = async (Model, req, res) => {
  if (req.query.q === undefined || req.query.q.trim() === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      type: responseTypes.ERROR,
      message: 'No document found by this request',
    });
  }
  const fieldsArray = req.query.fields.split(',');

  const fields = { $or: [] };

  for (const field of fieldsArray) {
    fields.$or.push({ [field]: { $regex: new RegExp(req.query.q, 'i') } });
  }

  try {
    let results = await Model.find(fields).where('is_deleted', false).limit(10);
    return res.status(StatusCodes.OK).json({
      type: responseTypes.SUCCESS,
      result: results,
      message: 'Successfully found all documents',
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
export const update = async (Model, req, res) => {
  try {
    // Find document by id and updates with the required fields
    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, is_deleted: false },
      req.body,
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: responseTypes.ERROR,
        message: 'No document found by this id: ' + req.params.id,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        type: responseTypes.SUCCESS,
        result,
        message: 'We update this document by this id: ' + req.params.id,
      });
    }
  } catch (err) {
    // Server Error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      type: responseTypes.ERROR,
      message: err.message,
    });
  }
};
