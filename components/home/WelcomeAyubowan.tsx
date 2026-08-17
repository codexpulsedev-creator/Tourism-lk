"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plane, Award, Compass } from "lucide-react";
import { LiyawelaMotif, SandakadaPahanaArc } from "@/components/ui/TraditionalMotifs";
import { useAuth } from "@/context/AuthContext";

export default function WelcomeAyubowan() {
  const { t } = useAuth();

  const cards = [
    {
      id: "visa",
      badge: "Official Travel Entry",
      title: t("visaTitle", "TOURIST VISA SRI LANKA"),
      subtitle: "Department of Immigration & Emigration",
      description: t("visaDesc", "Quick online Electronic Travel Authorization (ETA). Access the official government portal for visa applications, ETA requirements, and entry rules."),
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1000&auto=format&fit=crop",
      link: "https://www.immigration.gov.lk/",
      isExternal: true,
      linkText: t("visaBtn", "Apply Official ETA Online"),
      icon: <Plane className="w-5 h-5 text-secondary" />,
    },
    {
      id: "award",
      badge: "Global Accolade",
      title: t("awardsTitle", "50 BEST PLACES TO TRAVEL IN THE WORLD — 2026"),
      subtitle: "Global Tourism Ranking",
      description: t("awardsDesc", "Recognised as one of the world's premier destinations offering UNESCO ancient ruins, world-class surf breaks, and wild leopard sanctuaries."),
      image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1000&auto=format&fit=crop",
      link: "/destinations",
      isExternal: false,
      linkText: t("awardsBtn", "Explore Top Hotspots"),
      icon: <Award className="w-5 h-5 text-secondary" />,
    },
    {
      id: "golden-visa",
      badge: "Long-Stay & Residency",
      title: t("goldenVisaTitle", "GOLDEN PARADISE VISA"),
      subtitle: "Residence & Digital Nomad Hub",
      description: t("goldenVisaDesc", "Special category of Residence Visa for investors and remote digital nomads seeking a tropical base in coastal paradise."),
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
      link: "/plan-your-trip",
      isExternal: false,
      linkText: t("goldenVisaBtn", "Learn About Residency"),
      icon: <Compass className="w-5 h-5 text-secondary" />,
    },
  ];

  return (
    <section id="welcome-section" className="relative py-24 sm:py-32 bg-white overflow-hidden border-b border-brandDark/5">
      {/* Traditional Sri Lankan Background Watermarks */}
      <div className="absolute top-4 left-4 w-48 h-48 sm:w-64 sm:h-64 text-primary opacity-[0.04] pointer-events-none select-none z-0">
        <LiyawelaMotif className="w-full h-full" />
      </div>
      <div className="absolute bottom-4 right-4 w-48 h-48 sm:w-64 sm:h-64 text-primary opacity-[0.04] pointer-events-none select-none z-0 rotate-180">
        <LiyawelaMotif className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 text-primary opacity-[0.035] pointer-events-none select-none z-0">
        <SandakadaPahanaArc className="w-full h-full" />
      </div>

      {/* Elegant Calligraphic Watermark Backdrop */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.05] text-center w-full">
        <span className="font-serif italic font-extrabold text-[120px] sm:text-[180px] md:text-[240px] text-brandDark tracking-tighter block leading-none">
          Ayubowan
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching srilanka.travel */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-primary block"
          >
            {t("welcomeSubtitle", "Traditional Greeting & Hospitality")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-brandDark tracking-tight"
          >
            {t("welcomeTitle", "Welcome to Sri Lanka")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-1 text-sm sm:text-base md:text-lg text-brandDark/70 leading-relaxed font-sans pt-2"
          >
            <p>{t("welcomeDesc", "See what's waiting for you on your next island getaway.")}</p>
          </motion.div>
        </div>

        {/* 3 Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group rounded-3xl bg-brandBg border border-brandDark/8 overflow-hidden shadow-subtle hover:shadow-cardHover transition-all flex flex-col justify-between"
            >
              {/* Card Image with Hover Zoom */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-brandDark/10">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark/80 via-brandDark/20 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-brandDark shadow-sm">
                  {card.icon}
                  <span>{card.badge}</span>
                </div>

                {/* Bottom Overlay Title in Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-semibold text-secondary uppercase tracking-widest block">
                    {card.subtitle}
                  </span>
                  <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase mt-0.5 leading-snug drop-shadow-md">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Card Body & CTA */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-brandDark/70 leading-relaxed">
                  {card.description}
                </p>

                {card.isExternal ? (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-brandDark/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={card.link}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-brandDark/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary group-hover:text-primary-dark transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
