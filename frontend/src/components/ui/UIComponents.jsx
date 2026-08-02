import React from 'react';
import { motion } from 'framer-motion';
import { CountUpNumber, MagneticButton } from '../motion/MotionComponents';
import { Search, X, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const Eyebrow = ({ children, className = '' }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-crimson-500 uppercase ${className}`}>
    <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse"></span>
    {children}
  </div>
);

export const SectionHeader = ({ eyebrow, title, subtitle, align = 'left', className = '' }) => (
  <div className={`space-y-3 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 max-w-2xl text-base md:text-lg font-normal leading-relaxed">
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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:ring-offset-2 focus:ring-offset-dark-base disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-crimson-500 text-white hover:bg-crimson-600 shadow-crimson-glow hover:shadow-crimson-glow font-semibold',
    outline: 'border border-crimson-500/50 text-crimson-500 hover:bg-crimson-500 hover:text-white',
    glass: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-md',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
    dark: 'bg-dark-card border border-white/10 text-white hover:bg-dark-cardHover hover:border-crimson-500/30'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 font-semibold'
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
    className={`bg-dark-card border border-white/10 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${
      hoverGlow ? 'hover:border-crimson-500/40 hover:shadow-crimson-glow hover:-translate-y-1' : ''
    } ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Badge = ({ children, variant = 'crimson', className = '' }) => {
  const variants = {
    crimson: 'bg-crimson-500/10 text-crimson-500 border border-crimson-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    gray: 'bg-gray-800/60 text-gray-300 border border-gray-700/50',
    blue: 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const StatCard = ({ title, value, prefix = '', suffix = '', trend, icon: Icon, description }) => (
  <Card className="flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{title}</span>
      {Icon && (
        <div className="p-2.5 rounded-xl bg-crimson-500/10 border border-crimson-500/20 text-crimson-500">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
    <div>
      <div className="text-3xl md:text-4xl font-extrabold font-display text-white mb-1">
        <CountUpNumber value={value} prefix={prefix} suffix={suffix} />
      </div>
      {trend && (
        <div className={`text-xs font-medium flex items-center gap-1 ${trend.startsWith('+') ? 'text-emerald-400' : 'text-crimson-500'}`}>
          <span>{trend}</span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
  </Card>
);

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`bg-dark-surface border border-white/10 rounded-2xl w-full ${maxWidth} overflow-hidden shadow-2xl relative`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
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
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-dark-card border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-crimson-500 transition-colors placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-dark-card">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-white/5 uppercase text-xs tracking-wider text-gray-400 border-b border-white/10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-semibold">{col.header}</th>
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
  <div className={`bg-white/5 animate-pulse rounded-xl border border-white/5 ${className}`} />
);
