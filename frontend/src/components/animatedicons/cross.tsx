import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface AnimatedCrossProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const AnimatedCross: React.FC<AnimatedCrossProps> = ({ 
  size = 20, 
  className,
  ...props 
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current origin-center", className)}
      // Premium hover & click spring animations
      whileHover={{ scale: 1.15, rotate: 90 }}
      whileTap={{ scale: 0.85, rotate: -25 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...(props as any)}
    >
      {/* Invisible bounding box so the whole SVG area triggers the hover, not just the paths */}
      <rect width="24" height="24" fill="transparent" />
      
      {/* Animated Path 1 */}
      <motion.path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Animated Path 2 */}
      <motion.path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
      />
    </motion.svg>
  );
};

export default AnimatedCross;
