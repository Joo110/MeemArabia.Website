import { motion, useReducedMotion, type Variants, type Transition } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealVariant =
  | 'fade'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'blur'
  | 'blurUp'
  | 'zoom'
  | 'spring';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
  variant?: RevealVariant;
  amount?: number;
  duration?: number;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function buildVariants(variant: RevealVariant, y: number, x: number): Variants {
  switch (variant) {
    case 'fade':
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
    case 'slideUp':
      return { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } };
    case 'slideDown':
      return { hidden: { opacity: 0, y: -y }, show: { opacity: 1, y: 0 } };
    case 'slideLeft':
      return { hidden: { opacity: 0, x: x || 32 }, show: { opacity: 1, x: 0 } };
    case 'slideRight':
      return { hidden: { opacity: 0, x: x ? -x : -32 }, show: { opacity: 1, x: 0 } };
    case 'scale':
      return { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } };
    case 'zoom':
      return { hidden: { opacity: 0, scale: 1.06 }, show: { opacity: 1, scale: 1 } };
    case 'blur':
      return { hidden: { opacity: 0, filter: 'blur(8px)' }, show: { opacity: 1, filter: 'blur(0px)' } };
    case 'blurUp':
      return {
        hidden: { opacity: 0, y, filter: 'blur(10px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
    case 'spring':
      return { hidden: { opacity: 0, y, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1 } };
    default:
      return { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } };
  }
}

function buildTransition(variant: RevealVariant, delay: number, duration: number): Transition {
  if (variant === 'spring') {
    return { delay, type: 'spring', stiffness: 180, damping: 18, mass: 0.9 };
  }
  return { duration, delay, ease: easeOut };
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
  once = true,
  variant = 'slideUp',
  amount = 0.25,
  duration = 0.6,
}: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.35 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={buildVariants(variant, y, x)}
      transition={buildTransition(variant, delay, duration)}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : delayChildren,
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const staggerItemBlur: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: easeOut } },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 240, damping: 16 } },
};

export const staggerItemFadeX: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
};

/** Magnetic-style button wrapper: very subtle pointer-follow on hover (desktop only). */
export function magneticProps(strength = 8) {
  return {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translate(0px, 0px)';
    },
  };
}