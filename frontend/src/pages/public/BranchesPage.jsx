import React from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge } from '../../components/ui/UIComponents';
import { MOCK_BRANCHES } from '../../data/mockData';
import { MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

export const BranchesPage = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Global Network"
            title="GLOBAL FLAGSHIP LOCATIONS"
            subtitle="Explore our ultra-luxury sanctuaries across major metropolis hubs."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_BRANCHES.map((branch) => (
              <StaggerItem key={branch.id}>
                <Card className="p-0 overflow-hidden flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="crimson">{branch.city}</Badge>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-extrabold text-white font-display uppercase">{branch.name}</h3>
                      <div className="space-y-2 text-xs text-gray-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-crimson-500 shrink-0" />
                          <span>{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-crimson-500 shrink-0" />
                          <span>{branch.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-crimson-500 shrink-0" />
                          <span>{branch.hours}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-3 border-t border-white/10">
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {branch.amenities.map((am, idx) => (
                            <Badge key={idx} variant="gray" className="text-[10px]">{am}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button variant="glass" size="sm" className="w-full">Book Facility Tour</Button>
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
