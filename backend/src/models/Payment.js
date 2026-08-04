import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Credit Card', 'Stripe', 'PayPal', 'Bank Transfer', 'Cash'], default: 'Credit Card' },
    status: { type: String, enum: ['Paid', 'Pending', 'Failed', 'Refunded'], default: 'Paid' },
    transactionId: { type: String, default: () => `TXN-${Date.now()}` }
  },
  { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
