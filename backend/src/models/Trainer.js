import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const trainerSchema = new mongoose.Schema(
  {
    trainerId: { type: String, required: true, unique: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, default: '' },
    password: { type: String, default: '', select: false },
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

trainerSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const Trainer = mongoose.models.Trainer || mongoose.model('Trainer', trainerSchema);
