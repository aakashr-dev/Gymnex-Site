import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

import { User } from '../models/User.js';
import { Branch } from '../models/Branch.js';
import { Trainer } from '../models/Trainer.js';
import { Member } from '../models/Member.js';
import { Membership } from '../models/Membership.js';
import { Program } from '../models/Program.js';
import { Class } from '../models/Class.js';
import { Review } from '../models/Review.js';
import { Event } from '../models/Event.js';
import { Equipment } from '../models/Equipment.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { Notification } from '../models/Notification.js';

dotenv.config();

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const CITIES = ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Dubai', 'Sydney', 'Berlin', 'Singapore', 'Toronto'];
const REGIONS = ['North America', 'North America', 'Europe', 'Europe', 'Asia Pacific', 'Middle East', 'Asia Pacific', 'Europe', 'Asia Pacific', 'North America'];

const FITNESS_GOALS = ['Weight Loss', 'Muscle Building', 'Transformation', 'Powerlifting', 'General Fitness'];
const SPECIALIZATIONS = ['Weight Loss Specialist', 'Strength Coach', 'Transformation Expert', 'Strength & Conditioning Coach', 'General Fitness Trainer'];
const TRAINING_STYLES = ['HIIT & Cardio', 'Bodybuilding Hypertrophy', 'Powerlifting & Heavy Barbell', 'Functional Mobility', 'Athletic Conditioning'];

const seedData = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gymnex_db';
    console.log('🌱 Connecting to MongoDB Atlas for Enterprise Database Seeding...');
    await mongoose.connect(connUri, { serverSelectionTimeoutMS: 30000, connectTimeoutMS: 30000 });
    console.log('🍃 Connected to MongoDB Atlas successfully.');

    // Clear existing collections
    await User.deleteMany({});
    await Branch.deleteMany({});
    await Trainer.deleteMany({});
    await Member.deleteMany({});
    await Membership.deleteMany({});
    await Program.deleteMany({});
    await Class.deleteMany({});
    await Review.deleteMany({});
    await Event.deleteMany({});
    await Equipment.deleteMany({});
    await LeaveRequest.deleteMany({});
    await Notification.deleteMany({});

    console.log('🧹 Existing collections cleared.');

    // 1. Seed 10 Flagship Branches
    const branchesData = CITIES.map((city, idx) => ({
      branchId: `BR-10${idx + 1}`,
      name: `GYMNEX ${city} Sanctuary`,
      city,
      region: REGIONS[idx],
      country: idx === 2 ? 'United Kingdom' : idx === 3 ? 'France' : idx === 4 ? 'Japan' : idx === 5 ? 'United Arab Emirates' : idx === 6 ? 'Australia' : idx === 7 ? 'Germany' : idx === 8 ? 'Singapore' : idx === 9 ? 'Canada' : 'United States',
      address: `10${idx + 1} Executive Boulevard, Midtown`,
      phone: `+1 (800) 555-010${idx}`,
      email: `${city.toLowerCase().replace(/\s+/g, '')}@gymnex.com`,
      openingHours: '24/7 VIP Access',
      status: 'Open Now',
      area: `${35 + idx * 2},000 sq ft`,
      amenities: ['Biostrenth Suite', 'Cryotherapy Vault', 'Hydrotherapy Pool', 'Rooftop Track', 'DEXA Lab', 'Executive Spa'],
      rating: 4.8 + (idx % 3) * 0.08
    }));
    const createdBranches = await Branch.insertMany(branchesData);
    console.log(`✅ Seeded ${createdBranches.length} Flagship Branches.`);

    // 2. Seed 10 Membership Plans
    const plansData = [
      { planId: 'PLAN-CORE', name: 'CORE ACCESS', price: 99, duration: '1 Month', benefits: ['Single Branch Access', 'Full Weightroom', 'Locker Room & Steam'], status: 'Active' },
      { planId: 'PLAN-CRIMSON', name: 'CRIMSON ELITE PASS', price: 189, duration: '1 Month', benefits: ['Global Multi-Branch Access', 'Cryotherapy & Sauna Suite', '2 Trainer Sessions'], popular: true, status: 'Active' },
      { planId: 'PLAN-BLACK', name: 'VIP BLACK EXECUTIVE', price: 349, duration: '1 Month', benefits: ['24/7 Priority Global Access', 'Unlimited Coaching', 'Executive Locker & Laundry'], popular: true, status: 'Active' },
      { planId: 'PLAN-ANNUAL-CORE', name: 'ANNUAL CORE', price: 999, duration: '12 Months', benefits: ['1 Year Single Branch Access', 'Complimentary DEXA Scan'], status: 'Active' },
      { planId: 'PLAN-ANNUAL-ELITE', name: 'ANNUAL CRIMSON ELITE', price: 1899, duration: '12 Months', benefits: ['1 Year Multi-Branch Access', 'Unlimited Cryotherapy'], isSeasonalOffer: true, discountPercentage: 15, validUntil: '2026-09-01', status: 'Active' },
      { planId: 'PLAN-ANNUAL-BLACK', name: 'ANNUAL VIP BLACK', price: 3499, duration: '12 Months', benefits: ['1 Year Executive Global Pass', 'Personal Locker Dedicated'], isSeasonalOffer: true, discountPercentage: 20, validUntil: '2026-09-15', status: 'Active' },
      { planId: 'PLAN-CORPORATE', name: 'CORPORATE WELLNESS', price: 149, duration: '1 Month', benefits: ['Company Group Access', 'Quarterly Health Audits'], status: 'Active' },
      { planId: 'PLAN-WEEKEND', name: 'WEEKEND VIP PASS', price: 69, duration: '1 Month', benefits: ['Sat & Sun Facility Access', 'Hydro Pool Access'], status: 'Active' },
      { planId: 'PLAN-STUDENT', name: 'ACADEMIC ATHLETE', price: 79, duration: '1 Month', benefits: ['Off-Peak Hour Access', 'All Group Classes'], status: 'Active' },
      { planId: 'PLAN-DAYPASS', name: 'DAY EXPERIENCE PASS', price: 45, duration: '1 Day', benefits: ['24hr Full Sanctuary Access'], status: 'Active' }
    ];
    const createdPlans = await Membership.insertMany(plansData);
    console.log(`✅ Seeded ${createdPlans.length} Membership Plans.`);

    // 3. Seed Admin Users
    await User.create({
      name: 'System Admin (Gmail)',
      email: 'admin@gmail.com',
      password: 'Admin@123',
      role: 'Admin',
      status: 'Active',
      isVerified: true
    });
    await User.create({
      name: 'Master Enterprise Admin',
      email: 'admin@gymnex.com',
      password: 'Admin@123',
      role: 'Admin',
      status: 'Active',
      isVerified: true
    });
    await User.create({
      name: 'System Admin',
      email: 'admin@email.com',
      password: 'Admin@123',
      role: 'Admin',
      status: 'Active',
      isVerified: true
    });
    console.log('✅ Seeded Admin Accounts (admin@gmail.com & admin@gymnex.com / Admin@123).');

    // Seed 10 Trainer Accounts with password '123456'
    const trainerAccountEmails = Array.from({ length: 10 }).flatMap((_, i) => [
      `trainer${i + 1}@gymnex.com`,
      `trainer${i + 1}@gmail.com`
    ]);
    const trainerUserDocs = [];
    for (let t = 0; t < trainerAccountEmails.length; t++) {
      const u = await User.create({
        name: `Executive Trainer ${Math.floor(t / 2) + 1}`,
        email: trainerAccountEmails[t],
        password: '123456',
        role: 'Trainer',
        status: 'Active',
        isVerified: true
      });
      trainerUserDocs.push(u);
    }
    console.log('✅ Seeded 10 Trainer Accounts (trainer1-10@gymnex.com & trainer1-10@gmail.com / password: 123456).');

    // 4. Seed 25 Master Trainers
    const trainersData = Array.from({ length: 25 }).map((_, i) => {
      const spec = SPECIALIZATIONS[i % SPECIALIZATIONS.length];
      const availabilityStatus = i % 8 === 0 ? 'On Leave' : i % 3 === 0 ? 'Busy' : 'Available';
      const userDoc = i < 10 ? trainerUserDocs[i * 2] : null;
      return {
        trainerId: `TRN-${100 + i}`,
        user: userDoc ? userDoc._id : null,
        branch: createdBranches[i % createdBranches.length]._id,
        name: i === 0 ? 'Marcus Vance' : i === 1 ? 'Sarah Jenkins' : i === 2 ? 'Dmitri Volkov' : `Coach Trainer ${i + 1}`,
        email: i < 10 ? `trainer${i + 1}@gymnex.com` : `coach${i + 1}@gymnex.com`,
        phone: `+1 (555) 019-${100 + i}`,
        role: 'Master Coach',
        experience: `${5 + (i % 8)} Years`,
        specialization: spec,
        certifications: ['CSCS Certified Strength Specialist', 'NASM Master Trainer', 'Olympic Weightlifting L2'],
        rating: Number((4.85 + (i % 3) * 0.05).toFixed(2)),
        performanceRating: Number((4.8 + (i % 4) * 0.05).toFixed(2)),
        availabilityStatus,
        status: availabilityStatus === 'On Leave' ? 'On Leave' : 'Active',
        assignedMembersCount: 4 + (i % 6),
        salary: 75000 + i * 1500,
        photo: `https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400`
      };
    });
    const createdTrainers = await Trainer.insertMany(trainersData);
    console.log(`✅ Seeded ${createdTrainers.length} Master Trainers.`);

    // 5. Seed 100 Members (with 20 unassigned members)
    const membersData = [];
    for (let i = 1; i <= 100; i++) {
      const isUnassigned = i <= 20;
      const fitnessGoal = FITNESS_GOALS[i % FITNESS_GOALS.length];
      const preferredStyle = TRAINING_STYLES[i % TRAINING_STYLES.length];
      const assignedTrainerDoc = isUnassigned ? null : createdTrainers[i % createdTrainers.length]._id;

      const userDoc = await User.create({
        name: `Athlete Member ${i}`,
        email: `member${i}@gymnex.com`,
        password: 'Member@123',
        role: 'Member',
        status: i % 15 === 0 ? 'Suspended' : 'Active',
        isVerified: true
      });

      membersData.push({
        memberId: `MEM-${1000 + i}`,
        user: userDoc._id,
        name: `Athlete Member ${i}`,
        email: `member${i}@gymnex.com`,
        phone: `+1 (555) 012-${1000 + i}`,
        branch: createdBranches[i % createdBranches.length]._id,
        membership: createdPlans[i % createdPlans.length]._id,
        personalTrainer: assignedTrainerDoc,
        assignedTrainer: assignedTrainerDoc,
        assignmentStatus: isUnassigned ? 'Pending Assignment' : 'Assigned',
        weight: 70 + (i % 25),
        targetWeight: 68 + (i % 20),
        preferredTrainingStyle: preferredStyle,
        medicalNotes: i % 7 === 0 ? 'Mild lower back sensitivity' : 'None reported',
        attendance: 12 + (i % 40),
        height: 165 + (i % 25),
        weight: 60 + (i % 35),
        BMI: Number((21 + (i % 7) * 0.8).toFixed(1)),
        visitStreak: (i % 15) + 1,
        registrationDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
        status: i % 25 === 0 ? 'Suspended' : i % 30 === 0 ? 'Deactivated' : 'Active'
      });
    }
    const createdMembers = await Member.insertMany(membersData);
    console.log(`✅ Seeded ${createdMembers.length} Members (${createdMembers.filter(m => m.assignmentStatus === 'Pending Assignment').length} waiting for trainer assignment).`);

    // 6. Seed Trainer Leave Requests
    const leaveRequestsData = [
      {
        trainer: createdTrainers[0]._id,
        trainerName: createdTrainers[0].name,
        startDate: '2026-08-10',
        endDate: '2026-08-14',
        reason: 'Attending International Strength & Conditioning Summit in London',
        status: 'Pending'
      },
      {
        trainer: createdTrainers[1]._id,
        trainerName: createdTrainers[1].name,
        startDate: '2026-08-12',
        endDate: '2026-08-15',
        reason: 'Family Emergency Leave',
        status: 'Pending'
      },
      {
        trainer: createdTrainers[2]._id,
        trainerName: createdTrainers[2].name,
        startDate: '2026-08-01',
        endDate: '2026-08-05',
        reason: 'Annual Personal Recuperation Leave',
        status: 'Approved'
      }
    ];
    await LeaveRequest.insertMany(leaveRequestsData);
    console.log(`✅ Seeded ${leaveRequestsData.length} Trainer Leave Requests.`);

    // 7. Seed Equipment Items with maintenance logs
    const equipmentData = Array.from({ length: 150 }).map((_, i) => {
      let status = 'Operational';
      let issueReported = '';
      let reportedBy = '';

      if (i % 12 === 0) {
        status = 'Schedule Maintenance';
        issueReported = 'Hydraulic resistance belt slack detected during heavy workout';
        reportedBy = 'Coach Marcus Vance';
      } else if (i % 15 === 0) {
        status = 'Under Maintenance';
        issueReported = 'Digital Biostrenth screen calibration error';
        reportedBy = 'Coach Sarah Jenkins';
      } else if (i % 25 === 0) {
        status = 'Out of Service';
        issueReported = 'Motor bearing failure requiring factory part replacement';
        reportedBy = 'Gym Operations Staff';
      }

      return {
        equipmentId: `EQP-${1000 + i}`,
        branch: createdBranches[i % createdBranches.length]._id,
        name: i % 3 === 0 ? `Technogym Biostrenth Station #${i + 1}` : i % 3 === 1 ? `Eleiko Power Rack Station #${i + 1}` : `Cryo Vault Chamber #${i + 1}`,
        category: i % 3 === 0 ? 'Strength' : i % 3 === 1 ? 'Free Weights' : 'Recovery',
        status,
        issueReported,
        reportedBy,
        purchaseDate: '2025-01-15',
        lastMaintenanceDate: '2026-05-15',
        nextMaintenanceDate: '2026-08-15',
        maintenanceCost: status === 'Operational' ? 0 : 450 + (i % 5) * 100
      };
    });
    await Equipment.insertMany(equipmentData);
    console.log(`✅ Seeded ${equipmentData.length} Equipment Items.`);

    // 8. Seed Admin System Notifications
    const notificationsData = [
      { title: 'New Member Registrations', message: '20 new members have completed their registration and require personal trainer assignment.', type: 'System' },
      { title: 'Trainer Leave Request', message: 'Coach Marcus Vance submitted a leave request for Aug 10 - Aug 14.', type: 'System' },
      { title: 'Equipment Maintenance Report', message: 'Maintenance requested for Technogym Biostrenth Station #13 by Coach Marcus Vance.', type: 'System' },
      { title: 'Seasonal Membership Offer', message: 'ANNUAL CRIMSON ELITE pass seasonal offer (15% discount) is active until Sep 01.', type: 'Billing' }
    ];
    await Notification.insertMany(notificationsData);
    console.log(`✅ Seeded ${notificationsData.length} Admin Notifications.`);

    console.log('\n🎉 [ENTERPRISE SEED COMPLETE] MongoDB Atlas populated with GYMNEX Admin Operations dataset.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

seedData();
