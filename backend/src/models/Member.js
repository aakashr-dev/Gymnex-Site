import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' },
    personalTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    assignmentStatus: { type: String, enum: ['Pending Assignment', 'Assigned'], default: 'Pending Assignment' },
    fitnessGoal: { type: String, default: 'General Fitness' },
    currentWeight: { type: Number, default: 75 },
    targetWeight: { type: Number, default: 70 },
    preferredTrainingStyle: { type: String, default: 'General Fitness' },
    medicalInformation: { type: String, default: 'None' },
    attendance: { type: Number, default: 0 },
    height: { type: Number, default: 175 }, // in cm
    weight: { type: Number, default: 75 }, // in kg
    BMI: { type: Number, default: 24.5 },
    goals: [{ type: String }],
    medicalNotes: { type: String, default: 'None' },
    progressPhotos: [{ type: String }],
    visitStreak: { type: Number, default: 1 },
    registrationDate: { type: Date, default: Date.now },
    membershipExpiresAt: { type: Date },
    status: { type: String, enum: ['Active', 'Suspended', 'Deactivated', 'Pending', 'Expired', 'Frozen'], default: 'Active' }
  },
  { timestamps: true }
);

export const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
