import mongoose from 'mongoose';

const corporateSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    employees: { type: Number, default: 50 },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    proposalStatus: { type: String, enum: ['Submitted', 'Under Review', 'Approved', 'Declined'], default: 'Submitted' }
  },
  { timestamps: true }
);

export const Corporate = mongoose.models.Corporate || mongoose.model('Corporate', corporateSchema);
