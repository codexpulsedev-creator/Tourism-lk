import React, { Suspense } from "react";
import { Metadata } from "next";
import SearchView from "./SearchView";

export const metadata: Metadata = {
  title: "Search Sri Lanka Destinations & Experiences — LankaExplore",
  description: "Search across destinations, adventures, cultural events, and travel stories in Sri Lanka.",
};

export default function SearchPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="max-w-2xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Global Island Search
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Find Places, Adventures & Stories
        </h1>
      </div>

      <Suspense fallback={<div className="text-center py-20">Loading search...</div>}>
        <SearchView />
      </Suspense>
    </div>
  );
}
