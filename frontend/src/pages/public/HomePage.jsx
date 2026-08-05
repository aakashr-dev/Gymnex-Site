import React, { useState, useEffect } from 'react';
import { PageTransition, StaggerContainer, StaggerItem, CountUpNumber, AnimationSection, FadeIn } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, AtmosphericBackground, LayeredHeroText, CircularCard, Card } from '../../components/ui/UIComponents';
import { Gym360TourModal } from '../../components/ui/Gym360TourModal';
import { MOCK_TRAINERS } from '../../data/mockData';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Flame, Zap, Star, ChevronDown, Check, Award, Compass } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [introDone, setIntroDone] = useState(() => !!window.__introDone);
  const [trainers, setTrainers] = useState(MOCK_TRAINERS.slice(0, 3));

  useEffect(() => {
    if (window.__introDone) {
      setIntroDone(true);
    }
    const handleIntroComplete = () => {
      setIntroDone(true);
    };
    window.addEventListener('introComplete', handleIntroComplete);

    const fetchLiveTrainers = async () => {
      try {
        const data = await api.getTrainers();
        if (Array.isArray(data) && data.length > 0) {
          let combined = [...data];
          if (combined.length < 3) {
            const extra = MOCK_TRAINERS.filter(m => !combined.some(t => t.name === m.name));
            combined = [...combined, ...extra];
          }
          setTrainers(combined.slice(0, 3));
        } else {
          setTrainers(MOCK_TRAINERS.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load live trainers for home page:', err);
        setTrainers(MOCK_TRAINERS.slice(0, 3));
      }
    };
    fetchLiveTrainers();

    return () => {
      window.removeEventListener('introComplete', handleIntroComplete);
    };
  }, []);

  return (
    <PageTransition>
      {/* 1. HERO SECTION - Reference Composition Benchmark */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dark-base select-none">
        {/* Animated Smoke/Fog Multi-Layer Atmosphere */}
        <AtmosphericBackground />

        {/* Far Left Vertical Social Media Rail */}
        <FadeIn direction="left" delay={0.2} className="hidden lg:flex flex-col items-center gap-5 absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-30">
          <span className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/30 to-white/10"></span>
          <div className="flex flex-col gap-5 text-gray-400">
            <a href="#" className="hover:text-amber-500 transition-colors duration-300 transform hover:scale-110 p-1" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-300 transform hover:scale-110 p-1" title="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-300 transform hover:scale-110 p-1" title="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <span className="w-[1px] h-20 bg-gradient-to-b from-white/10 via-white/30 to-transparent"></span>
        </FadeIn>

        {/* Stacked Oversized Display Headline ("HARD BODY GAME / TIME TO CHANGE") - Strictly Behind Athletes (z-5) */}
        <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center z-5 text-center px-4 pointer-events-none">
          <LayeredHeroText key="hero-headline" line1="HARD BODY GAME" line2="TIME TO CHANGE" delay={0.15} />
        </div>

        {/* Mobile Composition */}
        <div className="md:hidden relative z-10 text-center px-4 pt-6 space-y-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase text-amber-500 font-display tracking-tight"
          >
            HARD BODY GAME
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-4xl sm:text-5xl font-black uppercase text-white font-display tracking-tight -mt-2"
          >
            TIME TO CHANGE
          </motion.h1>
        </div>

        {/* Centered Cutout Male & Female Athletes Photo - Strictly In Foreground (z-20) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl h-[68vh] md:h-[82vh] flex items-end justify-center pointer-events-none">
          {/* Foreground Swirling Smoke Puff Veil */}
          <motion.div
            animate={{
              x: [-30, 30, -30],
              y: [10, -20, 10],
              opacity: [0.35, 0.65, 0.35],
              scale: [0.95, 1.1, 0.95]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 w-full h-[400px] bg-gradient-to-t from-white/[0.12] via-gray-200/[0.06] to-transparent blur-[75px] pointer-events-none z-15"
          />

          <motion.img
            initial={{ opacity: 0, scale: 0.88, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            src="/hero-athletes.png"
            alt="GYMNEX Master Athletes"
            className="h-full w-auto object-cover object-top filter contrast-105 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] relative z-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent z-25 pointer-events-none" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 text-gray-500">
          <span className="text-[10px] uppercase font-bold tracking-widest">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-amber-500" />
          </motion.div>
        </div>
      </section>

      {/* 2. STANDALONE STATS BAR SECTION */}
      <AnimationSection direction="up" delay={0.1} className="py-10 bg-dark-surface border-t border-b border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <FadeIn direction="up" delay={0.1} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white font-display">
                <CountUpNumber value={150} suffix="+" />
              </div>
              <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-widest">Global Flagships</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 font-display">
                <CountUpNumber value={85} suffix="k+" />
              </div>
              <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-widest">Active Athletes</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white font-display">
                <CountUpNumber value={99.4} suffix="%" />
              </div>
              <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-widest">Retention Rate</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-500 font-display">
                <CountUpNumber value={4.9} suffix="/5" />
              </div>
              <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-widest">Member Rating</p>
            </FadeIn>
          </div>
        </div>
      </AnimationSection>

      {/* 3. DEDICATED 360° VIRTUAL GYM TOUR SECTION */}
      <AnimationSection direction="up" delay={0.15} className="py-24 bg-dark-base border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            eyebrow="Immersive 3D Experience"
            title="360° VIRTUAL GYM TOUR"
            subtitle="Explore our ultra-luxury physical culture flagships from anywhere. Drag to pan 360°, inspect bio-calibrated equipment, and view live zone specifications."
            align="center"
          />

          {/* Interactive Card Banner Container */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIs360ModalOpen(true)}
            className="relative rounded-3xl overflow-hidden border border-amber-500/30 group cursor-pointer aspect-[21/9] min-h-[350px] shadow-2xl bg-dark-card transition-all duration-500 hover:border-amber-500 hover:shadow-crimson-glow"
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1800"
              alt="GYMNEX 360 Virtual Tour"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-black/40 to-black/30 flex flex-col items-center justify-center text-center p-6 space-y-5">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-crimson-glow group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-10 h-10 animate-spin-slow" />
              </div>

              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-black uppercase text-amber-500 tracking-widest bg-black/60 px-4 py-1.5 rounded-full border border-amber-500/40">
                  Interactive Panorama Mode
                </span>
                <h3 className="text-2xl md:text-4xl font-black uppercase text-white font-display">
                  CLICK TO LAUNCH 360° TOUR
                </h3>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIs360ModalOpen(true);
                }}
                icon={Compass}
                className="px-8 py-3.5 text-xs font-black tracking-widest rounded-full uppercase"
              >
                ENTER 360° GYM VIEW
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimationSection>

      {/* 4. MASTER TRAINERS SECTION */}
      <AnimationSection direction="up" delay={0.2} className="py-28 bg-dark-surface border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            eyebrow="Master Staff"
            title="EXECUTIVE COACHES"
            align="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {trainers.map((trainer) => (
              <StaggerItem key={trainer._id || trainer.id || trainer.trainerId}>
                <CircularCard
                  image={trainer.photo || trainer.avatar || trainer.profileImage || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600'}
                  title={trainer.name}
                  subtitle={trainer.role || trainer.specialization || trainer.specialty || 'Master Coach'}
                  description={trainer.bio || `${trainer.experience || '5+ Years'} Experience Specialist`}
                  onClick={() => navigate('/trainers')}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimationSection>

      {/* 5. HIGH-IMPACT FINAL CTA BANNER */}
      <AnimationSection direction="up" delay={0.15} className="pt-24 pb-0 bg-gradient-to-b from-dark-surface via-dark-base to-black border-t border-b border-amber-500/30 relative text-center overflow-hidden">
        {/* Ambient Warm Golden Glow behind cutout athlete */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/15 blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display leading-tight"
          >
            READY TO TRANSFORM YOUR BODY?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Join over 85,000 athletes training across 150+ ultra-luxury facilities worldwide. Elevate your baseline today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-20 pt-2"
          >
            <Button variant="primary" size="lg" onClick={() => navigate('/membership')} icon={ArrowRight}>
              BECOME A MEMBER
            </Button>
          </motion.div>

          {/* Cutout Athlete Holding Chains (Cropped to Hip) - Scroll Reveal Animation & Snug Bottom */}
          <div className="mt-3 relative z-10 w-full max-w-xl mx-auto flex justify-center items-end">
            <motion.img
              initial={{ opacity: 0, y: 90, scale: 0.85, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35, margin: '0px 0px -120px 0px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              src="/chain-athlete.png"
              alt="GYMNEX Master Athlete Chains Cutout"
              className="w-full h-auto max-h-[340px] sm:max-h-[380px] object-contain filter contrast-110 brightness-105 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] relative z-10"
            />
          </div>
        </div>
      </AnimationSection>

      {/* Interactive 360 Gym Tour Modal */}
      <Gym360TourModal isOpen={is360ModalOpen} onClose={() => setIs360ModalOpen(false)} />
    </PageTransition>
  );
};

