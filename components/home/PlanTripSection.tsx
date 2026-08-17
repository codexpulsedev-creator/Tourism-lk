"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PlanTripSection() {
  const { t } = useAuth();

  const dreamHolidayCards = [
    {
      id: 1,
      title: t("seeAndDo", "Things to See and Do"),
      tagline: "Epic Climbs, Surfing & Wildlife",
      image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=85&w=1200&auto=format&fit=crop",
      href: "/experiences",
      isExternal: false,
      badge: "Must-Do Activities",
    },
    {
      id: 2,
      title: t("findAgent", "Find a Travel Agent"),
      tagline: "SLTDA Certified Tour Operators",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=85&w=1200&auto=format&fit=crop",
      href: "/travel-agents",
      isExternal: false,
      badge: "Verified Directory",
    },
    {
      id: 3,
      title: t("applyVisa", "Apply Sri Lankan Visa Online"),
      tagline: "Official Immigration & ETA Portal",
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=85&w=1200&auto=format&fit=crop",
      href: "https://www.immigration.gov.lk/",
      isExternal: true,
      badge: "Official Portal (ETA)",
    },
    {
      id: 4,
      title: t("bookFlight", "Book a Flight"),
      tagline: "Direct International Connections",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=85&w=1200&auto=format&fit=crop",
      href: "/flight-booking",
      isExternal: false,
      badge: "Air Travel Info",
    },
    {
      id: 5,
      title: t("findStay", "Find your Accommodation"),
      tagline: "Tea Bungalows & Coastal Resorts",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=1200&auto=format&fit=crop",
      href: "/accommodation",
      isExternal: false,
      badge: "Boutique & Luxury",
    },
    {
      id: 6,
      title: t("campingGlamping", "Camping Sites & Glamping"),
      tagline: "Horton Plains & Knuckles Mountains",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=85&w=1200&auto=format&fit=crop",
      href: "/camping-sites",
      isExternal: false,
      badge: "Nature Camping",
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-[#F5F8F6] border-y border-brandDark/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header matching Screenshot 5 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-brandDark/10">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Trip Planning Essentials</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-brandDark tracking-tight">
              {t("planHolidayTitle", "Plan Your Dream Holiday")}
            </h2>
            <p className="text-base sm:text-lg text-brandDark/75 leading-relaxed font-sans pt-1">
              {t("planHolidayDesc", "Each day on this island promises new experiences, discoveries, and life-long memories.")}
            </p>
          </div>

          <div>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>{t("viewAll", "VIEW ALL")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Square Photo Cards with Large Clear Bold Titles underneath */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {dreamHolidayCards.map((card, idx) => {
            const Content = (
              <div className="block space-y-4">
                {/* Large Square Photo Box */}
                <div className="relative aspect-square w-full rounded-[2.2rem] overflow-hidden shadow-card hover:shadow-2xl border border-brandDark/10 bg-brandDark/10 transition-all duration-500">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-112 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 group-hover:opacity-30 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-brandDark shadow-md uppercase tracking-wider flex items-center gap-1.5">
                      <span>{card.badge}</span>
                      {card.isExternal && <ExternalLink className="w-3 h-3 text-primary" />}
                    </span>
                  </div>

                  {/* Bottom Hover Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider drop-shadow">
                      {card.tagline}
                    </span>
                  </div>
                </div>

                {/* Big Readable Bold Title Underneath */}
                <div className="text-center space-y-1 pt-1">
                  <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-brandDark group-hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                    <span>{card.title}</span>
                    {card.isExternal && <ExternalLink className="w-4 h-4 text-primary opacity-60" />}
                  </h3>
                  <p className="text-xs sm:text-sm text-brandDark/60 font-medium">
                    {card.tagline}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group"
              >
                {card.isExternal ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                    {Content}
                  </a>
                ) : (
                  <Link href={card.href} className="block">
                    {Content}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
