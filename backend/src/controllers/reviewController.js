import { Review } from '../models/Review.js';
import { initialReviews } from '../data/initialData.js';
import mongoose from 'mongoose';

export const getAllReviews = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find({});
      return res.json({ success: true, count: reviews.length, source: 'MongoDB', data: reviews });
    } else {
      return res.json({ success: true, count: initialReviews.length, source: 'MemoryFallback', data: initialReviews });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
