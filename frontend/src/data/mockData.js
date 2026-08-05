export const MOCK_MEMBERS = [
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
  },
  {
    id: 'mem-103',
    name: 'David Chen',
    email: 'd.chen@example.com',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    plan: 'Standard Access',
    status: 'Pending',
    joinDate: '2025-06-01',
    expiryDate: '2026-06-01',
    assignedTrainer: 'Unassigned',
    weight: '76.8 kg',
    height: '178 cm',
    bodyFat: '21.0%',
    visitStreak: 2,
    totalVisits: 12,
    qrCode: 'GYM-CHEN-33910'
  },
  {
    id: 'mem-104',
    name: 'Jessica Taylor',
    email: 'jtaylor@example.com',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    plan: 'VIP Crimson Elite',
    status: 'Active',
    joinDate: '2024-11-20',
    expiryDate: '2025-11-20',
    assignedTrainer: 'Marcus Vance',
    weight: '58.2 kg',
    height: '168 cm',
    bodyFat: '16.8%',
    visitStreak: 21,
    totalVisits: 142,
    qrCode: 'GYM-JESS-77312'
  }
];

export const MOCK_TRAINERS = [
  {
    id: 'trn-hari',
    name: 'Coach Hari',
    gender: 'male',
    role: 'Master Olympic Strength & Powerlifting Specialist',
    email: 'hari@gymnex.com',
    avatar: '/trainer-hari-black.png',
    photo: '/trainer-hari-black.png',
    specialty: 'Olympic Weightlifting & Powerlifting',
    specialization: 'Olympic Weightlifting & Powerlifting',
    experience: '10+ Years',
    rating: 4.99,
    clientsCount: 35,
    bio: 'Master Olympic strength practitioner specializing in maximum 1RM power output, barbell biomechanics, and elite muscle architecture.',
    schedule: 'Mon - Sat (07:00 - 18:00)',
    certifications: ['USA Powerlifting Level 3', 'CSCS Master Coach', 'Olympic Weightlifting Specialist']
  },
  {
    id: 'trn-lisa',
    name: 'Coach Lisa',
    gender: 'female',
    role: 'Functional Fitness & Calisthenics Specialist',
    email: 'lisa@gymnex.com',
    avatar: '/trainer-lisa.png',
    photo: '/trainer-lisa.png',
    specialty: 'Functional Mobility & Bodyweight Agility',
    specialization: 'Functional Mobility & Bodyweight Agility',
    experience: '6+ Years',
    rating: 4.95,
    clientsCount: 24,
    bio: 'Functional fitness specialist focusing on calisthenics mastery, kinetic core stability, and agility conditioning.',
    schedule: 'Mon - Fri (08:00 - 17:00)',
    certifications: ['Gymnastic Bodies Level 2', 'NASM-CPT', 'EXOS Functional Specialist']
  },
  {
    id: 'trn-kumar',
    name: 'Coach Kumar',
    gender: 'male',
    role: 'Metabolic Conditioning & Fat Oxidation Specialist',
    email: 'kumar@gymnex.com',
    avatar: '/trainer-kumar.png',
    photo: '/trainer-kumar.png',
    specialty: 'Metabolic Conditioning & Fat Loss',
    specialization: 'Metabolic Conditioning & Fat Loss',
    experience: '7+ Years',
    rating: 4.96,
    clientsCount: 29,
    bio: 'High-intensity conditioning coach specializing in fat oxidation protocols, kettlebell circuits, and tactical endurance.',
    schedule: 'Mon - Sat (07:00 - 18:00)',
    certifications: ['CrossFit Level 2', 'NASM-CPT', 'EXOS Endurance Specialist']
  },
  {
    id: 'trn-logesh',
    name: 'Coach Logesh',
    gender: 'male',
    role: 'Master Hypertrophy & Muscle Architecture Specialist',
    email: 'logesh@gymnex.com',
    avatar: '/trainer-logesh.png',
    photo: '/trainer-logesh.png',
    specialty: 'Muscle Hypertrophy & Biomechanics',
    specialization: 'Muscle Hypertrophy & Biomechanics',
    experience: '9+ Years',
    rating: 4.98,
    clientsCount: 31,
    bio: 'Hypertrophy specialist focused on high-performance muscle architecture, progressive volume overload, and compound movements.',
    schedule: 'Mon - Sat (06:00 - 17:00)',
    certifications: ['CSCS Certified', 'USA Weightlifting Level 2', 'Precision Nutrition Master']
  },
  {
    id: 'trn-hemath',
    name: 'Coach Hemath',
    gender: 'male',
    role: 'Transformation & Body Sculpting Specialist',
    email: 'hemath@gymnex.com',
    avatar: '/trainer-hemath.png',
    photo: '/trainer-hemath.png',
    specialty: 'Body Recomposition & Muscle Sculpting',
    specialization: 'Body Recomposition & Muscle Sculpting',
    experience: '8+ Years',
    rating: 4.97,
    clientsCount: 26,
    bio: 'Transformation authority specializing in lean body recomposition, hypertrophy splits, and aesthetic sculpting.',
    schedule: 'Mon - Sat (06:00 - 16:00)',
    certifications: ['NASM Master Trainer', 'EXOS Performance Coach', 'Precision Nutrition Level 2']
  },
  {
    id: 'trn-1',
    name: 'Marcus Vance',
    gender: 'male',
    role: 'Master Strength & Bodybuilding Specialist',
    email: 'marcus.v@gymnex.com',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600',
    specialty: 'Hypertrophy & Powerlifting',
    experience: '11+ Years',
    rating: 4.98,
    clientsCount: 28,
    bio: 'Former Olympic lifting coach specializing in high-performance muscle architecture and heavy compound biomechanics.',
    schedule: 'Mon - Fri (06:00 - 15:00)',
    certifications: ['CSCS Certified', 'USA Powerlifting Level 2', 'Precision Nutrition Master']
  },
  {
    id: 'trn-2',
    name: 'Sarah Jenkins',
    gender: 'female',
    role: 'Head of Functional Fitness & HIIT',
    email: 'sarah.j@gymnex.com',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600',
    specialty: 'Metabolic Conditioning & Agility',
    experience: '8+ Years',
    rating: 4.95,
    clientsCount: 22,
    bio: 'Specializes in high-intensity conditioning, fat loss transformation, and tactical movement patterns.',
    schedule: 'Mon - Sat (08:00 - 17:00)',
    certifications: ['CrossFit Level 3', 'NASM-CPT', 'EXOS Performance Specialist']
  },
  {
    id: 'trn-3',
    name: 'Dmitri Volkov',
    gender: 'male',
    role: 'Mobility & Recovery Specialist',
    email: 'dmitri.v@gymnex.com',
    avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
    specialty: 'Post-Rehab & Biomechanics',
    experience: '12+ Years',
    rating: 4.99,
    clientsCount: 19,
    bio: 'Focuses on spine health, injury prevention, advanced joint articulation, and recovery protocols.',
    schedule: 'Tue - Sun (10:00 - 19:00)',
    certifications: ['Doctor of Physical Therapy', 'FMS Level 2', 'FRC Functional Specialist']
  }
];

export const MOCK_PROGRAMS = [
  {
    id: 'prog-1',
    title: 'TITAN BODYBUILDING & MASS',
    category: 'Muscle & Mass Building',
    level: 'Advanced',
    duration: '12 Weeks',
    workoutsPerWeek: 5,
    instructor: 'Marcus Vance',
    image: '/program-1.jpg',
    description: 'Intense 5-day bodybuilding split targeting maximum chest width, lats thickness, bicep peak, and leg quad sweep.',
    target: 'Muscle Mass & Hypertrophy',
    exercisesCount: 42
  },
  {
    id: 'prog-2',
    title: 'INFERNO BELLY FAT SHRED',
    category: 'Fat Loss & Shredding',
    level: 'Intermediate',
    duration: '8 Weeks',
    workoutsPerWeek: 4,
    instructor: 'Sarah Jenkins',
    image: '/program-2.jpg',
    description: 'High-intensity dumbbell circuits and treadmill sprint intervals engineered to burn 800+ calories per session.',
    target: 'Fat Loss & Body Recomposition',
    exercisesCount: 36
  },
  {
    id: 'prog-3',
    title: 'POWERLIFTING 5x5 HEAVY STRENGTH',
    category: 'Strength & Powerlifting',
    level: 'Elite',
    duration: '10 Weeks',
    workoutsPerWeek: 4,
    instructor: 'Marcus Vance',
    image: '/program-3.jpg',
    description: 'Heavy barbell squat, bench press, and deadlift progressive overload protocol for raw physical strength.',
    target: 'Maximal Barbell Strength',
    exercisesCount: 28
  },
  {
    id: 'prog-4',
    title: 'V-TAPER CHEST & BACK SCULPT',
    category: 'Muscle & Mass Building',
    level: 'Intermediate',
    duration: '8 Weeks',
    workoutsPerWeek: 4,
    instructor: 'Marcus Vance',
    image: '/program-4.jpg',
    description: 'Focused hypertrophy program for wide 3D shoulders, aesthetic lat spread, and chiseled upper chest.',
    target: 'Aesthetic V-Taper Physique',
    exercisesCount: 38
  },
  {
    id: 'prog-5',
    title: 'SIX-PACK ABS & CORE DESTRUCTION',
    category: 'Functional & Calisthenics',
    level: 'All Levels',
    duration: '6 Weeks',
    workoutsPerWeek: 3,
    instructor: 'Dmitri Volkov',
    image: '/program-5.jpg',
    description: 'Deep core stabilization, hanging leg raises, cable woodchoppers, and abdominal muscle definition protocol.',
    target: 'Abdominal Definition & Core Power',
    exercisesCount: 32
  },
  {
    id: 'prog-6',
    title: 'METABOLIC KETTLEBELL & DUMBBELL BURN',
    category: 'Fat Loss & Shredding',
    level: 'All Levels',
    duration: '6 Weeks',
    workoutsPerWeek: 4,
    instructor: 'Sarah Jenkins',
    image: '/program-6.jpg',
    description: 'Full-body dumbbell supersets and kettlebell swings designed for maximum post-exercise oxygen consumption (EPOC).',
    target: 'Calorie Burn & Conditioning',
    exercisesCount: 30
  },
  {
    id: 'prog-7',
    title: 'ARMS & SHOULDERS HYPERTROPHY',
    category: 'Muscle & Mass Building',
    level: 'Intermediate',
    duration: '6 Weeks',
    workoutsPerWeek: 3,
    instructor: 'Marcus Vance',
    image: '/program-7.jpg',
    description: 'High-volume bicep peak isolation, tricep extension overload, and deltoid lateral raise specialization.',
    target: 'Arm Volume & Shoulder Width',
    exercisesCount: 26
  },
  {
    id: 'prog-8',
    title: 'SQUAT & DEADLIFT MAX OVERLOAD',
    category: 'Strength & Powerlifting',
    level: 'Advanced',
    duration: '8 Weeks',
    workoutsPerWeek: 4,
    instructor: 'Marcus Vance',
    image: '/program-1.jpg',
    description: 'Lower body posterior chain strength protocol focusing on heavy squat technique and deadlift lockout power.',
    target: 'Lower Body Raw Power',
    exercisesCount: 34
  },
  {
    id: 'prog-9',
    title: 'TRANSFORMATION & BODY SCULPTING',
    category: 'Transformation & Body Sculpting',
    level: 'All Levels',
    duration: '12 Weeks',
    workoutsPerWeek: 5,
    instructor: 'Sarah Jenkins',
    image: '/program-2.jpg',
    description: 'Full body aesthetic transformation program designed to build lean muscle definition while incinerating stubborn fat.',
    target: 'Body Recomposition',
    exercisesCount: 40
  },
  {
    id: 'prog-10',
    title: 'RECOVERY & CRYOTHERAPY VAULT PROTOCOL',
    category: 'Recovery & Mobility',
    level: 'All Levels',
    duration: 'Ongoing',
    workoutsPerWeek: 3,
    instructor: 'Dmitri Volkov',
    image: '/program-3.jpg',
    description: 'Cold shock cryotherapy, infrared sauna thermal therapy, and post-rehab joint mobilization.',
    target: 'Accelerated Recovery',
    exercisesCount: 15
  }
];

export const MOCK_CLASSES = [
  {
    id: 'cls-1',
    title: 'CRIMSON VELOCITY SPIN',
    category: 'Cardio',
    instructor: 'Sarah Jenkins',
    room: 'Studio A - Cycle Theater',
    time: '07:00 AM - 07:50 AM',
    days: 'Mon, Wed, Fri',
    capacity: 25,
    booked: 21,
    intensity: 'Extreme',
    image: '/class-1.jpg'
  },
  {
    id: 'cls-2',
    title: 'OLYMPIC BARBELL LAB',
    category: 'Strength',
    instructor: 'Marcus Vance',
    room: 'Main Arena Zone 1',
    time: '10:00 AM - 11:15 AM',
    days: 'Tue, Thu, Sat',
    capacity: 15,
    booked: 15,
    intensity: 'High',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cls-3',
    title: 'HYPER-MOBILITY & DEEP TISSUE',
    category: 'Recovery',
    instructor: 'Dmitri Volkov',
    room: 'Zenith Recovery Suite',
    time: '05:30 PM - 06:30 PM',
    days: 'Everyday',
    capacity: 20,
    booked: 12,
    intensity: 'Low',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_BRANCHES = [
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
    coords: { x: 30, y: 38 },
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
    coords: { x: 18, y: 42 },
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
    coords: { x: 48, y: 30 },
    hasParking: true,
    hasPool: true,
    hasRecovery: true
  },
  {
    id: 'br-4',
    name: 'GYMNEX Tokyo Ginza',
    city: 'Tokyo, Japan',
    region: 'Asia Pacific',
    address: '6-10-1 Ginza, Chuo-ku',
    phone: '+81 3 5555 0188',
    hours: '24/7 VIP Access',
    status: 'Open Now',
    area: '40,000 sq ft',
    membersCount: '3,500+',
    coachesCount: 30,
    rating: 4.96,
    description: 'High-tech Asian flagship engineered with hyperbaric recovery chambers, Japanese Onsen hydro-spa, and AI gait lab.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    amenities: ['Japanese Onsen Spa', 'Hyperbaric Chamber', 'AI Gait Analysis', 'Olympic Platforms', 'Protein Bar'],
    coords: { x: 82, y: 44 },
    hasParking: true,
    hasPool: true,
    hasRecovery: true
  },
  {
    id: 'br-5',
    name: 'GYMNEX Dubai Marina',
    city: 'Dubai, UAE',
    region: 'Middle East',
    address: 'Marina Plaza, Level 4-6',
    phone: '+971 4 555 0190',
    hours: '24/7 VIP Access',
    status: 'Open Now',
    area: '50,000 sq ft',
    membersCount: '5,100+',
    coachesCount: 42,
    rating: 4.97,
    description: 'Architectural marvel overlooking Dubai Marina with indoor sprint track, altitude training room, and VIP private elevators.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
    amenities: ['Altitude Chamber', 'Rooftop Infinity Pool', 'Cryo Vault', 'Executive VIP Suite', 'Valet Parking'],
    coords: { x: 62, y: 46 },
    hasParking: true,
    hasPool: true,
    hasRecovery: true
  },
  {
    id: 'br-6',
    name: 'GYMNEX Sydney Harbour',
    city: 'Sydney, Australia',
    region: 'Asia Pacific',
    address: '1 Martin Place, Sydney CBD',
    phone: '+61 2 9555 0133',
    hours: '05:30 AM - 10:30 PM',
    status: 'Open Now',
    area: '30,000 sq ft',
    membersCount: '2,600+',
    coachesCount: 20,
    rating: 4.89,
    description: 'Harbourfront sanctuary featuring open-air performance deck, Olympic lifting bays, and recovery lounge.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
    amenities: ['Harbour View Deck', 'Olympic Lifting Bays', 'Infrared Sauna', 'Fuel Bar', 'Locker Valet'],
    coords: { x: 88, y: 78 },
    hasParking: false,
    hasPool: false,
    hasRecovery: true
  }
];

export const MOCK_BRANCH_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Harrison Sterling',
    role: 'Managing Director & Athlete',
    branch: 'GYMNEX Manhattan Flagship',
    rating: 5,
    quote: 'The Technogym Biostrenth suite and cryotherapy chambers at Manhattan Flagship completely changed my recovery cycle. Unmatched standard of fitness in NYC.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 't-2',
    name: 'Victoria Vance',
    role: 'Triathlete & Executive',
    branch: 'GYMNEX Beverly Hills Sanctuary',
    rating: 5,
    quote: 'Having global access to Beverly Hills and Mayfair when traveling gives me seamless training continuity. The private VIP suites are world-class.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 't-3',
    name: 'Kenji Takahashi',
    role: 'Powerlifter & Tech Lead',
    branch: 'GYMNEX Tokyo Ginza',
    rating: 5,
    quote: 'The precision of the AI gait analysis and hyperbaric recovery in Ginza is unmatched. It feels like training inside a futuristic sports lab.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  }
];

export const MOCK_BRANCH_FAQS = [
  {
    id: 'faq-1',
    question: 'Is my GYMNEX membership valid across all global branches?',
    answer: 'Yes! Crimson Elite Pass and VIP Black Executive members enjoy unlimited global multi-club access to all GYMNEX sanctuaries worldwide without extra charges.'
  },
  {
    id: 'faq-2',
    question: 'Can I bring a guest when visiting a different branch?',
    answer: 'Crimson Elite and VIP Black members receive complimentary monthly guest passes. Guests can experience all club facilities including group sessions and spa facilities.'
  },
  {
    id: 'faq-3',
    question: 'Is valet parking available at all flagship locations?',
    answer: 'Valet parking is complimentary for VIP Black members at our Manhattan, Beverly Hills, London Mayfair, Tokyo, and Dubai locations.'
  },
  {
    id: 'faq-4',
    question: 'Are day lockers and permanent locker rentals available?',
    answer: 'All locations offer high-security digital day lockers. Executive permanent lockers with laundry service are included with VIP Black Executive memberships.'
  },
  {
    id: 'faq-5',
    question: 'Can I transfer my dedicated Personal Trainer sessions between locations?',
    answer: 'Yes, your 1-on-1 coaching credits can be redeemed with certified master trainers at any GYMNEX location globally via the member mobile app.'
  },
  {
    id: 'faq-6',
    question: 'Do you offer custom corporate membership packages for enterprise teams?',
    answer: 'We provide corporate wellness tiers with global multi-location access, DEXA body scans, and private team training events. Contact our executive concierge team for details.'
  }
];

export const MOCK_MEMBERSHIPS = [
  {
    id: 'plan-base',
    name: 'CORE ACCESS',
    price: '$99',
    period: '/month',
    popular: false,
    badge: 'Standard',
    features: [
      'Access to Single Branch Facility',
      'Full Weightroom & Cardio Floor',
      'Locker Room & Steam Shower Access',
      'GYMNEX Mobile App Member Dashboard',
      '1 Complimentary Trainer Assessment'
    ]
  },
  {
    id: 'plan-crimson',
    name: 'CRIMSON ELITE PASS',
    price: '$189',
    period: '/month',
    popular: true,
    badge: 'MOST POPULAR',
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
    id: 'plan-black',
    name: 'VIP BLACK EXECUTIVE',
    price: '$349',
    period: '/month',
    popular: false,
    badge: 'ULTIMATE',
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

export const MOCK_EQUIPMENT = [
  { id: 'eq-1', name: 'Eleiko Power Rack Station #1', zone: 'Heavy Free Weights', status: 'Operational', lastService: '2025-07-10', nextService: '2025-10-10' },
  { id: 'eq-2', name: 'Technogym Skillrun Treadmill 04', zone: 'Cardio Suite', status: 'Operational', lastService: '2025-06-22', nextService: '2025-09-22' },
  { id: 'eq-3', name: 'CryoSpace Professional Cryo Chamber', zone: 'Recovery Lab', status: 'Service Due', lastService: '2025-04-15', nextService: '2025-08-01' },
  { id: 'eq-4', name: 'Watson Pendulum Squat Machine', zone: 'Leg Division', status: 'Operational', lastService: '2025-07-01', nextService: '2025-11-01' }
];

export const MOCK_PAYMENTS = [
  { id: 'inv-9901', memberName: 'Alexander Wright', amount: '$189.00', date: '2025-08-01', status: 'Paid', method: 'Visa ending 4242', item: 'Crimson Elite Monthly' },
  { id: 'inv-9902', memberName: 'Elena Rostova', amount: '$189.00', date: '2025-08-01', status: 'Paid', method: 'MasterCard ending 8810', item: 'Crimson Elite Monthly' },
  { id: 'inv-9903', memberName: 'David Chen', amount: '$99.00', date: '2025-07-28', status: 'Pending', method: 'Apple Pay', item: 'Core Access Monthly' },
  { id: 'inv-9904', memberName: 'Jessica Taylor', amount: '$349.00', date: '2025-07-25', status: 'Paid', method: 'Amex ending 1009', item: 'VIP Black Executive' }
];

export const MOCK_NOTIFICATIONS = [
  { id: 'notif-1', title: 'Class Confirmed', message: 'Your spot in Crimson Velocity Spin tomorrow 07:00 AM is reserved.', date: '10 mins ago', read: false, type: 'info' },
  { id: 'notif-2', title: 'Workout Assigned', message: 'Coach Marcus Vance updated your Titan Hypertrophy Week 4 program.', date: '2 hours ago', read: false, type: 'success' },
  { id: 'notif-3', title: 'Membership Renewal', message: 'Your Crimson Elite Pass renews in 5 days.', date: '1 day ago', read: true, type: 'warning' }
];
