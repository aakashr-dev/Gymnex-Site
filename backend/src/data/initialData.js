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
    id: 'trn-hari',
    name: 'Coach Hari',
    role: 'Master Olympic Strength & Powerlifting Specialist',
    email: 'hari@gymnex.com',
    avatar: '/trainer-hari-black.png',
    photo: '/trainer-hari-black.png',
    specialty: 'Olympic Weightlifting & Powerlifting',
    experience: '10+ Years',
    rating: 4.99,
    clientsCount: 35,
    bio: 'Master Olympic strength practitioner specializing in maximum 1RM power output, barbell biomechanics, and elite muscle architecture.'
  },
  {
    id: 'trn-logesh',
    name: 'Coach Logesh',
    role: 'Master Hypertrophy & Muscle Architecture Specialist',
    email: 'logesh@gymnex.com',
    avatar: '/trainer-logesh.png',
    photo: '/trainer-logesh.png',
    specialty: 'Muscle Hypertrophy & Biomechanics',
    experience: '9+ Years',
    rating: 4.98,
    clientsCount: 31,
    bio: 'Hypertrophy specialist focused on high-performance muscle architecture, progressive volume overload, and compound movements.'
  },
  {
    id: 'trn-kumar',
    name: 'Coach Kumar',
    role: 'Metabolic Conditioning & Fat Oxidation Specialist',
    email: 'kumar@gymnex.com',
    avatar: '/trainer-kumar.png',
    photo: '/trainer-kumar.png',
    specialty: 'Metabolic Conditioning & Fat Loss',
    experience: '7+ Years',
    rating: 4.96,
    clientsCount: 29,
    bio: 'High-intensity conditioning coach specializing in fat oxidation protocols, kettlebell circuits, and tactical endurance.'
  },
  {
    id: 'trn-lisa',
    name: 'Coach Lisa',
    role: 'Functional Fitness & Calisthenics Specialist',
    email: 'lisa@gymnex.com',
    avatar: '/trainer-lisa.png',
    photo: '/trainer-lisa.png',
    specialty: 'Functional Mobility & Bodyweight Agility',
    experience: '6+ Years',
    rating: 4.95,
    clientsCount: 24,
    bio: 'Functional fitness specialist focusing on calisthenics mastery, kinetic core stability, and agility conditioning.'
  },
  {
    id: 'trn-hemath',
    name: 'Coach Hemath',
    role: 'Transformation & Body Sculpting Specialist',
    email: 'hemath@gymnex.com',
    avatar: '/trainer-hemath.png',
    photo: '/trainer-hemath.png',
    specialty: 'Body Recomposition & Muscle Sculpting',
    experience: '8+ Years',
    rating: 4.97,
    clientsCount: 26,
    bio: 'Transformation authority specializing in lean body recomposition, hypertrophy splits, and aesthetic sculpting.'
  },
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

export const initialPrograms = [
  {
    id: 'prog-1',
    title: 'TITAN HYPERTROPHY ARCHITECTURE',
    category: 'Muscle & Mass Building',
    level: 'Advanced',
    duration: '12 Weeks',
    intensity: 'High',
    instructor: 'Coach logesh',
    trainerName: 'Coach logesh',
    image: '/program-1.jpg',
    description: 'High-volume periodized hypertrophy protocol engineered for maximum chest width, arm mass, and quad sweep.',
    features: ['Biostrenth Machine Integration', 'Progressive Overload Tracking', '1-on-1 Biomechanics Review'],
    target: 'Muscle Mass & Hypertrophy'
  },
  {
    id: 'prog-2',
    title: 'STRENGTH & POWERLIFTING MAX OUTPUT',
    category: 'Strength & Powerlifting',
    level: 'Advanced',
    duration: '10 Weeks',
    intensity: 'Maximum',
    instructor: 'Coach Hari',
    trainerName: 'Coach Hari',
    image: '/program-2.jpg',
    description: 'Heavy compound powerlifting system focused on squat, bench press, and deadlift 1RM peak performance.',
    features: ['RPE-Based Auto-Regulation', 'Velocity Barbell Tracking', 'Power Competition Prep'],
    target: '1RM Strength Peak'
  },
  {
    id: 'prog-3',
    title: 'WARRIOR METABOLIC SHRED',
    category: 'Fat Loss & Shredding',
    level: 'Intermediate',
    duration: '8 Weeks',
    intensity: 'High',
    instructor: 'Coach Kumar',
    trainerName: 'Coach Kumar',
    image: '/program-3.jpg',
    description: 'Aggressive fat oxidation conditioning combining kettlebell circuits, sprint intervals, and metabolic acceleration.',
    features: ['HR Zone Monitoring', 'Body Composition DEXA Review', 'Fat Oxidation Protocols'],
    target: 'Rapid Fat Oxidation'
  },
  {
    id: 'prog-4',
    title: 'TRANSFORMATION & BODY SCULPTING',
    category: 'Transformation & Body Sculpting',
    level: 'All Levels',
    duration: '12 Weeks',
    intensity: 'High',
    instructor: 'Coach Hemath',
    trainerName: 'Coach Hemath',
    image: '/program-4.jpg',
    description: 'Full body aesthetic transformation program designed to build lean muscle definition while incinerating stubborn fat.',
    features: ['Tailored Nutrition Macros', 'Weekly Progress Photography', 'Customized Routine Splits'],
    target: 'Body Recomposition'
  },
  {
    id: 'prog-5',
    title: 'OLYMPIC WEIGHTLIFTING MASTERCLASS',
    category: 'Strength & Powerlifting',
    level: 'Advanced',
    duration: '6 Weeks',
    intensity: 'Maximum',
    instructor: 'Coach Hari',
    trainerName: 'Coach Hari',
    image: '/program-5.jpg',
    description: 'Precision technical coaching on Snatch, Clean & Jerk efficiency, and explosive bar speed.',
    features: ['High Speed Video Analysis', 'Eleiko Olympic Platform Pass', 'Triple Extension Drills'],
    target: 'Explosive Power & Skill'
  },
  {
    id: 'prog-6',
    title: 'FUNCTIONAL CALISTHENICS & AGILITY',
    category: 'Functional & Calisthenics',
    level: 'Beginner - Intermediate',
    duration: '8 Weeks',
    intensity: 'Moderate',
    instructor: 'Coach Lisa',
    trainerName: 'Coach Lisa',
    image: '/program-6.jpg',
    description: 'Bodyweight mastery, core stability, balance conditioning, and joint mobility enhancement.',
    features: ['Gymnastic Ring Drills', 'Core Kinetic Conditioning', 'Flexibility Mastery'],
    target: 'Functional Strength & Balance'
  },
  {
    id: 'prog-7',
    title: 'RECOVERY & CRYOTHERAPY VAULT PROTOCOL',
    category: 'Recovery & Mobility',
    level: 'All Levels',
    duration: 'Ongoing',
    intensity: 'Low Impact',
    instructor: 'Coach Dmitri Volkov',
    trainerName: 'Coach Dmitri Volkov',
    image: '/program-7.jpg',
    description: 'Cold shock cryotherapy, infrared sauna thermal therapy, and post-rehab joint mobilization.',
    features: ['Cryotherapy Chamber Access', 'Infrared Hyperthermia', 'Myofascial Release'],
    target: 'Accelerated Recovery'
  },
  {
    id: 'prog-8',
    title: 'BOXING & COMBAT CONDITIONING',
    category: 'Fat Loss & Shredding',
    level: 'Intermediate',
    duration: '6 Weeks',
    intensity: 'Maximum',
    instructor: 'Coach Sarah Jenkins',
    trainerName: 'Coach Sarah Jenkins',
    image: '/program-1.jpg',
    description: 'High-intensity heavy bag strikes, footwork drills, and cardiovascular endurance conditioning.',
    features: ['Heavy Bag Strikes', 'Speed Bag Drills', 'Anaerobic Endurance'],
    target: 'Stamina & Combat Fitness'
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

export const initialMemberships = [
  {
    planId: 'plan-base',
    id: 'plan-base',
    name: 'CORE ACCESS',
    price: 99,
    period: '/month',
    duration: '1 Month',
    popular: false,
    badge: 'Standard',
    status: 'Active',
    benefits: [
      'Access to Single Branch Facility',
      'Full Weightroom & Cardio Floor',
      'Locker Room & Steam Shower Access',
      'GYMNEX Mobile App Member Dashboard',
      '1 Complimentary Trainer Assessment'
    ],
    features: [
      'Access to Single Branch Facility',
      'Full Weightroom & Cardio Floor',
      'Locker Room & Steam Shower Access',
      'GYMNEX Mobile App Member Dashboard',
      '1 Complimentary Trainer Assessment'
    ]
  },
  {
    planId: 'plan-crimson',
    id: 'plan-crimson',
    name: 'CRIMSON ELITE PASS',
    price: 189,
    period: '/month',
    duration: '1 Month',
    popular: true,
    badge: 'MOST POPULAR',
    status: 'Active',
    benefits: [
      'Unlimited Global Access to All Branches',
      'Unlimited Group Fitness & Spin Classes',
      'Recovery Suite (Cryo & Sauna 4x/mo)',
      'Customized Workout & Diet Plans in App',
      '2 Monthly Personal Trainer Sessions',
      'Guest Pass Access (2 visits/month)'
    ],
    features: [
      'Unlimited Global Access to All Branches',
      'Unlimited Group Fitness & Spin Classes',
      'Recovery Suite (Cryo & Sauna 4x/mo)',
      'Customized Workout & Diet Plans in App',
      '2 Monthly Personal Trainer Sessions',
      'Guest Pass Access (2 visits/month)'
    ]
  },
  {
    planId: 'plan-black',
    id: 'plan-black',
    name: 'VIP BLACK EXECUTIVE',
    price: 349,
    period: '/month',
    duration: '1 Month',
    popular: false,
    badge: 'ULTIMATE',
    status: 'Active',
    benefits: [
      '24/7 Priority Global Access',
      'Unlimited Personal Trainer Coaching',
      'Private Executive Locker & Laundry Service',
      'Unlimited Cryotherapy & Infrared Sauna',
      'Biometric & DEXA Body Scan Monthly',
      'Dedicated VIP Concierge Line'
    ],
    features: [
      '24/7 Priority Global Access',
      'Unlimited Personal Trainer Coaching',
      'Private Executive Locker & Laundry Service',
      'Unlimited Cryotherapy & Infrared Sauna',
      'Biometric & DEXA Body Scan Monthly',
      'Dedicated VIP Concierge Line'
    ]
  }
];
