import { Event } from '../models/Event.js';
import { initialEvents } from '../data/initialData.js';
import mongoose from 'mongoose';

export const getAllEvents = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const events = await Event.find({});
      return res.json({ success: true, count: events.length, source: 'MongoDB', data: events });
    } else {
      return res.json({ success: true, count: initialEvents.length, source: 'MemoryFallback', data: initialEvents });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
