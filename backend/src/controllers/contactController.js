import { Contact } from '../models/Contact.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    return sendSuccess(res, 'Contact enquiry submitted successfully.', contact, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    return sendSuccess(res, 'Contact submissions fetched.', contacts);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
