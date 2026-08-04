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
    targetWeight: { type: Number, default: 70 },
    preferredTrainingStyle: { type: String, default: 'General Fitness' },
    attendance: { type: Number, default: 0 },
    height: { type: Number, default: 175 }, // in cm
    weight: { type: Number, default: 75 }, // canonical weight in kg
    BMI: { type: Number, default: 24.5 },
    goals: [{ type: String }],
    medicalNotes: { type: String, default: 'None' }, // canonical medical notes
    progressPhotos: [{ type: String }],
    visitStreak: { type: Number, default: 1 },
    registrationDate: { type: Date, default: Date.now },
    membershipExpiresAt: { type: Date },
    status: { type: String, enum: ['Active', 'Suspended', 'Deactivated', 'Pending', 'Expired', 'Frozen'], default: 'Active' }
  },
  { timestamps: true }
);

// Virtual property aliases for full backward compatibility
memberSchema.virtual('currentWeight').get(function() { return this.weight; }).set(function(v) { this.weight = v; });
memberSchema.virtual('medicalInformation').get(function() { return this.medicalNotes; }).set(function(v) { this.medicalNotes = v; });
memberSchema.set('toJSON', { virtuals: true });
memberSchema.set('toObject', { virtuals: true });

export const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
