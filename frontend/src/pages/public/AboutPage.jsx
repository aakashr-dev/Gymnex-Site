import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { SectionHeader, Card, AtmosphericBackground, LayeredHeroText, Button } from '../../components/ui/UIComponents';
import { useNavigate } from 'react-router-dom';

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen relative overflow-hidden">
        <AtmosphericBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <SectionHeader
            eyebrow="Our Manifesto"
            title="THE REVOLUTION OF PHYSICAL CULTURE"
            subtitle="GYMNEX was founded to bridge the gap between world-class sports science, architectural luxury, and enterprise software engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
              <h3 className="text-3xl font-black text-white font-display uppercase">
                ENGINEERED FOR THE TOP 1% OF FITNESS ENTERPRISES
              </h3>
              <p>
                Generic gym software was built in the early 2000s for static membership billing. We engineered GYMNEX as a high-performance operating system designed for modern human performance centers.
              </p>
              <p>
                From real-time biometric turnstile check-ins to automated RPE periodization algorithms, every line of code is forged for peak efficiency.
              </p>
              <div className="pt-2">
                <Button variant="primary" size="md" onClick={() => navigate('/membership')}>
                  EXPLORE PASS TIERS
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-crimson-glow">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000"
                alt="About GYMNEX"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
