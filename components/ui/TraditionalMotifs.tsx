import React from "react";

// Traditional Sri Lankan Liyawela (Floral Vine Scroll)
export function LiyawelaMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
    >
      <path
        d="M20,180 C50,150 70,120 70,80 C70,40 100,20 130,20 C160,20 180,50 180,80 C180,120 150,150 110,150 C80,150 60,130 60,100 C60,70 80,60 100,60 C120,60 130,80 130,95 C130,110 115,120 105,120"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Traditional Leaf & Sprout curls */}
      <path
        d="M70,80 C85,65 105,75 100,95 C95,115 75,105 70,80 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M130,20 C145,5 170,15 165,35 C160,55 135,45 130,20 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M180,80 C195,95 185,120 165,115 C145,110 155,85 180,80 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M110,150 C95,170 120,190 140,175 C160,160 140,135 110,150 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <circle cx="100" cy="95" r="5" fill="currentColor" />
      <circle cx="130" cy="20" r="4" fill="currentColor" />
      <circle cx="180" cy="80" r="4" fill="currentColor" />
    </svg>
  );
}

// Traditional Sandakada Pahana (Moonstone Lotus Arc)
export function SandakadaPahanaArc({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Concentric Half Circles */}
      <path d="M10,150 A140,140 0 0,1 290,150" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 4" />
      <path d="M30,150 A120,120 0 0,1 270,150" stroke="currentColor" strokeWidth="2" />
      <path d="M50,150 A100,100 0 0,1 250,150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
      
      {/* Traditional Lotus Petals (පලාපෙති මෝස්තරය) */}
      {[...Array(13)].map((_, i) => {
        const angle = (Math.PI / 12) * i;
        const x1 = 150 - Math.cos(angle) * 100;
        const y1 = 150 - Math.sin(angle) * 100;
        const x2 = 150 - Math.cos(angle) * 120;
        const y2 = 150 - Math.sin(angle) * 120;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}

      {/* Inner Petal Arch */}
      <path d="M70,150 A80,80 0 0,1 230,150" stroke="currentColor" strokeWidth="2" />
      <path d="M90,150 A60,60 0 0,1 210,150" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="30" fill="currentColor" opacity="0.15" />
      <circle cx="150" cy="150" r="12" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Traditional Sri Lankan Lotus Medallion / Rosette (කතුරු මල)
export function TraditionalLotusRosette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
    >
      <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="25" fill="currentColor" opacity="0.2" />

      {/* 8 Radial Lotus Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <path
            d="M100,30 C90,50 95,75 100,75 C105,75 110,50 100,30 Z"
            fill="currentColor"
            opacity="0.35"
          />
          <circle cx="100" cy="22" r="3.5" fill="currentColor" />
        </g>
      ))}

      {/* Center Jewel */}
      <circle cx="100" cy="100" r="8" fill="currentColor" />
    </svg>
  );
}
