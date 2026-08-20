"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/ui/DestinationCard";
import { motion } from "framer-motion";
import { TraditionalLotusRosette } from "@/components/ui/TraditionalMotifs";

interface PopularDestinationsProps {
  destinations: any[];
}

export default function PopularDestinations({ destinations }: PopularDestinationsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Heritage", "Beaches", "Mountains", "Wildlife", "Nature", "Cities"];

  // De-duplicate destinations by slug or name
  const uniqueDests = Array.from(
    new Map(destinations.map((d) => [d.slug || d.name, d])).values()
  );

  const filtered = activeCategory === "All"
    ? uniqueDests
    : uniqueDests.filter((d) => d.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 overflow-hidden">
      {/* Traditional Sri Lankan Lotus Medallion Watermark */}
      <div className="absolute -top-10 -right-10 w-72 h-72 text-primary opacity-[0.035] pointer-events-none select-none z-0">
        <TraditionalLotusRosette className="w-full h-full" />
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading
          badge="Iconic Locations"
          title="Popular Destinations"
          subtitle="Unveil the top-rated mountain sanctuaries, historic colonial fortresses, and tropical coastal escapes of Sri Lanka."
          viewAllHref="/destinations"
          viewAllText="View All Destinations"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white border border-brandDark/10 text-brandDark/70 hover:bg-brandBg hover:text-brandDark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.slice(0, 6).map((dest, idx) => (
          <motion.div
            key={dest.slug || dest._id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <DestinationCard destination={dest} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
