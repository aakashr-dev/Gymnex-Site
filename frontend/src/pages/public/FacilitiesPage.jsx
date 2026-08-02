import React from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Card, Badge } from '../../components/ui/UIComponents';

export const FacilitiesPage = () => {
  const zones = [
    {
      title: 'FREE WEIGHT & POWER ARENA',
      category: 'Strength Zone',
      desc: 'Precision Eleiko powerlifting platforms, Watson custom dumbbells up to 100kg, and calibrated steel plates.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'RECOVERY & CRYOTHERAPY LAB',
      category: 'Regeneration',
      desc: 'Whole-body -110°C CryoSpace chambers, hyperbaric oxygen suites, and infrared red-light therapy beds.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'CARDIO VELOCITY TERRACE',
      category: 'Metabolic Floor',
      desc: 'Technogym Skillrun curved treadmills, Wattbike Atom smart trainers, and Concept2 ergometers with live heart-rate monitoring.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'FINNISH SAUNA & COLD PLUNGE',
      category: 'Hydrotherapy',
      desc: 'Cedarwood thermal sauna maintained at 90°C paired with 4°C chilled mineral water plunged pools.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Architectural Luxury"
            title="FACILITIES & ZONES SHOWCASE"
            subtitle="Explore our meticulously engineered zones designed for peak physiological output."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {zones.map((zone, idx) => (
              <StaggerItem key={idx}>
                <Card className="p-0 overflow-hidden group">
                  <div className="relative h-72 overflow-hidden">
                    <img src={zone.image} alt={zone.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="crimson">{zone.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-extrabold text-white font-display uppercase">{zone.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{zone.desc}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
};
