import { Payment } from '../models/Payment.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllPayments = async (req, res) => {
  try {
    const totalDocs = await Payment.countDocuments();
    const features = new APIFeatures(Payment.find().populate('member membership'), req.query)
      .filter()
      .search(['invoiceNumber', 'status', 'paymentMethod'])
      .sort()
      .limitFields()
      .paginate();

    const payments = await features.query;
    return sendPaginated(res, 'Payments fetched successfully.', payments, req.query.page || 1, req.query.limit || 20, totalDocs);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
