import React, { Suspense } from "react";
import { Metadata } from "next";
import DestinationsView from "./DestinationsView";
import { getDestinations } from "@/lib/dataService";

export const metadata: Metadata = {
  title: "Destinations in Sri Lanka — LankaExplore",
  description:
    "Explore iconic destinations in Sri Lanka: Ella, Sigiriya, Kandy, Galle Fort, Mirissa, Yala, Nuwara Eliya, Arugam Bay, and ancient cultural wonders.",
};

export default async function DestinationsPage() {
  const initialDestinations = await getDestinations();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Explore Ceylon
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Destinations Across Sri Lanka
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          From mist-covered mountain tea valleys to historic coastal fortresses and ancient kingdoms, discover the wonders of Sri Lanka.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-20">Loading destinations...</div>}>
        <DestinationsView initialDestinations={initialDestinations} />
      </Suspense>
    </div>
  );
}
