import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['System', 'Billing', 'Booking', 'Reminder'], default: 'System' },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
