import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
  delay?: number;
};

/** Revelado individual al entrar en viewport (fade + translateY). */
export function Reveal({ children, className, as = 'div', delay = 0 }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Grupo que escalona el revelado de sus hijos <RevealItem>. */
export function RevealGroup({ children, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
