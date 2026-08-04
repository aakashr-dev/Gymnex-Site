import { User } from '../models/User.js';
import { Branch } from '../models/Branch.js';
import { Member } from '../models/Member.js';
import { Trainer } from '../models/Trainer.js';
import { Membership } from '../models/Membership.js';
import { Program } from '../models/Program.js';
import { Event } from '../models/Event.js';
import { Review } from '../models/Review.js';
import {
  initialUsers,
  initialBranches,
  initialMembers,
  initialTrainers,
  initialMemberships,
  initialPrograms,
  initialEvents,
  initialReviews
} from '../data/initialData.js';

export const seedDatabase = async () => {
  try {
    // Seed Admin & Users if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(initialUsers);
      console.log('🌱 [SEED] Initialized User accounts (Admin, Trainer, Member) in MongoDB.');
    } else {
      await User.findOneAndUpdate(
        { role: 'Admin' },
        { email: 'admin@email.com', password: 'Admin@123' },
        { upsert: true }
      );
    }

    // Seed Branches if empty
    const branchCount = await Branch.countDocuments();
    if (branchCount === 0) {
      const branchDocs = initialBranches.map((b) => ({ ...b, branchId: b.id }));
      await Branch.insertMany(branchDocs);
      console.log(`🌱 [SEED] Initialized ${branchDocs.length} GYMNEX Flagship Branches in MongoDB.`);
    }

    // Seed Members if empty
    const memberCount = await Member.countDocuments();
    if (memberCount === 0) {
      const memberDocs = initialMembers.map((m) => ({ ...m, memberId: m.id }));
      await Member.insertMany(memberDocs);
      console.log(`🌱 [SEED] Initialized ${memberDocs.length} Member Profiles in MongoDB.`);
    }

    // Seed Trainers if empty
    const trainerCount = await Trainer.countDocuments();
    if (trainerCount === 0) {
      const trainerDocs = initialTrainers.map((t) => ({ ...t, trainerId: t.id }));
      await Trainer.insertMany(trainerDocs);
      console.log(`🌱 [SEED] Initialized ${trainerDocs.length} Master Coaches in MongoDB.`);
    }

    // Seed Memberships if empty
    const planCount = await Membership.countDocuments();
    if (planCount === 0) {
      const planDocs = initialMemberships.map((p) => ({ ...p, planId: p.id }));
      await Membership.insertMany(planDocs);
      console.log(`🌱 [SEED] Initialized ${planDocs.length} Membership Plans in MongoDB.`);
    }

    // Seed Programs if empty
    const progCount = await Program.countDocuments();
    if (progCount === 0) {
      const progDocs = initialPrograms.map((p) => ({ ...p, programId: p.id }));
      await Program.insertMany(progDocs);
      console.log(`🌱 [SEED] Initialized ${progDocs.length} Training Programs in MongoDB.`);
    }

    // Seed Events if empty
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      const eventDocs = initialEvents.map((e) => ({ ...e, eventId: e.id }));
      await Event.insertMany(eventDocs);
      console.log(`🌱 [SEED] Initialized ${eventDocs.length} Masterclass Events in MongoDB.`);
    }

    // Seed Reviews if empty
    const revCount = await Review.countDocuments();
    if (revCount === 0) {
      const revDocs = initialReviews.map((r) => ({ ...r, reviewId: r.id }));
      await Review.insertMany(revDocs);
      console.log(`🌱 [SEED] Initialized ${revDocs.length} Member Reviews in MongoDB.`);
    }
  } catch (error) {
    console.error('⚠️ [SEED ERROR] Failed to seed MongoDB data:', error.message);
  }
};
