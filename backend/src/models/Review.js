import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    reviewId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: 'Member' },
    branch: { type: String, default: 'GYMNEX Manhattan Flagship' },
    rating: { type: Number, default: 5 },
    quote: { type: String, required: true },
    avatar: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
