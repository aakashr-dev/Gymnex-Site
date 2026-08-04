import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    branchId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, default: 'North America' },
    country: { type: String, default: 'United States' },
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, default: 40.7128 },
      lng: { type: Number, default: -74.006 }
    },
    description: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    manager: { type: String, default: 'Head Manager' },
    openingHours: { type: String, default: '24/7 Access' },
    images: [{ type: String }],
    amenities: [{ type: String }],
    status: { type: String, enum: ['Open Now', 'Coming Soon', 'Renovating'], default: 'Open Now' },
    parking: { type: Boolean, default: true },
    pool: { type: Boolean, default: true },
    recovery: { type: Boolean, default: true },
    rating: { type: Number, default: 4.9 }
  },
  { timestamps: true }
);

export const Branch = mongoose.models.Branch || mongoose.model('Branch', branchSchema);
