import { Program } from '../models/Program.js';
import { initialPrograms } from '../data/initialData.js';
import mongoose from 'mongoose';

export const getAllPrograms = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let programs = await Program.find({});
      if (!programs || programs.length < initialPrograms.length) {
        try {
          await Program.deleteMany({});
          const progDocs = initialPrograms.map((p) => ({
            ...p,
            programId: p.programId || p.id || `prog-${Math.random()}`
          }));
          programs = await Program.insertMany(progDocs);
        } catch (e) {
          programs = initialPrograms.map((p) => ({
            ...p,
            programId: p.programId || p.id || `prog-${Math.random()}`
          }));
        }
      }
      return res.json({ success: true, count: programs.length, source: 'MongoDB', data: programs });
    } else {
      return res.json({ success: true, count: initialPrograms.length, source: 'MemoryFallback', data: initialPrograms });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
