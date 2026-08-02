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
    id: 'trn-1',
    name: 'Marcus Vance',
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
    title: 'TITAN HYPERTROPHY PROTOCOL',
    category: 'Hypertrophy & Strength',
    level: 'Advanced',
    duration: '12 Weeks',
    workoutsPerWeek: 5,
    instructor: 'Marcus Vance',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    description: 'An aggressive periodized hypertrophy system engineered to maximize muscle density, mechanical tension, and myofibrillar growth.',
    target: 'Muscle Gain & Power',
    exercisesCount: 42
  },
  {
    id: 'prog-2',
    title: 'INFERNO SHRED SYSTEM',
    category: 'Metabolic Fat Loss',
    level: 'Intermediate',
    duration: '8 Weeks',
    workoutsPerWeek: 4,
    instructor: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    description: 'High-density peripheral heart action paired with anaerobic intervals designed to melt fat while preserving elite athletic muscle.',
    target: 'Fat Loss & Conditioning',
    exercisesCount: 36
  },
  {
    id: 'prog-3',
    title: 'ATHLETIC MOBILITY & RECOVERY',
    category: 'Mobility & Flex',
    level: 'All Levels',
    duration: '6 Weeks',
    workoutsPerWeek: 3,
    instructor: 'Dmitri Volkov',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    description: 'Unlocking restricted fascia, restoring full joint range of motion, and preventing chronic lifting injuries.',
    target: 'Joint Health & Flexibility',
    exercisesCount: 28
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
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800'
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
    address: '450 Fifth Avenue, Midtown East',
    phone: '+1 (212) 555-0199',
    hours: '24/7 Access for VIP',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    amenities: ['Cryotherapy Chamber', 'Olympic Lifting Platforms', 'Rooftop Sprint Track', 'Executive Spa']
  },
  {
    id: 'br-2',
    name: 'GYMNEX Beverly Hills Sanctuary',
    city: 'Los Angeles, CA',
    address: '9600 Wilshire Blvd, Beverly Hills',
    phone: '+1 (310) 555-0144',
    hours: '05:00 AM - 12:00 AM',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    amenities: ['Infrared Sauna', 'Private VIP Suites', 'Organic Fuel Bar', 'Hydrotherapy Pool']
  },
  {
    id: 'br-3',
    name: 'GYMNEX London Mayfair',
    city: 'London, UK',
    address: '14 Berkeley Square, Mayfair',
    phone: '+44 20 7946 0912',
    hours: '06:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&q=80&w=800',
    amenities: ['Technogym Biostrenth Suite', 'Cold Plunge Pools', 'Physiotherapy Suite', 'Valet Parking']
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
