import { Corporate } from '../models/Corporate.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const submitCorporateProposal = async (req, res) => {
  try {
    const proposal = await Corporate.create(req.body);
    return sendSuccess(res, 'Corporate wellness proposal submitted.', proposal, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const getCorporateProposals = async (req, res) => {
  try {
    const proposals = await Corporate.find().sort('-createdAt');
    return sendSuccess(res, 'Corporate proposals fetched.', proposals);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
