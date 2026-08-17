import React from "react";
import { Metadata } from "next";
import { getItineraries } from "@/lib/dataService";
import ItineraryCard from "@/components/ui/ItineraryCard";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

export const metadata: Metadata = {
  title: "Sri Lanka Travel Itineraries — LankaExplore",
  description:
    "Curated multi-day Sri Lanka itineraries: 7-day classic wonders, 10-day island odyssey, wildlife safari escapes, and coastal train routes.",
};

export default async function ItinerariesPage() {
  const itineraries: any[] = await getItineraries();

  return (
    <div className="pb-24 space-y-12">
      <PageHeaderBanner
        title="Curated Sri Lanka Travel Itineraries"
        subtitle="Take the guesswork out of planning with handcrafted day-by-day routes linking Sri Lanka's greatest cultural landmarks, scenic highlands, and turquoise beaches."
        category="HANDCRAFTED TRAVEL ROUTES"
        backgroundImage="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "Itineraries" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {itineraries.map((itinerary: any) => (
            <ItineraryCard key={itinerary.slug || itinerary._id} itinerary={itinerary} />
          ))}
        </div>
      </div>
    </div>
  );
}
