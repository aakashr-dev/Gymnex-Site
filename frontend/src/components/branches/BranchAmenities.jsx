import React from 'react';
import { Dumbbell, Activity, Users, Sun, Waves, HeartPulse, Flame, Wind, Lock, Coffee, Car, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchAmenities = () => {
  const amenitiesList = [
    { name: 'Strength Zone', icon: Dumbbell, desc: 'Eleiko power racks & Watson custom plate-loaded machines.' },
    { name: 'Cardio Suite', icon: Activity, desc: 'Technogym Skillrun treadmills with live performance telemetry.' },
    { name: 'Group Classes', icon: Users, desc: 'Spinning, HIIT, boxing conditioning, & HYROX training.' },
    { name: 'Yoga Studio', icon: Sun, desc: 'Acoustically isolated zen studio for mindfulness & mobility.' },
    { name: 'Hydro Pool', icon: Waves, desc: 'Temperature-controlled lap pool & hydrotherapy jets.' },
    { name: 'Recovery Center', icon: HeartPulse, desc: 'Cryotherapy chambers & hyperbaric oxygen therapy pods.' },
    { name: 'Infrared Sauna', icon: Flame, desc: 'Deep-tissue infrared heat detoxification suites.' },
    { name: 'Steam Spa', icon: Wind, desc: 'Eucalyptus-infused marble steam rooms for respiratory renewal.' },
    { name: 'Executive Lockers', icon: Lock, desc: 'Keyless biometric lockers, daily laundry, & Aesop toiletries.' },
    { name: 'Protein Bar', icon: Coffee, desc: 'Organic superfood smoothies, espresso, & macro fuel bowls.' },
    { name: 'Valet Parking', icon: Car, desc: 'Complimentary executive valet parking at all flagship locations.' },
    { name: 'High-Speed WiFi', icon: Wifi, desc: 'Enterprise Wi-Fi 6 coverage for work & biometric syncing.' }
  ];

  return (
    <section className="py-20 bg-dark-base relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-amber-500 font-black uppercase text-xs tracking-widest">WORLD-CLASS STANDARDS</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            SIGNATURE AMENITIES
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Every GYMNEX location is outfitted with uncompromising amenities designed to elevate your training, performance, and recovery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenitiesList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-dark-card border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 hover:bg-dark-card/90 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-black group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-white uppercase font-display tracking-wide group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
