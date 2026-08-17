"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Waves, Landmark, Heart, Compass, Utensils, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const experienceThemes = [
  {
    id: "wild",
    title: "WILD",
    tagline: "Untamed Sanctuaries",
    description: "Close encounters with wild leopards, massive elephant gatherings & blue whales in deep waters.",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=85&w=1600&auto=format&fit=crop", // Elephant Gathering
    badgeColor: "bg-emerald-600",
    glowColor: "group-hover:shadow-emerald-600/30",
    icon: <Compass className="w-5 h-5 text-white" />,
    href: "/experiences?category=Wildlife",
    cols: "md:col-span-2 md:row-span-2 min-h-[420px] md:min-h-[560px]",
    badgeText: "Yala & Minneriya",
  },
  {
    id: "thrills",
    title: "THRILLS",
    tagline: "Adrenaline Rush",
    description: "White water rapids in Kitulgala & world-renowned point breaks in Arugam Bay.",
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=85&w=1200&auto=format&fit=crop", // White water rafting
    badgeColor: "bg-pink-600",
    glowColor: "group-hover:shadow-pink-600/30",
    icon: <Waves className="w-5 h-5 text-white" />,
    href: "/experiences?category=Surfing",
    cols: "md:col-span-1 md:row-span-1 min-h-[280px]",
    badgeText: "Surf & Rafting",
  },
  {
    id: "festive",
    title: "FESTIVE",
    tagline: "Sacred Fire & Drums",
    description: "Electrifying Kandyan dancers, fire breathers & grand Esala Perahera processions.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=85&w=1200&auto=format&fit=crop", // Fire pageantry
    badgeColor: "bg-amber-600",
    glowColor: "group-hover:shadow-amber-600/30",
    icon: <Flame className="w-5 h-5 text-white" />,
    href: "/events",
    cols: "md:col-span-1 md:row-span-1 min-h-[280px]",
    badgeText: "Kandy Esala Perahera",
  },
  {
    id: "scenic",
    title: "SCENIC",
    tagline: "Living Postcards",
    description: "Centuries-old stilt fishermen perched at golden sunset & misty train rides across Nine Arch Bridge.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=85&w=1200&auto=format&fit=crop", // Stilt fishermen
    badgeColor: "bg-blue-600",
    glowColor: "group-hover:shadow-blue-600/30",
    icon: <Compass className="w-5 h-5 text-white" />,
    href: "/destinations?category=Nature",
    cols: "md:col-span-1 md:row-span-2 min-h-[420px] md:min-h-[560px]",
    badgeText: "Ella & Mirissa",
  },
  {
    id: "bliss",
    title: "BLISS",
    tagline: "Ancient Wellness",
    description: "5,000-year-old herbal Ayurveda, warm oil Shirodhara & tranquil forest meditation.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1200&auto=format&fit=crop", // Ayurvedic wellness
    badgeColor: "bg-teal-600",
    glowColor: "group-hover:shadow-teal-600/30",
    icon: <Heart className="w-5 h-5 text-white" />,
    href: "/experiences?category=Wellness",
    cols: "md:col-span-1 md:row-span-2 min-h-[420px] md:min-h-[560px]",
    badgeText: "Ayurveda Retreats",
  },
  {
    id: "heritage",
    title: "HERITAGE",
    tagline: "Ancient Wonder",
    description: "Towering 5th-century rock palaces, colossal carved stone Buddhas & UNESCO sacred citadels.",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=85&w=1200&auto=format&fit=crop", // Stone Buddha / Polonnaruwa
    badgeColor: "bg-orange-600",
    glowColor: "group-hover:shadow-orange-600/30",
    icon: <Landmark className="w-5 h-5 text-white" />,
    href: "/destinations?category=Heritage",
    cols: "md:col-span-1 md:row-span-1 min-h-[280px]",
    badgeText: "Sigiriya & Polonnaruwa",
  },
  {
    id: "flavours",
    title: "FLAVOURS",
    tagline: "Aromatic Spice Trails",
    description: "World-famous Ceylon cinnamon, cardamom estates & vibrant coastal seafood curries.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=85&w=1200&auto=format&fit=crop", // Ceylon spices & herbs
    badgeColor: "bg-emerald-700",
    glowColor: "group-hover:shadow-emerald-700/30",
    icon: <Utensils className="w-5 h-5 text-white" />,
    href: "/experiences?category=Culinary",
    cols: "md:col-span-1 md:row-span-1 min-h-[280px]",
    badgeText: "Spice & Tea Gardens",
  },
];

export default function ExploreCategories() {
  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      <SectionHeading
        badge="Sensory Wonders"
        title="Experience the Island"
        subtitle="Uncover extraordinary encounters—from wild elephant gatherings and roaring rapids to ancient sacred citadels and calming Ayurvedic bliss."
        viewAllHref="/experiences"
        viewAllText="View All Experiences"
      />

      {/* Ultra-Large High-Impact Mosaic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        {experienceThemes.map((theme, idx) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
            className={`group relative rounded-[2.2rem] overflow-hidden shadow-card hover:shadow-2xl ${theme.glowColor} transition-all duration-700 ${theme.cols} border border-brandDark/10`}
          >
            <Link href={theme.href} className="block w-full h-full relative">
              {/* Ultra-Crisp HD Photography with Slow Zoom */}
              <Image
                src={theme.image}
                alt={theme.title}
                fill
                priority={idx < 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-115 transition-transform duration-1000 ease-out"
              />

              {/* Multi-layered Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brandDark/95 via-brandDark/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

              {/* Top Floating Location Tag */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide shadow-md">
                  {theme.badgeText}
                </span>
              </div>

              {/* Top Right Arrow Trigger */}
              <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-secondary group-hover:text-brandDark group-hover:scale-110 transition-all duration-300 transform group-hover:rotate-45 shadow-lg">
                <ArrowUpRight className="w-5 h-5" />
              </div>

              {/* Bottom Large Title & Badge Info */}
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full ${theme.badgeColor} flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-500`}
                  >
                    {theme.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-secondary block drop-shadow">
                      {theme.tagline}
                    </span>
                    <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-wider uppercase drop-shadow-lg leading-none">
                      {theme.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed pt-1 opacity-90 drop-shadow">
                  {theme.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
