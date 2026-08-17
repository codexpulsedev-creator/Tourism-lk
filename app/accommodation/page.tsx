import React from "react";
import { Metadata } from "next";
import { getAccommodations } from "@/lib/dataService";
import AccommodationCard from "@/components/ui/AccommodationCard";

export const metadata: Metadata = {
  title: "Accommodation in Sri Lanka — LankaExplore",
  description:
    "Explore luxury boutique hotels, tea planter bungalows, coastal beach resorts, and jungle eco lodges across Sri Lanka.",
};

export default async function AccommodationPage() {
  const accommodations: any[] = await getAccommodations();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Curated Stays
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Boutique Stays & Eco Lodges
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          From restored colonial tea estate bungalows overlooking high mountain valleys to serene oceanfront sanctuaries by Geoffrey Bawa.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accommodations.map((hotel: any) => (
          <AccommodationCard key={hotel.slug || hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
