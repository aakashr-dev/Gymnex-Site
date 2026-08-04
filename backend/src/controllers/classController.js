import { Class } from '../models/Class.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllClasses = async (req, res) => {
  try {
    const totalDocs = await Class.countDocuments();
    const features = new APIFeatures(Class.find().populate('program trainer branch'), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const classes = await features.query;
    return sendPaginated(res, 'Classes fetched successfully.', classes, req.query.page || 1, req.query.limit || 20, totalDocs);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const createClass = async (req, res) => {
  try {
    const newClass = await Class.create({ classId: `CLS-${Date.now()}`, ...req.body });
    return sendSuccess(res, 'Class created successfully.', newClass, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};
