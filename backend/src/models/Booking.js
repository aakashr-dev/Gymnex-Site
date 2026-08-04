import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Confirmed', 'Cancelled', 'Completed', 'Waitlisted'], default: 'Confirmed' }
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
