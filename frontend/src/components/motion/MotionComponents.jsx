import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="gpu-accelerated will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({ children, delay = 0, direction = 'up', className = '', trigger }) => {
  const directions = {
    up: { y: 25, x: 0 },
    down: { y: -25, x: 0 },
    left: { x: 25, y: 0 },
    right: { x: -25, y: 0 },
    none: { x: 0, y: 0 }
  };

  const hasTrigger = trigger !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={hasTrigger ? (trigger ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }) : undefined}
      whileInView={!hasTrigger ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`gpu-accelerated ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.06 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      className={`gpu-accelerated ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* Hardware-accelerated rAF CountUpNumber */
export const CountUpNumber = ({ value, prefix = '', suffix = '', duration = 1.2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const numericVal = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;
  const isDecimal = value.toString().includes('.');

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animationFrameId;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = easedProgress * numericVal;

      if (isDecimal) {
        setCount(parseFloat(currentCount.toFixed(1)));
      } else {
        setCount(Math.floor(currentCount));
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(numericVal);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericVal, duration, isDecimal]);

  return (
    <span ref={ref}>
      {prefix}{isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  );
};

export const MagneticButton = ({ children, className = '', onClick, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/* ImageReveal Component for Premium Scroll-Wipe Reveal */
export const ImageReveal = ({ src, alt, className = '', aspectRatio = 'aspect-video' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectRatio} ${className}`}>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full gpu-accelerated"
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

/* AnimationSection Component for Scroll Reveal Section Animations */
export const AnimationSection = ({ children, delay = 0, direction = 'up', className = '', id = '', trigger, ...props }) => {
  const directions = {
    up: { y: 25, x: 0 },
    down: { y: -25, x: 0 },
    left: { x: 25, y: 0 },
    right: { x: -25, y: 0 },
    none: { x: 0, y: 0 }
  };

  const hasTrigger = trigger !== undefined;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={hasTrigger ? (trigger ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }) : undefined}
      whileInView={!hasTrigger ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`gpu-accelerated ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};


