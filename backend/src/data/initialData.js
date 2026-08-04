export const initialUsers = [
  {
    name: 'Master Enterprise Admin',
    email: 'admin@email.com',
    password: 'Admin@123',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.v@gymnex.com',
    password: 'password123',
    role: 'Trainer',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Alexander Wright',
    email: 'alex.wright@example.com',
    password: 'password123',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  }
];

export const initialBranches = [
  {
    id: 'br-1',
    name: 'GYMNEX Manhattan Flagship',
    city: 'New York, NY',
    region: 'North America',
    address: '450 Fifth Avenue, Midtown East',
    phone: '+1 (212) 555-0199',
    hours: '24/7 VIP Access',
    status: 'Open Now',
    area: '45,000 sq ft',
    membersCount: '4,200+',
    coachesCount: 34,
    rating: 4.9,
    description: 'Our global flagship sanctuary featuring 4 floors of Technogym Biostrenth, cryotherapy vaults, rooftop sprint track, and executive spa.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    amenities: ['Cryotherapy Chamber', 'Olympic Lifting Platforms', 'Rooftop Sprint Track', 'Executive Spa', 'Hydro Pool', 'Valet Parking'],
    hasParking: true,
    hasPool: true,
    hasRecovery: true
  },
  {
    id: 'br-2',
    name: 'GYMNEX Beverly Hills Sanctuary',
    city: 'Los Angeles, CA',
    region: 'North America',
    address: '9600 Wilshire Blvd, Beverly Hills',
    phone: '+1 (310) 555-0144',
    hours: '05:00 AM - 12:00 AM',
    status: 'Open Now',
    area: '38,000 sq ft',
    membersCount: '3,800+',
    coachesCount: 28,
    rating: 4.95,
    description: 'Ultra-exclusive West Coast sanctuary with private VIP suites, organic fuel bar, infrared therapy pods, and hydrotherapy pool.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    amenities: ['Infrared Sauna', 'Private VIP Suites', 'Organic Fuel Bar', 'Hydrotherapy Pool', 'DEXA Lab', 'Valet Parking'],
    hasParking: true,
    hasPool: true,
    hasRecovery: true
  },
  {
    id: 'br-3',
    name: 'GYMNEX London Mayfair',
    city: 'London, UK',
    region: 'Europe',
    address: '14 Berkeley Square, Mayfair',
    phone: '+44 20 7946 0912',
    hours: '06:00 AM - 11:00 PM',
    status: 'Open Now',
    area: '32,000 sq ft',
    membersCount: '2,900+',
    coachesCount: 24,
    rating: 4.88,
    description: 'Bespoke European sanctuary in heart of Mayfair, offering biostrenth suites, cold plunge pools, and biomechanics lab.',
    image: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&q=80&w=800',
    amenities: ['Technogym Biostrenth', 'Cold Plunge Pools', 'Physiotherapy Suite', 'Valet Parking', 'Executive Sauna'],
    hasParking: true,
    hasPool: true,
    hasRecovery: true
  }
];

export const initialMembers = [
  {
    id: 'mem-101',
    name: 'Alexander Wright',
    email: 'alex.wright@example.com',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    plan: 'VIP Crimson Elite',
    status: 'Active',
    joinDate: '2025-01-15',
    expiryDate: '2026-01-15',
    assignedTrainer: 'Marcus Vance',
    weight: '82.5 kg',
    height: '185 cm',
    bodyFat: '14.2%',
    visitStreak: 14,
    totalVisits: 84,
    qrCode: 'GYM-ALEX-10192'
  },
  {
    id: 'mem-102',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    plan: 'Pro Performance',
    status: 'Active',
    joinDate: '2025-03-10',
    expiryDate: '2026-03-10',
    assignedTrainer: 'Sarah Jenkins',
    weight: '61.0 kg',
    height: '172 cm',
    bodyFat: '18.5%',
    visitStreak: 8,
    totalVisits: 45,
    qrCode: 'GYM-ELENA-88219'
  }
];

export const initialTrainers = [
  {
    id: 'trn-1',
    name: 'Marcus Vance',
    role: 'Master Strength & Bodybuilding Specialist',
    email: 'marcus.v@gymnex.com',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600',
    specialty: 'Hypertrophy & Powerlifting',
    experience: '11+ Years',
    rating: 4.98,
    clientsCount: 28
  },
  {
    id: 'trn-2',
    name: 'Sarah Jenkins',
    role: 'Head of Functional Fitness & HIIT',
    email: 'sarah.j@gymnex.com',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600',
    specialty: 'Metabolic Conditioning & Agility',
    experience: '8+ Years',
    rating: 4.92,
    clientsCount: 22
  }
];

export const initialMemberships = [
  {
    id: 'plan-base',
    name: 'CORE ACCESS',
    price: '$99',
    period: '/month',
    features: ['Single Branch Facility Access', 'Full Weightroom', 'Locker Room & Steam Access']
  },
  {
    id: 'plan-crimson',
    name: 'CRIMSON ELITE PASS',
    price: '$189',
    period: '/month',
    features: ['Unlimited Global Multi-Branch Access', 'Recovery Suite (Cryo & Sauna)', '2 Trainer Sessions']
  },
  {
    id: 'plan-black',
    name: 'VIP BLACK EXECUTIVE',
    price: '$349',
    period: '/month',
    features: ['24/7 Priority Global Access', 'Unlimited Coaching', 'Executive Locker & Laundry Service']
  }
];

export const initialPrograms = [
  {
    id: 'prog-1',
    title: 'TITAN HYPERTROPHY ARCHITECTURE',
    category: 'Hypertrophy',
    level: 'Advanced',
    duration: '12 Weeks',
    intensity: 'High',
    trainerName: 'Marcus Vance',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    description: 'High-volume periodized muscle architecture targeting mechanical tension and structural density.',
    features: ['Biostrenth Machine Integration', 'Progressive Overload Tracking', '1-on-1 Biomechanics Review']
  },
  {
    id: 'prog-2',
    title: 'WARRIOR METABOLIC SHRED',
    category: 'HIIT & Conditioning',
    level: 'Intermediate',
    duration: '8 Weeks',
    intensity: 'Maximum',
    trainerName: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    description: 'Aggressive metabolic conditioning blending sprint intervals, kettlebell power, and row sprints.',
    features: ['HR Zone Monitoring', 'Metabolic Rate DEXA Scan', 'High Velocity Conditioning']
  }
];

export const initialEvents = [
  {
    id: 'evt-1',
    title: 'GLOBAL OLYMPIC LIFTING MASTERCLASS',
    date: '2026-08-15',
    time: '10:00 AM - 02:00 PM',
    location: 'GYMNEX Manhattan Flagship',
    category: 'Masterclass',
    speaker: 'Marcus Vance',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    description: 'Exclusive 4-hour technique clinic focusing on snatch biomechanics, clean & jerk speed, and barbell efficiency.'
  },
  {
    id: 'evt-2',
    title: 'BIOHACKING & CRYOTHERAPY SYMPOSIUM',
    date: '2026-08-22',
    time: '04:00 PM - 07:00 PM',
    location: 'GYMNEX Beverly Hills Sanctuary',
    category: 'Expos & Seminars',
    speaker: 'Dr. Aris Thorne',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    description: 'Learn cold-shock response recovery, infrared hyperthermia protocols, and DEXA body optimization.'
  }
];

export const initialReviews = [
  {
    id: 'rev-1',
    name: 'Harrison Sterling',
    role: 'Managing Director & Athlete',
    branch: 'GYMNEX Manhattan Flagship',
    rating: 5,
    quote: 'The Technogym Biostrenth suite and cryotherapy chambers at Manhattan Flagship completely changed my recovery cycle. Unmatched standard of fitness in NYC.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'rev-2',
    name: 'Victoria Vance',
    role: 'Triathlete & Executive',
    branch: 'GYMNEX Beverly Hills Sanctuary',
    rating: 5,
    quote: 'Having global access to Beverly Hills and Mayfair when traveling gives me seamless training continuity. The private VIP suites are world-class.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  }
];
