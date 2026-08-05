import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    domain: { type: String, default: 'General Fitness & Wellness' },
    subject: { type: String, default: 'Program Inquiry' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' }
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
