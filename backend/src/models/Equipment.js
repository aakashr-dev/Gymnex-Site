import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema(
  {
    equipmentId: { type: String, required: true, unique: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    name: { type: String, required: true },
    category: { type: String, enum: ['Cardio', 'Strength', 'Recovery', 'Functional', 'Free Weights'], default: 'Strength' },
    status: {
      type: String,
      enum: ['Operational', 'Under Maintenance', 'Out of Service', 'Schedule Maintenance', 'Maintenance Completed'],
      default: 'Operational'
    },
    issueReported: { type: String, default: '' },
    reportedBy: { type: String, default: '' },
    purchaseDate: { type: String, default: '2025-01-01' },
    lastMaintenanceDate: { type: String, default: '2026-05-15' },
    nextMaintenanceDate: { type: String, default: '2026-08-15' },
    maintenanceCost: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);
