import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowRight, Globe, Share2, MessageCircle, Send } from 'lucide-react';
import { Button } from '../ui/UIComponents';

export const Footer = () => {
  return (
    <footer className="bg-dark-base border-t border-white/10 text-gray-400 pt-16 pb-24 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-crimson-500 flex items-center justify-center shadow-crimson-glow">
                <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white font-display uppercase">
                GYM<span className="text-crimson-500">NEX</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The premier high-performance physical culture SaaS and elite athletic facility management suite built for world-class gym chains and elite athletes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Globe, Share2, MessageCircle, Send].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-crimson-500 hover:border-crimson-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display mb-4">Platform Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/programs" className="hover:text-crimson-500 transition-colors">Training Programs</Link></li>
              <li><Link to="/trainers" className="hover:text-crimson-500 transition-colors">Master Coaches</Link></li>
              <li><Link to="/membership" className="hover:text-crimson-500 transition-colors">Membership Tiers</Link></li>
              <li><Link to="/classes" className="hover:text-crimson-500 transition-colors">Live Class Timetable</Link></li>
              <li><Link to="/branches" className="hover:text-crimson-500 transition-colors">Global Flagships</Link></li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/facilities" className="hover:text-crimson-500 transition-colors">Luxury Facilities</Link></li>
              <li><Link to="/gallery" className="hover:text-crimson-500 transition-colors">Visual Gallery</Link></li>
              <li><Link to="/events" className="hover:text-crimson-500 transition-colors">Upcoming Events</Link></li>
              <li><Link to="/reviews" className="hover:text-crimson-500 transition-colors">Member Transformations</Link></li>
              <li><Link to="/corporate" className="hover:text-crimson-500 transition-colors">Corporate Wellness</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">Performance Dispatch</h4>
            <p className="text-xs text-gray-400">Receive weekly biomechanic research, event access, and program drops.</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3.5 py-2.5 bg-dark-card border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-500 placeholder:text-gray-600"
              />
              <Button variant="primary" size="sm" className="w-full">
                Subscribe <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 GYMNEX Platform. All rights reserved. Precision Fitness Engineering.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Security Specs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
