import React, { forwardRef } from 'react';

interface ShieldProps {
  className?: string;
}

// Forwarding refs to allow parent to animate specific parts
export const ShieldSVG = forwardRef<SVGSVGElement, ShieldProps>(({ className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      className={`w-full h-full overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="metal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 18 -7
          " result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
        <linearGradient id="metal-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="star-gradient">
           <stop offset="0%" stopColor="#E8EAED" />
           <stop offset="100%" stopColor="#9CA3AF" />
        </radialGradient>
      </defs>

      {/* Group Hierarchy for Deconstruction */}
      
      {/* Outer Ring (Red) */}
      <g className="shield-layer layer-1" style={{ transformOrigin: 'center' }}>
        <circle cx="300" cy="300" r="280" fill="#B91C1C" />
        <circle cx="300" cy="300" r="280" fill="url(#metal-sheen)" />
        {/* Detail Lines */}
        <circle cx="300" cy="300" r="278" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <circle cx="300" cy="300" r="232" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      </g>

      {/* Middle Ring (White/Silver) */}
      <g className="shield-layer layer-2" style={{ transformOrigin: 'center' }}>
        <circle cx="300" cy="300" r="230" fill="#E8EAED" />
        <circle cx="300" cy="300" r="230" fill="url(#metal-sheen)" />
        {/* Tech markings that appear on deconstruction */}
        <path d="M 300 70 L 300 90" stroke="#050B14" strokeWidth="2" opacity="0" className="tech-mark" />
        <path d="M 300 510 L 300 530" stroke="#050B14" strokeWidth="2" opacity="0" className="tech-mark" />
        <path d="M 70 300 L 90 300" stroke="#050B14" strokeWidth="2" opacity="0" className="tech-mark" />
        <path d="M 510 300 L 530 300" stroke="#050B14" strokeWidth="2" opacity="0" className="tech-mark" />
      </g>

      {/* Inner Ring (Red) */}
      <g className="shield-layer layer-3" style={{ transformOrigin: 'center' }}>
        <circle cx="300" cy="300" r="180" fill="#B91C1C" />
        <circle cx="300" cy="300" r="180" fill="url(#metal-sheen)" />
      </g>

      {/* Center (Blue) */}
      <g className="shield-layer layer-4" style={{ transformOrigin: 'center' }}>
        <circle cx="300" cy="300" r="130" fill="#1D4ED8" />
        <circle cx="300" cy="300" r="130" fill="url(#metal-sheen)" />
      </g>

      {/* The Star */}
      <g className="shield-layer layer-5" style={{ transformOrigin: 'center' }}>
        <path
          d="M 300 185 L 333 280 H 425 L 350 335 L 378 425 L 300 370 L 222 425 L 250 335 L 175 280 H 267 Z"
          fill="url(#star-gradient)"
          filter="url(#metal-glow)"
        />
        {/* Wireframe overlay (hidden initially) */}
        <path
          d="M 300 185 L 333 280 H 425 L 350 335 L 378 425 L 300 370 L 222 425 L 250 335 L 175 280 H 267 Z"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1"
          opacity="0"
          className="star-wireframe"
        />
      </g>
      
      {/* Schematics / Measurements (Hidden initially) */}
      <g className="schematics opacity-0" style={{ transformOrigin: 'center' }}>
         <circle cx="300" cy="300" r="280" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
         <circle cx="300" cy="300" r="130" stroke="#06B6D4" strokeWidth="1" strokeDasharray="2 2" fill="none" />
         <line x1="300" y1="20" x2="300" y2="580" stroke="#06B6D4" strokeWidth="0.5" />
         <line x1="20" y1="300" x2="580" y2="300" stroke="#06B6D4" strokeWidth="0.5" />
         <text x="310" y="40" fill="#06B6D4" fontSize="10" fontFamily="monospace">Ø 30.00 IN</text>
         <text x="310" y="570" fill="#06B6D4" fontSize="10" fontFamily="monospace">VIBRANIUM ALLOY</text>
      </g>
    </svg>
  );
});

ShieldSVG.displayName = "ShieldSVG";
