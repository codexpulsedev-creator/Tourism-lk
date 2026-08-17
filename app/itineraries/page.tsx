import React from "react";
import { Metadata } from "next";
import { getItineraries } from "@/lib/dataService";
import ItineraryCard from "@/components/ui/ItineraryCard";

export const metadata: Metadata = {
  title: "Sri Lanka Travel Itineraries — LankaExplore",
  description:
    "Curated multi-day Sri Lanka itineraries: 7-day classic wonders, 10-day island odyssey, wildlife safari escapes, and coastal train routes.",
};

export default async function ItinerariesPage() {
  const itineraries: any[] = await getItineraries();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Curated Routes
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Sri Lanka Travel Itineraries
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Take the guesswork out of planning with our carefully crafted day-by-day itineraries linking Sri Lanka's greatest cultural landmarks, highland tea trails, and turquoise beaches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {itineraries.map((itinerary: any) => (
          <ItineraryCard key={itinerary.slug || itinerary._id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
}
