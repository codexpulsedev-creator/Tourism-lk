"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown, Sparkles, Compass } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=85&w=2400&auto=format&fit=crop", // Kandyan fire / culture
    title: "AN ISLAND ESCAPE",
    subtitle: "AWAITS YOU",
    caption: "Experience living traditions, sacred pageantry, and warm Sri Lankan hospitality.",
    accent: "Living Heritage & Culture",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=85&w=2400&auto=format&fit=crop", // Nine Arch Bridge & misty highlands
    title: "MISTY HIGHLANDS",
    subtitle: "& SCENIC TEA TRAILS",
    caption: "Journey aboard the world's most scenic blue train through emerald valleys.",
    accent: "Central Mountain Wonders",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2400&auto=format&fit=crop", // Golden sunset & turquoise sea
    title: "SUN-KISSED COASTS",
    subtitle: "& TURQUOISE WAVES",
    caption: "Discover pristine tropical beaches, world-class surf breaks, and blue whale watching.",
    accent: "Southern & Eastern Coastlines",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=85&w=2400&auto=format&fit=crop", // Leopard & Wildlife
    title: "WILD KINGDOMS",
    subtitle: "& SAFARI ODYSSEYS",
    caption: "Track wild leopards, majestic Asian elephant herds, and rare exotic birdlife.",
    accent: "Yala & Wilpattu Sanctuaries",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { t } = useAuth();

  // Auto rotate hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/destinations");
    }
  };

  const current = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-brandDark">
      {/* Background Slides with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Cinematic Multi-layered Vignette & Dark Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-brandDark/95 via-brandDark/40 to-brandDark/70" />
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        {/* Animated Badge */}
        <motion.div
          key={`badge-${currentSlide}`}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold uppercase tracking-widest shadow-xl mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
          <span>{current.accent}</span>
        </motion.div>

        {/* Main Headline (Matching srilanka.travel typography style) */}
        <div className="space-y-2 mb-8 max-w-4xl">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[1.05] drop-shadow-lg"
          >
            {current.title}
            <span className="block font-serif font-normal italic text-secondary tracking-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-1">
              {current.subtitle}
            </span>
          </motion.h1>

          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-200 font-sans max-w-2xl mx-auto leading-relaxed pt-2 drop-shadow"
          >
            {current.caption}
          </motion.p>
        </div>

        {/* Floating Centered Translucent Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl"
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white/90 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-white/40 transition-all focus-within:ring-4 focus-within:ring-primary/40 focus-within:bg-white"
          >
            <div className="flex items-center gap-3 pl-4 pr-2 flex-1">
              <Search className="w-5 h-5 text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder={t("heroSearchPlaceholder", "Find destinations, experiences, festivals...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-brandDark placeholder-brandDark/50 font-medium focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex-shrink-0 flex items-center gap-2"
            >
              <span>{t("navExplore", "Search")}</span>
            </button>
          </form>

          {/* Quick Filter Tag Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs text-white/90">
            <span className="font-semibold text-white/60">Popular:</span>
            {["Ella", "Sigiriya", "Yala Safari", "Mirissa Surfing", "Galle Fort"].map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2.5 mt-8 sm:mt-10">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === idx
                  ? "w-8 bg-secondary shadow-lg shadow-secondary/50"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#welcome-section"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest">Explore Below</span>
        <ChevronDown className="w-5 h-5 text-secondary" />
      </motion.a>
    </section>
  );
}
