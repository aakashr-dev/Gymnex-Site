import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/UIComponents';
import { Dumbbell, Menu, X, ChevronDown, Sparkles, UserCheck, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Membership', path: '/membership' },
    { name: 'Classes', path: '/classes' },
    { name: 'Branches', path: '/branches' },
  ];

  const secondaryLinks = [
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
    { name: 'Corporate', path: '/corporate' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (role === 'Admin') return '/admin';
    if (role === 'Trainer') return '/trainer';
    return '/member';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-surface/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-crimson-500 flex items-center justify-center shadow-crimson-glow group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white font-display uppercase">
            GYM<span className="text-crimson-500">NEX</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-crimson-500 relative py-1 ${
                location.pathname === link.path ? 'text-white font-semibold' : ''
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-crimson-500 rounded-full" />
              )}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onMouseEnter={() => setMoreDropdownOpen(true)}
              className="flex items-center gap-1 transition-colors hover:text-crimson-500 py-1"
            >
              <span>Explore</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {moreDropdownOpen && (
              <div
                onMouseLeave={() => setMoreDropdownOpen(false)}
                className="absolute top-full right-0 mt-2 w-48 bg-dark-card border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl space-y-1"
              >
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMoreDropdownOpen(false)}
                    className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-crimson-500/20 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="glass"
            size="sm"
            onClick={() => navigate(getDashboardPath())}
            icon={LayoutDashboard}
          >
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/auth')}
          >
            Join GYMNEX
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-surface border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          {[...mainLinks, ...secondaryLinks].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-300 hover:text-crimson-500 font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Button variant="glass" size="sm" onClick={() => { setMobileMenuOpen(false); navigate(getDashboardPath()); }}>
              Go to Dashboard ({role})
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}>
              Join Platform
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
