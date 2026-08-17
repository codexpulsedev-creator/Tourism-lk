"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Award, Video, Calendar, Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LiyawelaMotif } from "@/components/ui/TraditionalMotifs";

const whatsNewCards = [
  {
    id: 1,
    title: "Wilpattu National Park Wildlife Streaming",
    tagline: "Live Wildlife & SLTDA 4K Wilderness Cameras",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=85&w=900&auto=format&fit=crop", // Two wild leopards in tree
    href: "/experiences",
    badge: "Live Wildlife",
    icon: <Video className="w-3.5 h-3.5 text-secondary" />,
  },
  {
    id: 2,
    title: "International Endorsements",
    tagline: "Wanderlust Gold Award — #1 Most Desirable Island",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=85&w=900&auto=format&fit=crop", // Sigiriya rock & gold award
    href: "/destinations",
    badge: "Global Accolades",
    icon: <Award className="w-3.5 h-3.5 text-secondary" />,
  },
  {
    id: 3,
    title: "Greatest Shows on Earth",
    tagline: "The Sacred Kandy Esala Perahera Pageant",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=85&w=900&auto=format&fit=crop", // Decorated Tusker & fire dancers
    href: "/events",
    badge: "Cultural Wonder",
    icon: <Calendar className="w-3.5 h-3.5 text-secondary" />,
  },
  {
    id: 4,
    title: "SLTPB Promotional KIT",
    tagline: "Official Media Resources, Travel Maps & Guides",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=900&auto=format&fit=crop", // Sri Lanka turquoise brand paradise
    href: "/plan-your-trip",
    badge: "Brand Assets",
    icon: <Download className="w-3.5 h-3.5 text-secondary" />,
  },
];

export default function WhatsNewSection() {
  const { t } = useAuth();

  return (
    <section className="relative py-24 sm:py-32 bg-white border-t border-brandDark/8 overflow-hidden">
      {/* Subtle Liyawela Motif Watermarks */}
      <div className="absolute top-4 left-4 w-56 h-56 text-primary opacity-[0.035] pointer-events-none select-none z-0">
        <LiyawelaMotif className="w-full h-full" />
      </div>
      <div className="absolute bottom-4 right-4 w-56 h-56 text-primary opacity-[0.035] pointer-events-none select-none z-0 rotate-180">
        <LiyawelaMotif className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading matching Screenshot 2 */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Updates & Announcements</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brandDark tracking-tight">
            What's New
          </h2>
          <p className="text-sm sm:text-base text-brandDark/70 max-w-2xl">
            Stay up to date with global travel awards, cultural celebrations, wildlife live-streams, and official tourism initiatives.
          </p>
        </div>

        {/* 4 Photo Cards Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whatsNewCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link href={card.href} className="block space-y-4">
                {/* Image Box */}
                <div className="relative aspect-[4/4] sm:aspect-[4/4.2] w-full rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border border-brandDark/10 bg-brandDark/10 transition-all duration-500">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-brandDark shadow-md uppercase tracking-wider">
                      {card.icon}
                      <span>{card.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Bold Title Underneath Image */}
                <div className="space-y-1">
                  <h3 className="font-serif font-extrabold text-xl text-brandDark group-hover:text-primary transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-brandDark/65 leading-relaxed font-medium">
                    {card.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
