import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    trainerId: { type: String, required: true, unique: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    role: { type: String, default: 'Master Coach' },
    experience: { type: String, default: '5+ Years' },
    specialization: { type: String, default: 'Strength & Conditioning' },
    certifications: [{ type: String }],
    rating: { type: Number, default: 4.9 },
    performanceRating: { type: Number, default: 4.9 },
    availability: { type: String, default: 'Full-Time' },
    availabilityStatus: { type: String, enum: ['Available', 'Busy', 'On Leave'], default: 'Available' },
    status: { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' },
    assignedMembersCount: { type: Number, default: 0 },
    salary: { type: Number, default: 75000 },
    photo: { type: String, default: '' },
    socialLinks: {
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' }
    },
    bio: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Trainer = mongoose.models.Trainer || mongoose.model('Trainer', trainerSchema);
