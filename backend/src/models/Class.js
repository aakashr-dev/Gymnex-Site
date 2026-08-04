import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    classId: { type: String, required: true, unique: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    capacity: { type: Number, default: 25 },
    availableSeats: { type: Number, default: 25 },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    schedule: {
      day: { type: String, required: true },
      time: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export const Class = mongoose.models.Class || mongoose.model('Class', classSchema);
