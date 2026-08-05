import { Member } from '../models/Member.js';
import { Trainer } from '../models/Trainer.js';
import { User } from '../models/User.js';
import { Notification } from '../models/Notification.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllMembers = async (req, res) => {
  try {
    const totalDocs = await Member.countDocuments();
    const queryParams = { limit: 1000, ...req.query };
    const features = new APIFeatures(Member.find().populate('user branch membership personalTrainer assignedTrainer'), queryParams)
      .filter()
      .search(['name', 'email', 'memberId', 'status', 'fitnessGoal'])
      .sort('-createdAt')
      .limitFields()
      .paginate();

    const members = await features.query;
    return sendPaginated(res, 'Members fetched successfully.', members, queryParams.page || 1, queryParams.limit || 1000, totalDocs);
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
      password,
      phone,
      branch,
      membership,
      fitnessGoal,
      currentWeight,
      targetWeight,
      preferredTrainingStyle,
      medicalInformation
    } = req.body;

    const normalizedEmail = (email && email.trim()) 
      ? email.trim().toLowerCase() 
      : `member_${Date.now()}@gymnex.com`;

    const targetPassword = (password && String(password).trim()) 
      ? String(password).trim() 
      : 'Member@123';

    let userDoc = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!userDoc) {
      userDoc = await User.create({
        name: name || 'New Member',
        email: normalizedEmail,
        phone: phone || '',
        password: targetPassword,
        role: 'Member',
        status: 'Active',
        isVerified: true
      });
    } else {
      userDoc.password = targetPassword;
      userDoc.name = name || userDoc.name;
      userDoc.role = 'Member';
      await userDoc.save();
    }

    let member = await Member.create({
      memberId: `MEM-${Math.floor(1000 + Math.random() * 90000)}`,
      user: userDoc._id,
      name: name || 'New Member',
      email: normalizedEmail,
      password: targetPassword,
      phone: phone || '',
      branch: branch || null,
      membership: membership || null,
      personalTrainer: req.body.personalTrainer || req.body.trainerId || null,
      assignedTrainer: req.body.assignedTrainer || req.body.trainerId || null,
      assignmentStatus: (req.body.personalTrainer || req.body.trainerId) ? 'Assigned' : 'Pending Assignment',
      fitnessGoal: fitnessGoal || 'General Fitness',
      weight: Number(currentWeight || req.body.weight) || 75,
      targetWeight: Number(targetWeight) || 70,
      preferredTrainingStyle: preferredTrainingStyle || 'General Fitness',
      medicalNotes: medicalInformation || req.body.medicalNotes || 'None',
      status: 'Active',
      registrationDate: new Date()
    });

    member = await Member.findById(member._id).populate('user branch membership personalTrainer assignedTrainer');

    await Notification.create({
      title: 'New Member Registered',
      message: `Member ${member.name} (${member.fitnessGoal}) was registered successfully.`,
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

    if (req.body.password && String(req.body.password).trim()) {
      const newPass = String(req.body.password).trim();
      member.password = newPass;
      await member.save();

      if (member.user) {
        const userDoc = await User.findById(member.user).select('+password');
        if (userDoc) {
          userDoc.password = newPass;
          await userDoc.save();
        }
      }
    }

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

export const getMyMemberProfile = async (req, res) => {
  try {
    let member = null;
    if (req.user) {
      member = await Member.findOne({
        $or: [
          { user: req.user._id },
          { email: req.user.email }
        ]
      }).populate('user branch membership personalTrainer assignedTrainer');
    }

    if (!member) {
      member = await Member.findOne().populate('user branch membership personalTrainer assignedTrainer');
    }

    if (!member) return sendError(res, 'Member profile not found.', 404);
    return sendSuccess(res, 'Member profile fetched successfully.', member);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
