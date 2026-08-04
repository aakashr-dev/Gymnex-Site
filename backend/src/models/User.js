import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['Admin', 'Trainer', 'Member'],
      default: 'Member'
    },
    profileImage: { type: String, default: '' },
    status: { type: String, enum: ['Active', 'Inactive', 'Blocked', 'Suspended', 'Deactivated'], default: 'Active' },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: '' },
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpire: { type: Date },
    emailVerificationToken: { type: String, default: '' },
    lastLogin: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
