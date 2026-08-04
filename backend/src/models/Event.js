import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, default: '09:00 AM' },
    location: { type: String, required: true },
    category: { type: String, default: 'Masterclass' },
    speaker: { type: String, default: 'Master Coach' },
    image: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
