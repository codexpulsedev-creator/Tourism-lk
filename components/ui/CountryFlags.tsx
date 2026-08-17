import React from "react";

export function CountryFlag({ code, className = "w-5 h-3.5" }: { code: string; className?: string }) {
  switch (code.toLowerCase()) {
    case "en":
    case "gb":
      // United Kingdom Union Jack
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
          <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      );
    case "si":
    case "lk":
      // Sri Lanka Lion Flag
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#FFBE29" />
          <rect x="2" y="2" width="56" height="26" fill="#FFBE29" />
          <rect x="5" y="4" width="7" height="22" fill="#00534E" />
          <rect x="13" y="4" width="7" height="22" fill="#EB7400" />
          <rect x="22" y="4" width="34" height="22" fill="#8D153A" />
          {/* Gold Lion Silhouette */}
          <circle cx="39" cy="15" r="7" fill="#FFBE29" />
          <path d="M36,11 L43,15 L36,19 Z" fill="#8D153A" />
        </svg>
      );
    case "zh":
    case "cn":
      // China
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#DE2910" />
          <polygon points="10,5 12,11 7,7 13,7 8,11" fill="#FFDE00" />
          <polygon points="18,3 19,5 17,4 19,4 17,5" fill="#FFDE00" />
          <polygon points="21,6 22,8 20,7 22,7 20,8" fill="#FFDE00" />
          <polygon points="21,11 22,13 20,12 22,12 20,13" fill="#FFDE00" />
          <polygon points="18,14 19,16 17,15 19,15 17,16" fill="#FFDE00" />
        </svg>
      );
    case "hi":
    case "in":
      // India Tiranga
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="10" fill="#FF9933" />
          <rect y="10" width="60" height="10" fill="#FFFFFF" />
          <rect y="20" width="60" height="10" fill="#138808" />
          <circle cx="30" cy="15" r="4" fill="none" stroke="#000080" strokeWidth="1" />
          <circle cx="30" cy="15" r="1" fill="#000080" />
        </svg>
      );
    case "ta":
      // Tamil / Sri Lanka-India emblem
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="10" fill="#FF9933" />
          <rect y="10" width="60" height="10" fill="#FFFFFF" />
          <rect y="20" width="60" height="10" fill="#8D153A" />
          <circle cx="30" cy="15" r="3.5" fill="#00534E" />
        </svg>
      );
    case "de":
      // Germany
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="10" fill="#000000" />
          <rect y="10" width="60" height="10" fill="#DD0000" />
          <rect y="20" width="60" height="10" fill="#FFCE00" />
        </svg>
      );
    case "fr":
      // France
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="20" height="30" fill="#002395" />
          <rect x="20" width="20" height="30" fill="#FFFFFF" />
          <rect x="40" width="20" height="30" fill="#ED2939" />
        </svg>
      );
    case "ru":
      // Russia
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="10" fill="#FFFFFF" />
          <rect y="10" width="60" height="10" fill="#0039A6" />
          <rect y="20" width="60" height="10" fill="#D52B1E" />
        </svg>
      );
    case "ar":
    case "sa":
      // Saudi Arabia
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#006C35" />
          <path d="M15,16 L45,16 M20,19 L40,19" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="30" y="13" fill="#FFFFFF" fontSize="6" textAnchor="middle" fontWeight="bold">العربية</text>
        </svg>
      );
    case "ja":
    case "jp":
      // Japan
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#FFFFFF" />
          <circle cx="30" cy="15" r="9" fill="#BC002D" />
        </svg>
      );
    case "it":
      // Italy
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="20" height="30" fill="#009246" />
          <rect x="20" width="20" height="30" fill="#FFFFFF" />
          <rect x="40" width="20" height="30" fill="#CE2B37" />
        </svg>
      );
    case "nl":
      // Netherlands
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="10" fill="#AE1C28" />
          <rect y="10" width="60" height="10" fill="#FFFFFF" />
          <rect y="20" width="60" height="10" fill="#21468B" />
        </svg>
      );
    case "pl":
      // Poland
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="15" fill="#FFFFFF" />
          <rect y="15" width="60" height="15" fill="#DC143C" />
        </svg>
      );
    case "es":
      // Spain
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="7.5" fill="#AA151B" />
          <rect y="7.5" width="60" height="15" fill="#F1BF00" />
          <rect y="22.5" width="60" height="7.5" fill="#AA151B" />
          <circle cx="18" cy="15" r="3.5" fill="#AA151B" />
        </svg>
      );
    case "ko":
    case "kr":
      // South Korea
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#FFFFFF" />
          <circle cx="30" cy="15" r="7" fill="#CD2E3A" />
          <path d="M30,8 A7,7 0 0,0 30,22 A3.5,3.5 0 0,0 30,15 A3.5,3.5 0 0,1 30,8 Z" fill="#0047A0" />
        </svg>
      );
    case "el":
    case "gr":
      // Greece
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#0D5EAF" />
          <rect y="3.33" width="60" height="3.33" fill="#FFFFFF" />
          <rect y="10" width="60" height="3.33" fill="#FFFFFF" />
          <rect y="16.66" width="60" height="3.33" fill="#FFFFFF" />
          <rect y="23.33" width="60" height="3.33" fill="#FFFFFF" />
          <rect width="16.66" height="16.66" fill="#0D5EAF" />
          <path d="M8.33,0 v16.66 M0,8.33 h16.66" stroke="#FFFFFF" strokeWidth="3.33" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}>
          <rect width="60" height="30" fill="#0C4A47" />
          <circle cx="30" cy="15" r="6" fill="#D4AF37" />
        </svg>
      );
  }
}
