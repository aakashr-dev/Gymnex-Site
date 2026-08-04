import { Member } from '../models/Member.js';
import { Trainer } from '../models/Trainer.js';
import { User } from '../models/User.js';
import { Notification } from '../models/Notification.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllMembers = async (req, res) => {
  try {
    const totalDocs = await Member.countDocuments();
    const features = new APIFeatures(Member.find().populate('user branch membership personalTrainer assignedTrainer'), req.query)
      .filter()
      .search(['name', 'email', 'memberId', 'status', 'fitnessGoal'])
      .sort('-createdAt')
      .limitFields()
      .paginate();

    const members = await features.query;
    return sendPaginated(res, 'Members fetched successfully.', members, req.query.page || 1, req.query.limit || 100, totalDocs);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getUnassignedMembers = async (req, res) => {
  try {
    const members = await Member.find({
      $or: [
        { assignmentStatus: 'Pending Assignment' },
        { personalTrainer: null },
        { assignedTrainer: null }
      ]
    }).populate('branch membership').sort('-createdAt');
    return sendSuccess(res, 'Unassigned members fetched successfully.', members);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findOne({ $or: [{ _id: req.params.id }, { memberId: req.params.id }] }).populate('user branch membership personalTrainer assignedTrainer');
    if (!member) return sendError(res, 'Member not found.', 404);
    return sendSuccess(res, 'Member details fetched successfully.', member);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      branch,
      membership,
      fitnessGoal,
      currentWeight,
      targetWeight,
      preferredTrainingStyle,
      medicalInformation
    } = req.body;

    let userDoc = null;
    if (email) {
      userDoc = await User.findOne({ email });
      if (!userDoc) {
        userDoc = await User.create({
          name: name || 'New Member',
          email,
          phone: phone || '',
          password: 'Member@123',
          role: 'Member',
          status: 'Active',
          isVerified: true
        });
      }
    }

    const member = await Member.create({
      memberId: `MEM-${Math.floor(1000 + Math.random() * 90000)}`,
      user: userDoc ? userDoc._id : null,
      name: name || 'New Member',
      email: email || '',
      phone: phone || '',
      branch: branch || null,
      membership: membership || null,
      fitnessGoal: fitnessGoal || 'General Fitness',
      currentWeight: Number(currentWeight) || 75,
      targetWeight: Number(targetWeight) || 70,
      preferredTrainingStyle: preferredTrainingStyle || 'General Fitness',
      medicalInformation: medicalInformation || 'None',
      assignmentStatus: 'Pending Assignment',
      status: 'Active',
      registrationDate: new Date()
    });

    await Notification.create({
      title: 'New Member Registered',
      message: `Member ${member.name} (${member.fitnessGoal}) was registered and is waiting for trainer assignment.`,
      type: 'System'
    });

    return sendSuccess(res, 'Member created successfully.', member, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const assignTrainer = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { trainerId } = req.body;

    const member = await Member.findById(memberId);
    if (!member) return sendError(res, 'Member not found.', 404);

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return sendError(res, 'Trainer not found.', 404);

    member.personalTrainer = trainer._id;
    member.assignedTrainer = trainer._id;
    member.assignmentStatus = 'Assigned';
    await member.save();

    // Increment trainer's assigned members count
    await Trainer.findByIdAndUpdate(trainer._id, { $inc: { assignedMembersCount: 1 } });

    // Create notifications
    await Notification.create({
      title: 'Trainer Assigned',
      message: `You have been assigned to coach ${member.name} (${member.fitnessGoal || 'General Fitness'}).`,
      receiver: trainer.user || null,
      type: 'Booking'
    });

    await Notification.create({
      title: 'Personal Trainer Assigned',
      message: `Coach ${trainer.name} (${trainer.specialization}) has been assigned as your personal trainer.`,
      receiver: member.user || null,
      type: 'System'
    });

    return sendSuccess(res, `Successfully assigned ${trainer.name} to ${member.name}.`, member);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const updateMemberStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Suspended', 'Deactivated', 'Pending', 'Expired', 'Frozen'].includes(status)) {
      return sendError(res, 'Invalid status value.', 400);
    }
    const member = await Member.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!member) return sendError(res, 'Member not found.', 404);
    return sendSuccess(res, `Member status updated to ${status}.`, member);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return sendError(res, 'Member not found.', 404);
    return sendSuccess(res, 'Member updated successfully.', member);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return sendError(res, 'Member not found.', 404);
    return sendSuccess(res, 'Member deleted successfully.');
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
