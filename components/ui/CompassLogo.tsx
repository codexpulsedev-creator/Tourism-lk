import React from "react";

interface CompassLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  isTransparent?: boolean;
}

export default function CompassLogo({
  size = "md",
  className = "",
  isTransparent = false,
}: CompassLogoProps) {
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  }[size];

  return (
    <div
      className={`relative rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45 shadow-sm ${dimensions} ${
        isTransparent
          ? "bg-white/20 text-white backdrop-blur-md border border-white/30"
          : "bg-primary text-white border border-primary/20 shadow-subtle"
      } ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%] transition-transform duration-500 group-hover:scale-110"
      >
        {/* Outer Ring */}
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="2 3"
          className="opacity-60"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-80"
        />

        {/* 4 Cardinal Tick Marks */}
        <line x1="24" y1="3" x2="24" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="41" x2="24" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="24" x2="7" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="41" y1="24" x2="45" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* North Pointer (Amber/Gold Accent) */}
        <polygon
          points="24,6 27.5,24 24,21 20.5,24"
          fill="#F59E0B"
          className="drop-shadow-sm"
        />

        {/* South Pointer (White / Slate) */}
        <polygon
          points="24,42 27.5,24 24,27 20.5,24"
          fill="currentColor"
          className="opacity-80"
        />

        {/* East & West secondary points */}
        <polygon
          points="42,24 24,27.5 27,24 24,20.5"
          fill="currentColor"
          className="opacity-50"
        />
        <polygon
          points="6,24 24,20.5 21,24 24,27.5"
          fill="currentColor"
          className="opacity-50"
        />

        {/* Center Pivot Jewel */}
        <circle cx="24" cy="24" r="3.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="1.5" fill="#12312F" />
      </svg>
    </div>
  );
}
