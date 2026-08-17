import React, { Suspense } from "react";
import { Metadata } from "next";
import DestinationsView from "./DestinationsView";
import { getDestinations } from "@/lib/dataService";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

export const metadata: Metadata = {
  title: "Destinations in Sri Lanka — LankaExplore",
  description:
    "Explore iconic destinations in Sri Lanka: Ella, Sigiriya, Kandy, Galle Fort, Mirissa, Yala, Nuwara Eliya, Arugam Bay, and ancient cultural wonders.",
};

export default async function DestinationsPage() {
  const initialDestinations = await getDestinations();

  return (
    <div className="pb-24 space-y-12">
      <PageHeaderBanner
        title="Destinations Across Sri Lanka"
        subtitle="From mist-covered mountain tea valleys to historic coastal fortresses and ancient kingdoms, discover the wonders of Sri Lanka."
        category="DISCOVER SRI LANKA"
        backgroundImage="https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "Destinations" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20">Loading destinations...</div>}>
          <DestinationsView initialDestinations={initialDestinations} />
        </Suspense>
      </div>
    </div>
  );
}
