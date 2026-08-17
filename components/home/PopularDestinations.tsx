import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/ui/DestinationCard";

interface PopularDestinationsProps {
  destinations: any[];
}

export default function PopularDestinations({ destinations }: PopularDestinationsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Iconic Locations"
        title="Popular Destinations"
        subtitle="Unveil the top-rated mountain sanctuaries, historic colonial fortresses, and tropical coastal escapes of Sri Lanka."
        viewAllHref="/destinations"
        viewAllText="View All Destinations"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.slice(0, 6).map((dest) => (
          <DestinationCard key={dest.slug || dest._id} destination={dest} />
        ))}
      </div>
    </section>
  );
}
