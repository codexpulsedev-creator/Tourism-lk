import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ItineraryCard from "@/components/ui/ItineraryCard";

interface FeaturedItinerariesProps {
  itineraries: any[];
}

export default function FeaturedItineraries({ itineraries }: FeaturedItinerariesProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Curated Routes"
        title="Featured Itineraries"
        subtitle="Handcrafted day-by-day travel routes optimized for seamless travel, incredible sights, and authentic local flavor."
        viewAllHref="/itineraries"
        viewAllText="View All Itineraries"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {itineraries.slice(0, 2).map((itinerary) => (
          <ItineraryCard key={itinerary.slug || itinerary._id} itinerary={itinerary} />
        ))}
      </div>
    </section>
  );
}
