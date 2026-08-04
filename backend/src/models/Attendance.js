import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    checkIn: { type: Date, default: Date.now },
    checkOut: { type: Date },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
  },
  { timestamps: true }
);

export const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
