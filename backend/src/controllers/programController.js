import { Program } from '../models/Program.js';
import { initialPrograms } from '../data/initialData.js';
import mongoose from 'mongoose';

export const getAllPrograms = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const programs = await Program.find({});
      return res.json({ success: true, count: programs.length, source: 'MongoDB', data: programs });
    } else {
      return res.json({ success: true, count: initialPrograms.length, source: 'MemoryFallback', data: initialPrograms });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
