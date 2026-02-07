
import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
        
        {/* Abstract "L" + Bite shape */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M35 25V75H75"
          stroke="url(#logo-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Bite cutout effect - abstract circle */}
        <circle cx="75" cy="50" r="15" fill="#020617" />
        
        {/* Glow point */}
        <motion.circle
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          cx="35" cy="25" r="4" fill="#fb923c"
        />

        <defs>
          <linearGradient id="logo-grad" x1="35" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const PartnerLogo: React.FC<{ name: string; className?: string }> = ({ name, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default ${className}`}>
      <div className="w-6 h-6 rounded bg-slate-700 flex-shrink-0" />
      <span className="text-xs font-bold uppercase tracking-tighter text-slate-400">{name}</span>
    </div>
  );
};
