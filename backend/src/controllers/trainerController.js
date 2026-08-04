import { Trainer } from '../models/Trainer.js';
import { Member } from '../models/Member.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllTrainers = async (req, res) => {
  try {
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
        const count = await Member.countDocuments({
          $or: [{ personalTrainer: t._id }, { assignedTrainer: t._id }]
        });
        const doc = t.toObject();
        doc.assignedMembersCount = count;
        return doc;
      })
    );

    return sendPaginated(res, 'Trainers fetched successfully.', trainersWithCounts, req.query.page || 1, req.query.limit || 50, totalDocs);
  } catch (err) {
    return sendError(res, err.message, 500);
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
    const trainer = await Trainer.create({ trainerId: `TRN-${Date.now()}`, ...req.body });
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
