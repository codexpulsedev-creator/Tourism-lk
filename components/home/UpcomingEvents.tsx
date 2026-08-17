"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UpcomingEventsProps {
  events: any[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const displayEvents = events.slice(0, 3);

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Full-width Aerial Ocean Background matching Screenshot 4 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2000&auto=format&fit=crop"
          alt="Aerial turquoise ocean waves of Sri Lanka"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left White Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/60 space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
              Island Calendar
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brandDark tracking-tight leading-tight">
              Upcoming Events & Festivals
            </h2>

            <p className="text-sm text-brandDark/70 leading-relaxed font-sans">
              From the thunderous drums and torchbearers of Kandy to international literary gatherings and coastal surf championships.
            </p>

            <div className="pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                <span>SEE ALL EVENTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Floating Event Posters Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayEvents.map((event, idx) => (
              <motion.div
                key={event.slug || event._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="group relative rounded-3xl overflow-hidden shadow-2xl bg-brandDark/40 border border-white/20 flex flex-col justify-between h-[380px]"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 p-4 flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-brandDark shadow-sm">
                    {event.category}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-secondary text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-secondary transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-primary-300" />
                    <span>{event.location}</span>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-secondary group-hover:text-white pt-2 transition-colors"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
