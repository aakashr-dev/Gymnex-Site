import React from 'react';
import { motion } from 'framer-motion';
import { CountUpNumber, MagneticButton } from '../motion/MotionComponents';
import { Search, X, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

/* Atmospheric Drifting Smoke Background Layer with multi-tier smoke billows & golden spotlight glow */
export const AtmosphericBackground = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
    {/* Core Golden Ambient Glow behind athlete */}
    <motion.div
      animate={{
        scale: [1, 1.15, 1.03, 1],
        opacity: [0.35, 0.6, 0.45, 0.35]
      }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] md:w-[1300px] h-[500px] md:h-[750px] bg-amber-500/15 blur-[180px] rounded-full pointer-events-none"
    />

    {/* Flank Left Massive Billowing Smoke Cloud */}
    <motion.div
      animate={{
        x: [-40, 50, -40],
        y: [0, -35, 0],
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.7, 0.4]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-10 -left-44 w-[900px] h-[750px] bg-gradient-to-tr from-white/[0.14] via-gray-300/[0.08] to-transparent blur-[110px] rounded-full pointer-events-none"
    />

    {/* Flank Right Massive Billowing Smoke Cloud */}
    <motion.div
      animate={{
        x: [50, -40, 50],
        y: [-20, 25, -20],
        scale: [1, 1.12, 1],
        opacity: [0.35, 0.65, 0.35]
      }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-10 -right-44 w-[950px] h-[750px] bg-gradient-to-tl from-white/[0.13] via-gray-300/[0.07] to-transparent blur-[120px] rounded-full pointer-events-none"
    />

    {/* Swirling Center Fog Core Behind Athlete */}
    <motion.div
      animate={{
        scale: [0.95, 1.15, 0.95],
        opacity: [0.45, 0.75, 0.45],
        rotate: [0, 8, -5, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] md:w-[950px] h-[550px] bg-white/[0.09] blur-[95px] rounded-full pointer-events-none"
    />

    {/* Floating Micro Smoke Billow 1 (Top Left) */}
    <motion.div
      animate={{
        x: [-20, 30, -20],
        y: [-30, 20, -30],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-12 left-[10%] w-[500px] h-[400px] bg-white/[0.06] blur-[80px] rounded-full pointer-events-none"
    />

    {/* Floating Micro Smoke Billow 2 (Top Right) */}
    <motion.div
      animate={{
        x: [30, -20, 30],
        y: [20, -30, 20],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-12 right-[10%] w-[550px] h-[420px] bg-white/[0.06] blur-[85px] rounded-full pointer-events-none"
    />

    {/* Bottom Vignette & Fade to Black Gradient */}
    <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-dark-base via-dark-base/90 to-transparent z-10 pointer-events-none" />
  </div>
);

/* Layered Oversized Text-Behind-Subject Helper - Rugged Editorial Headline Typography */
export const LayeredHeroText = ({ line1, line2, delay = 0, className = '' }) => (
  <div className={`flex flex-col items-center justify-center text-center select-none relative z-0 pointer-events-none ${className}`}>
    <motion.h1
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 0.95, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[12rem] font-extrabold uppercase tracking-widest leading-[0.8] font-display text-amber-500 font-rugged-display filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.98)]"
    >
      {line1}
    </motion.h1>
    {line2 && (
      <motion.h1
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 0.98, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[12rem] font-extrabold uppercase tracking-widest leading-[0.8] font-display text-white -mt-1 sm:-mt-3 md:-mt-5 lg:-mt-8 font-rugged-display filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.99)]"
      >
        {line2}
      </motion.h1>
    )}
  </div>
);

/* Circular Photo Card Component - Reference Style Feature Highlight */
export const CircularCard = ({ image, title, subtitle, description, onClick, onMouseEnter, onMouseLeave, className = '' }) => (
  <div
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`text-center space-y-4 group ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-white/10 p-1.5 group-hover:border-amber-500 group-hover:shadow-crimson-glow transition-all duration-500 bg-dark-card">
      <img
        src={image}
        alt={title}
        className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-105"
      />
    </div>
    <div className="space-y-1">
      <h3 className="text-xl md:text-2xl font-black text-white font-display uppercase tracking-wider group-hover:text-amber-500 transition-colors">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-amber-500 font-extrabold uppercase tracking-widest font-sans">{subtitle}</p>}
    </div>
    {description && (
      <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed line-clamp-3 font-normal">
        {description}
      </p>
    )}
  </div>
);

export const Eyebrow = ({ children, className = '' }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-black tracking-widest text-amber-500 uppercase font-sans ${className}`}>
    <span className="w-1.5 h-3.5 bg-amber-500 rounded-sm inline-block"></span>
    {children}
  </div>
);

export const SectionHeader = ({ eyebrow, title, subtitle, align = 'left', className = '' }) => (
  <div className={`space-y-2 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
    {eyebrow && (
      <div className={`flex items-center gap-2 text-xs font-extrabold tracking-widest text-amber-500 uppercase font-sans ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-3.5 bg-amber-500 rounded-sm inline-block"></span>
        <span>{eyebrow}</span>
      </div>
    )}
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white font-display leading-[0.95] filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
      {title}
    </h2>
    {subtitle && (
      <p className={`text-gray-400 max-w-2xl text-sm md:text-base font-normal leading-relaxed pt-1 font-sans ${align === 'center' ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  onClick,
  disabled,
  type = 'button'
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black tracking-widest uppercase transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-dark-base disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer font-display';

  const variants = {
    primary: 'bg-dark-card/90 text-white border border-amber-500/50 hover:bg-amber-500 hover:text-black hover:border-amber-400 hover:shadow-crimson-glow font-black active:scale-95 transition-all duration-300',
    outline: 'border-2 border-amber-500/60 text-amber-500 bg-transparent hover:bg-amber-500 hover:text-black hover:border-amber-400 hover:shadow-crimson-glow font-black transition-all duration-300',
    glass: 'bg-white/5 border border-white/10 text-white hover:bg-amber-500 hover:text-black hover:border-amber-400 hover:shadow-crimson-glow backdrop-blur-md transition-all duration-300',
    ghost: 'text-gray-300 hover:text-amber-500 hover:bg-white/5 transition-all duration-300',
    dark: 'bg-dark-card border border-white/10 text-white hover:bg-amber-500 hover:text-black hover:border-amber-400 hover:shadow-crimson-glow transition-all duration-300'
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs gap-2',
    md: 'px-7 py-3 text-sm gap-2.5 tracking-widest',
    lg: 'px-9 py-4 text-base gap-3 tracking-widest font-black'
  };

  return (
    <MagneticButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </MagneticButton>
  );
};

export const Card = ({ children, className = '', hoverGlow = true, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-dark-card border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-400 relative overflow-hidden ${
      hoverGlow ? 'hover:border-amber-500/40 hover:shadow-crimson-glow hover:-translate-y-1.5' : ''
    } ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Badge = ({ children, variant = 'amber', className = '' }) => {
  const variants = {
    amber: 'bg-amber-500/10 text-amber-500 border border-amber-500/30',
    crimson: 'bg-amber-500/10 text-amber-500 border border-amber-500/30',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    gray: 'bg-gray-800/60 text-gray-300 border border-gray-700/50',
    blue: 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest font-sans ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const StatCard = ({ title, value, prefix = '', suffix = '', trend, icon: Icon, description }) => (
  <Card className="flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-black tracking-widest text-gray-400 uppercase font-sans">{title}</span>
      {Icon && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
    <div>
      <div className="text-4xl md:text-5xl font-black font-display text-white mb-1 tracking-wider">
        <CountUpNumber value={value} prefix={prefix} suffix={suffix} />
      </div>
      {trend && (
        <div className={`text-xs font-bold flex items-center gap-1 mt-1 font-sans ${trend.startsWith('+') ? 'text-emerald-400' : 'text-amber-500'}`}>
          <span>{trend}</span>
          <span className="text-gray-500 font-normal">vs last month</span>
        </div>
      )}
      {description && <p className="text-xs text-gray-400 mt-1.5 font-sans">{description}</p>}
    </div>
  </Card>
);

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`bg-dark-surface border border-white/10 rounded-3xl w-full ${maxWidth} overflow-hidden shadow-2xl relative`}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
          <h3 className="text-xl font-black text-white uppercase tracking-wider font-display">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-7 max-h-[80vh] overflow-y-auto font-sans">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const DataTable = ({ columns, data, searchPlaceholder = 'Search records...' }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-card border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-dark-card">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-white/5 uppercase text-xs font-black tracking-widest text-gray-400 border-b border-white/10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SkeletonLoader = ({ className = 'h-24 w-full' }) => (
  <div className={`bg-white/5 animate-pulse rounded-2xl border border-white/5 ${className}`} />
);
