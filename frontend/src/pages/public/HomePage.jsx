import React from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, CountUpNumber } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, Eyebrow } from '../../components/ui/UIComponents';
import { MOCK_PROGRAMS, MOCK_TRAINERS, MOCK_BRANCHES } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, ShieldCheck, Flame, Award, ArrowRight, Play, Star, CheckCircle, Zap } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dark-base">
        {/* Background Atmospheric Glow & Fog Overlay */}
        <div className="absolute inset-0 bg-crimson-radial opacity-60 pointer-events-none animate-glow" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-crimson-500/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Full-bleed Athlete Background Image with Editorial Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Athlete"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-base via-transparent to-dark-base" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <FadeIn direction="down">
            <Eyebrow>Enterprise Physical Culture SaaS & Performance</Eyebrow>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight text-white font-display leading-none">
              FORGED IN <span className="text-gradient-crimson">IRON</span> & CODE
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 font-normal leading-relaxed">
              The definitive all-in-one gym management platform. Connecting elite coaches, biometric analytics, and high-performance athletes in one seamless, cinematic ecosystem.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/membership')}
              icon={ArrowRight}
            >
              Start Free Trial
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate('/programs')}
              icon={Play}
            >
              Explore Programs
            </Button>
          </FadeIn>

          {/* Animated Stats Bar */}
          <FadeIn delay={0.4} className="pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-dark-card/80 border border-white/10 backdrop-blur-xl max-w-4xl mx-auto">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  <CountUpNumber value={150} suffix="+" />
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Global Locations</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-crimson-500 font-display">
                  <CountUpNumber value={85} suffix="k+" />
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Active Athletes</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  <CountUpNumber value={99.4} suffix="%" />
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Retention Rate</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-crimson-500 font-display">
                  <CountUpNumber value={4.9} suffix="/5" />
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Member Rating</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY CHOOSE GYMNEX */}
      <section className="py-24 bg-dark-surface border-t border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Architectural Edge"
            title="WHY THE WORLD'S BEST CHOOSE GYMNEX"
            subtitle="Built from the ground up for high-capacity luxury clubs, Olympic coaches, and athletes who demand perfection."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <StaggerItem>
              <Card className="h-full space-y-4">
                <div className="w-12 h-12 rounded-xl bg-crimson-500/10 border border-crimson-500/30 flex items-center justify-center text-crimson-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display uppercase">Biometric Access & Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Seamless QR access, automated turnstile integrations, and instant check-in velocity logging.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="h-full space-y-4">
                <div className="w-12 h-12 rounded-xl bg-crimson-500/10 border border-crimson-500/30 flex items-center justify-center text-crimson-500">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display uppercase">Periodized Workout Engine</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Interactive multi-phase program builders allowing coaches to prescribe microcycles, RPE targets, and tempo variables.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="h-full space-y-4">
                <div className="w-12 h-12 rounded-xl bg-crimson-500/10 border border-crimson-500/30 flex items-center justify-center text-crimson-500">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display uppercase">Predictive Revenue Analytics</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Real-time Recharts dashboards tracking MRR, churn probability, facility peak density, and trainer efficiency.
                </p>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-24 bg-dark-base relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeader
              eyebrow="Training Systems"
              title="FEATURED ATHLETIC PROGRAMS"
              subtitle="Engineered microcycles designed by master strength sports practitioners."
            />
            <Button variant="outline" onClick={() => navigate('/programs')} className="mt-4 md:mt-0">
              View All Programs
            </Button>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_PROGRAMS.map((program) => (
              <StaggerItem key={program.id}>
                <Card className="p-0 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="crimson">{program.level}</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-extrabold text-white font-display uppercase group-hover:text-crimson-500 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{program.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                      <span>{program.duration}</span>
                      <span>{program.workoutsPerWeek} Days / Wk</span>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FEATURED TRAINERS */}
      <section className="py-24 bg-dark-surface border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Master Staff"
            title="MEET OUR MASTER COACHES"
            subtitle="Former Olympians, PhD biomechanists, and world-record powerlifters."
            align="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {MOCK_TRAINERS.map((trainer) => (
              <StaggerItem key={trainer.id}>
                <Card className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-crimson-500/50 p-1">
                    <img
                      src={trainer.avatar}
                      alt={trainer.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display uppercase">{trainer.name}</h3>
                    <p className="text-xs text-crimson-500 font-semibold">{trainer.role}</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{trainer.bio}</p>
                  <div className="pt-2">
                    <Button variant="glass" size="sm" onClick={() => navigate('/trainers')}>
                      View Credentials
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* TRANSFORMATION HIGHLIGHTS & TESTIMONIALS */}
      <section className="py-24 bg-dark-base border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Proven Results"
            title="MEMBER TRANSFORMATIONS"
            subtitle="Real athletes. Verifiable body composition results."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <Card className="p-8 space-y-6">
              <div className="flex items-center gap-1 text-crimson-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-base text-gray-300 italic leading-relaxed">
                "GYMNEX transformed our entire operational bottleneck. Members love the app, booking classes takes 2 seconds, and our coach productivity increased by 40% in 60 days."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                  alt="Member"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Alexander Wright</h4>
                  <p className="text-xs text-crimson-500">VIP Crimson Member — -12kg Body Fat</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-6">
              <div className="flex items-center gap-1 text-crimson-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-base text-gray-300 italic leading-relaxed">
                "The workout builder and periodization schedule in GYMNEX is second to none. I prescribe 30 client routines a week with complete biomechanic precision."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400"
                  alt="Member"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Elena Rostova</h4>
                  <p className="text-xs text-crimson-500">Pro Performance Athlete</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-crimson-900 via-dark-surface to-dark-base border-t border-b border-crimson-500/30 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display">
            READY TO REVOLUTIONIZE YOUR ATHLETIC ENTERPRISE?
          </h2>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Join over 150 luxury fitness facilities globally. Claim your 14-day full access pass today.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/membership')} icon={ArrowRight}>
              Claim Your Pass Now
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
