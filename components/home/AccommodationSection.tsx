import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import AccommodationCard from "@/components/ui/AccommodationCard";

interface AccommodationSectionProps {
  accommodations: any[];
}

export default function AccommodationSection({ accommodations }: AccommodationSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-brandDark/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Exceptional Stays"
          title="Boutique Hotels & Eco Lodges"
          subtitle="From restored colonial tea planter bungalows to cliffside eco-retreats designed by legendary architect Geoffrey Bawa."
          viewAllHref="/accommodation"
          viewAllText="View All Stays"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accommodations.slice(0, 4).map((hotel) => (
            <AccommodationCard key={hotel.slug || hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}
