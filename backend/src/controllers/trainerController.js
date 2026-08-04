import { Trainer } from '../models/Trainer.js';
import { Member } from '../models/Member.js';
import { User } from '../models/User.js';
import { initialTrainers } from '../data/initialData.js';
import mongoose from 'mongoose';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllTrainers = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Trainers fetched successfully (Memory Fallback).', initialTrainers);
    }

    const totalDocs = await Trainer.countDocuments();
    const features = new APIFeatures(Trainer.find().populate('branch'), req.query)
      .filter()
      .search(['name', 'specialization', 'experience', 'availabilityStatus', 'status'])
      .sort()
      .limitFields()
      .paginate();

    const trainers = await features.query;

    // Dynamically calculate assigned members count for each trainer if needed
    const trainersWithCounts = await Promise.all(
      trainers.map(async (t) => {
        try {
          const count = await Member.countDocuments({
            $or: [{ personalTrainer: t._id }, { assignedTrainer: t._id }]
          });
          const doc = t.toObject ? t.toObject() : t;
          doc.assignedMembersCount = count;
          return doc;
        } catch (e) {
          return t.toObject ? t.toObject() : t;
        }
      })
    );

    return sendPaginated(res, 'Trainers fetched successfully.', trainersWithCounts, req.query.page || 1, req.query.limit || 100, totalDocs);
  } catch (err) {
    console.error('getAllTrainers DB error, serving fallback:', err.message);
    return sendSuccess(res, 'Trainers fetched successfully (Fallback).', initialTrainers);
  }
};

export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ $or: [{ _id: req.params.id }, { trainerId: req.params.id }] }).populate('branch');
    if (!trainer) return sendError(res, 'Trainer not found.', 404);
    const assignedMembers = await Member.find({
      $or: [{ personalTrainer: trainer._id }, { assignedTrainer: trainer._id }]
    }).select('name memberId email fitnessGoal status');

    const result = trainer.toObject();
    result.assignedMembers = assignedMembers;
    return sendSuccess(res, 'Trainer fetched successfully.', result);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const createTrainer = async (req, res) => {
  try {
    const { name, email, password, phone, specialization, experience, salary, availabilityStatus } = req.body;

    const normalizedEmail = (email && email.trim()) 
      ? email.trim().toLowerCase() 
      : `trainer_${Date.now()}@gymnex.com`;

    const targetPassword = (password && String(password).trim()) 
      ? String(password).trim() 
      : '123456';

    let userDoc = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!userDoc) {
      userDoc = await User.create({
        name: name || 'Trainer Staff',
        email: normalizedEmail,
        phone: phone || '',
        password: targetPassword,
        role: 'Trainer',
        status: 'Active',
        isVerified: true
      });
    } else {
      userDoc.password = targetPassword;
      userDoc.name = name || userDoc.name;
      userDoc.role = 'Trainer';
      await userDoc.save();
    }

    const trainer = await Trainer.create({
      trainerId: `TRN-${Math.floor(100 + Math.random() * 900)}`,
      user: userDoc._id,
      name: name || 'Trainer Staff',
      email: normalizedEmail,
      phone: phone || '',
      specialization: specialization || 'Strength Coach',
      experience: experience || '5+ Years',
      salary: Number(salary) || 75000,
      availabilityStatus: availabilityStatus || 'Available',
      status: 'Active'
    });

    return sendSuccess(res, 'Trainer created successfully.', trainer, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!trainer) return sendError(res, 'Trainer not found.', 404);
    return sendSuccess(res, 'Trainer updated successfully.', trainer);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return sendError(res, 'Trainer not found.', 404);

    // Unassign members assigned to this trainer
    await Member.updateMany(
      { $or: [{ personalTrainer: req.params.id }, { assignedTrainer: req.params.id }] },
      { $set: { personalTrainer: null, assignedTrainer: null, assignmentStatus: 'Pending Assignment' } }
    );

    return sendSuccess(res, 'Trainer deleted successfully.');
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getTrainerMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const members = await Member.find({
      $or: [{ personalTrainer: id }, { assignedTrainer: id }]
    }).populate('membership branch');
    return sendSuccess(res, 'Trainer assigned members fetched successfully.', members);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
