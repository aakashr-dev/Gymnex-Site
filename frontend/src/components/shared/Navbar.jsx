import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/UIComponents';
import { ChevronDown, Menu, X, LayoutDashboard, Target, MapPin, Building2, ChevronRight, LogIn, ShieldCheck, User, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_BRANCHES } from '../../data/mockData';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Membership', path: '/membership' },
    { name: 'Branches', path: '/branches', hasDropdown: true },
  ];

  const secondaryLinks = [
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
    { name: 'Corporate', path: '/corporate' },
  ];

  const getDashboardPath = () => {
    if (role === 'Admin') return '/admin';
    if (role === 'Trainer') return '/trainer';
    return '/member';
  };

  const handleBranchClick = (branchId) => {
    setBranchesDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(`/branches#${branchId}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-surface/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Target/Ring Icon + Two-Tone Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shadow-crimson-glow group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="text-3xl font-black tracking-wider text-white font-display uppercase font-rugged-display">
            GYM<span className="text-amber-500">NEX</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-gray-300 font-sans">
          {mainLinks.map((link) => {
            const isActive = location.pathname === link.path;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.path}
                  className="relative py-1"
                  onMouseEnter={() => setBranchesDropdownOpen(true)}
                  onMouseLeave={() => setBranchesDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1.5 transition-colors hover:text-amber-500 ${
                      isActive ? 'text-amber-500 font-extrabold' : ''
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        branchesDropdownOpen ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </Link>

                  {/* Branches Hover Dropdown */}
                  {branchesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 z-50">
                      <div className="bg-dark-card/95 border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-white/10 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-amber-500" />
                            GYMNEX Sanctuaries
                          </span>
                          <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                            {MOCK_BRANCHES.length} Locations
                          </span>
                        </div>

                        <div className="space-y-1">
                          {MOCK_BRANCHES.map((branch) => (
                            <button
                              key={branch.id}
                              onClick={() => handleBranchClick(branch.id)}
                              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 transition-all group/item flex items-center gap-3 cursor-pointer"
                            >
                              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover/item:border-amber-500/50 group-hover/item:bg-amber-500 group-hover/item:text-black transition-all shrink-0">
                                <MapPin className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-bold text-gray-200 group-hover/item:text-white truncate uppercase font-display tracking-wider">
                                  {branch.name}
                                </p>
                                <p className="text-[10px] text-gray-400 font-medium truncate flex items-center gap-1">
                                  <span>{branch.city}</span>
                                </p>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover/item:text-amber-500 group-hover/item:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>

                        <div className="pt-1.5 border-t border-white/10">
                          <Link
                            to="/branches"
                            onClick={() => setBranchesDropdownOpen(false)}
                            className="block w-full text-center py-2 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors"
                          >
                            Explore All Locations & Facilities →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-amber-500 relative py-1 ${
                  isActive ? 'text-amber-500 font-extrabold' : ''
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div
            className="relative py-1"
            onMouseEnter={() => setMoreDropdownOpen(true)}
            onMouseLeave={() => setMoreDropdownOpen(false)}
          >
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-amber-500 cursor-pointer"
            >
              <span>EXPLORE</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
            </button>
            {moreDropdownOpen && (
              <div className="absolute top-full right-0 pt-2 w-48 z-50">
                <div className="bg-dark-card border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMoreDropdownOpen(false)}
                      className="block px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-xl transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact (Last Nav Link) */}
          <Link
            to="/contact"
            className={`transition-colors hover:text-amber-500 relative py-1 ${
              location.pathname === '/contact' ? 'text-amber-500 font-extrabold' : ''
            }`}
          >
            Contact
            {location.pathname === '/contact' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
            )}
          </Link>
        </nav>

        {/* CTA Login Dropdown */}
        <div className="hidden lg:flex items-center gap-3">
          <div
            className="relative"
            onMouseEnter={() => setLoginDropdownOpen(true)}
            onMouseLeave={() => setLoginDropdownOpen(false)}
          >
            <Button
              variant="glass"
              size="sm"
              onClick={() => {
                setLoginDropdownOpen(false);
                navigate('/auth');
              }}
              icon={LogIn}
              className="border-white/15 text-white hover:bg-white/10 font-bold cursor-pointer"
            >
              <span>Login</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
            </Button>

            {loginDropdownOpen && (
              <div className="absolute top-full right-0 pt-2 w-56 z-50">
                <div className="bg-dark-card/95 border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-white/10 flex items-center justify-between">
                    <span>Select Portal Login</span>
                    <span className="text-[9px] text-gray-400">3 Portals</span>
                  </div>

                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      navigate('/auth/admin');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 transition-all flex items-center gap-2.5 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-200 group-hover:text-white uppercase font-display">
                        Admin Login
                      </p>
                      <p className="text-[10px] text-gray-400">Enterprise Control</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      navigate('/auth/trainer');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 transition-all flex items-center gap-2.5 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-200 group-hover:text-white uppercase font-display">
                        Trainer Login
                      </p>
                      <p className="text-[10px] text-gray-400">Clients & Workouts</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      navigate('/auth/member');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 transition-all flex items-center gap-2.5 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-200 group-hover:text-white uppercase font-display">
                        Member Login
                      </p>
                      <p className="text-[10px] text-gray-400">Personal Dashboard</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            className="rounded-full shadow-crimson-glow font-extrabold bg-amber-500 text-black hover:bg-amber-600"
            onClick={() => navigate('/membership')}
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
          {mainLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div key={link.path} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-amber-500"
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => setMobileBranchesOpen(!mobileBranchesOpen)}
                      className="p-2 text-amber-500"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileBranchesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {mobileBranchesOpen && (
                    <div className="pl-4 space-y-2 border-l border-amber-500/30 ml-2">
                      {MOCK_BRANCHES.map((branch) => (
                        <button
                          key={branch.id}
                          onClick={() => handleBranchClick(branch.id)}
                          className="w-full text-left py-1.5 flex items-center justify-between text-xs text-gray-300 hover:text-amber-500"
                        >
                          <span className="font-semibold">{branch.name}</span>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{branch.city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-amber-500"
              >
                {link.name}
              </Link>
            );
          })}

          {secondaryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-amber-500"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 hover:text-amber-300"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Portal Login</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="glass"
                size="sm"
                className="text-[10px] py-1.5"
                onClick={() => { setMobileMenuOpen(false); navigate('/auth/admin'); }}
              >
                Admin
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="text-[10px] py-1.5"
                onClick={() => { setMobileMenuOpen(false); navigate('/auth/trainer'); }}
              >
                Trainer
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="text-[10px] py-1.5"
                onClick={() => { setMobileMenuOpen(false); navigate('/auth/member'); }}
              >
                Member
              </Button>
            </div>
            <Button variant="primary" size="sm" onClick={() => { setMobileMenuOpen(false); navigate('/membership'); }}>
              Join GYMNEX
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

