import { Membership } from '../models/Membership.js';
import { Member } from '../models/Member.js';
import { Notification } from '../models/Notification.js';
import { initialMemberships } from '../data/initialData.js';
import mongoose from 'mongoose';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getAllMemberships = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plans = await Membership.find({});
      const activePlans = plans.filter((p) => p.status === 'Active');
      const seasonalOffers = plans.filter((p) => p.isSeasonalOffer);

      return sendSuccess(res, 'Membership plans fetched successfully.', plans, 200, {
        summary: {
          total: plans.length,
          active: activePlans.length,
          seasonalOffers: seasonalOffers.length
        }
      });
    } else {
      return sendSuccess(res, 'Membership plans fetched from fallback.', initialMemberships);
    }
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createMembership = async (req, res) => {
  try {
    const plan = await Membership.create({
      planId: req.body.planId || `PLAN-${Date.now()}`,
      ...req.body
    });

    await Notification.create({
      title: 'New Membership Plan Introduced',
      message: `New plan "${plan.name}" priced at $${plan.price}/mo has been created.`,
      type: 'System'
    });

    return sendSuccess(res, 'Membership plan created successfully.', plan, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const updateMembership = async (req, res) => {
  try {
    const plan = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) return sendError(res, 'Membership plan not found.', 404);

    await Notification.create({
      title: 'Membership Plan Updated',
      message: `Plan "${plan.name}" specs and pricing have been updated.`,
      type: 'System'
    });

    return sendSuccess(res, 'Membership plan updated successfully.', plan);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const toggleMembershipStatus = async (req, res) => {
  try {
    const plan = await Membership.findById(req.params.id);
    if (!plan) return sendError(res, 'Membership plan not found.', 404);

    plan.status = plan.status === 'Active' ? 'Disabled' : 'Active';
    await plan.save();

    return sendSuccess(res, `Membership plan ${plan.name} status set to ${plan.status}.`, plan);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const deleteMembership = async (req, res) => {
  try {
    const plan = await Membership.findByIdAndDelete(req.params.id);
    if (!plan) return sendError(res, 'Membership plan not found.', 404);
    return sendSuccess(res, 'Membership plan deleted successfully.');
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
