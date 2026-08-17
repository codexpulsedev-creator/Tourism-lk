"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, ArrowRight, Compass, ShieldCheck } from "lucide-react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else if (selectedCategory) {
      router.push(`/destinations?category=${encodeURIComponent(selectedCategory)}`);
    } else {
      router.push("/destinations");
    }
  };

  const quickPicks = ["Ella", "Sigiriya", "Galle Fort", "Mirissa", "Yala Safari"];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic Background Imagery */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=85&w=2000&auto=format&fit=crop"
          alt="Sri Lanka Nine Arch Bridge in misty mountain highlands"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Editorial overlay gradient */}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold uppercase tracking-widest shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-secondary animate-spin-slow" />
          <span>The Pearl of the Indian Ocean</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08] drop-shadow-md">
            Discover Sri Lanka
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-secondary drop-shadow font-normal">
            One Island. Endless Experiences.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-sans leading-relaxed pt-2 drop-shadow-sm">
            Explore breathtaking misty highlands, ancient UNESCO kingdoms, rich wildlife sanctuaries, and turquoise surf bays across paradise.
          </p>
        </div>

        {/* Destination Search Box */}
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl border border-white/40">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-4 py-2 w-full flex-1">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder="Where do you want to go? (e.g. Ella, Sigiriya, Yala)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-brandDark placeholder-brandDark/50 font-medium focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-brandBg text-xs font-semibold text-brandDark px-3.5 py-3 rounded-xl sm:rounded-full border border-brandDark/10 focus:outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Mountains">Mountains</option>
                <option value="Heritage">Heritage</option>
                <option value="Beaches">Beaches</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Nature">Nature</option>
              </select>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all shadow-md active:scale-95 flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/90">
          <span className="font-semibold text-white/60">Trending:</span>
          {quickPicks.map((pick) => (
            <Link
              key={pick}
              href={`/search?q=${encodeURIComponent(pick)}`}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-colors"
            >
              {pick}
            </Link>
          ))}
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary hover:bg-secondary-400 text-brandDark text-sm font-bold shadow-lg transition-transform active:scale-95"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm font-bold shadow-lg transition-colors"
          >
            <Compass className="w-4 h-4 text-secondary" />
            <span>Plan Your Journey</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
