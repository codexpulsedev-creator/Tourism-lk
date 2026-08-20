"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sparkles, ArrowRight, Compass, Navigation } from "lucide-react";
import RatingStars from "./RatingStars";

interface DestinationMarker {
  name: string;
  slug: string;
  category: string;
  province: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  heroImage: string;
  rating: number;
}

interface InteractiveMapProps {
  destinations: DestinationMarker[];
}

export default function InteractiveMap({ destinations }: InteractiveMapProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    destinations[0]?.slug || "sigiriya"
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Heritage", "Mountains", "Wildlife", "Beaches", "Cities", "Nature"];

  const filteredDestinations =
    activeCategory === "All"
      ? destinations
      : destinations.filter((d) => d.category.toLowerCase() === activeCategory.toLowerCase());

  const selectedDestination =
    destinations.find((d) => d.slug === selectedSlug) || destinations[0];

  // Convert geographic coordinates (Sri Lanka roughly Lat 5.9 to 9.8 N, Lon 79.6 to 81.9 E) to % map positions
  const getMapCoordinates = (lat: number, lon: number) => {
    const minLat = 5.7;
    const maxLat = 9.9;
    const minLon = 79.5;
    const maxLon = 82.0;

    const y = ((maxLat - lat) / (maxLat - minLat)) * 82 + 10; // % from top
    const x = ((lon - minLon) / (maxLon - minLon)) * 74 + 13; // % from left
    return { top: `${y}%`, left: `${x}%` };
  };

  return (
    <div className="rounded-3xl bg-brandDark text-white p-6 sm:p-8 lg:p-10 shadow-card border border-white/10 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs uppercase tracking-widest font-semibold mb-2">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Interactive Geographic Atlas</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Explore Sri Lanka by Region
          </h3>
          <p className="text-sm text-gray-300 mt-1 max-w-lg">
            Select points on the island map to discover top regional attractions and plan your travel route.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-secondary text-brandDark shadow-sm font-bold"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center relative z-10">
        {/* Left / Island Map Visualization */}
        <div className="lg:col-span-7 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[420px] aspect-[3/4] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm p-4 flex items-center justify-center">
            {/* Stylized Island Silhouette */}
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full drop-shadow-[0_10px_25px_rgba(15,118,110,0.3)] opacity-90 transition-all"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 140 25 C 160 30, 185 55, 195 85 C 205 110, 220 140, 225 175 C 235 220, 240 270, 210 320 C 180 370, 130 380, 95 365 C 65 345, 60 305, 65 260 C 70 215, 80 180, 85 140 C 90 100, 110 50, 140 25 Z"
                fill="url(#islandGradient)"
                stroke="#2DD4BF"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              {/* Jaffna Peninsula hook */}
              <path
                d="M 135 25 C 130 15, 145 8, 160 12 C 168 15, 155 24, 145 28 Z"
                fill="#0F766E"
                stroke="#2DD4BF"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#134E4A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#12312F" stopOpacity="0.95" />
                </linearGradient>
              </defs>
            </svg>

            {/* Destination Pins on Map */}
            {filteredDestinations.map((dest) => {
              const pos = getMapCoordinates(dest.latitude, dest.longitude);
              const isSelected = selectedSlug === dest.slug;

              return (
                <div
                  key={dest.slug}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => setSelectedSlug(dest.slug)}
                    aria-label={`Select ${dest.name}`}
                    className={`relative p-2 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "bg-secondary text-brandDark scale-125 ring-4 ring-secondary/40 shadow-lg z-30"
                        : "bg-primary text-white hover:scale-110 hover:bg-secondary hover:text-brandDark shadow-md"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {isSelected && (
                      <span className="absolute -inset-1 rounded-full bg-secondary animate-ping opacity-30 pointer-events-none" />
                    )}
                  </button>

                  {/* Pin label tooltip */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap pointer-events-none transition-opacity duration-200 ${
                      isSelected
                        ? "bg-white text-brandDark shadow-md opacity-100 font-serif"
                        : "bg-brandDark/90 text-white/90 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {dest.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right / Selected Destination Interactive Panel */}
        <div className="lg:col-span-5">
          {selectedDestination ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-5 animate-in fade-in duration-300">
              <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-md">
                <Image
                  src={selectedDestination.heroImage}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-secondary text-brandDark">
                    {selectedDestination.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold">{selectedDestination.province} Province</span>
                  <RatingStars rating={selectedDestination.rating} size="sm" showValue={true} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-white">
                  {selectedDestination.name}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedDestination.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-gray-400">
                  <span>GPS: {selectedDestination.latitude.toFixed(2)}°N, {selectedDestination.longitude.toFixed(2)}°E</span>
                </div>

                <Link
                  href={`/destinations/${selectedDestination.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary-400 text-brandDark text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <span>Explore {selectedDestination.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-gray-400">
              <Navigation className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Click on any marker on the map to inspect the destination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
