import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    programId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, default: 'Intermediate' },
    duration: { type: String, default: '8 Weeks' },
    intensity: { type: String, default: 'High' },
    trainerName: { type: String, default: 'Marcus Vance' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    features: [{ type: String }]
  },
  { timestamps: true }
);

export const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
