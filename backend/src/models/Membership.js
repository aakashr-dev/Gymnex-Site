import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema(
  {
    planId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }, // in USD
    duration: { type: String, default: '1 Month' },
    benefits: [{ type: String }],
    freezeAllowed: { type: Boolean, default: true },
    guestPass: { type: Number, default: 2 },
    isSeasonalOffer: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 },
    validUntil: { type: String, default: '' },
    popular: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Disabled', 'Discontinued'], default: 'Active' }
  },
  { timestamps: true }
);

export const Membership = mongoose.models.Membership || mongoose.model('Membership', membershipSchema);
