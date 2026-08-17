import React from "react";
import { Metadata } from "next";
import { getEvents } from "@/lib/dataService";
import EventCard from "@/components/ui/EventCard";

export const metadata: Metadata = {
  title: "Events & Cultural Festivals in Sri Lanka — LankaExplore",
  description:
    "Discover grand cultural pageants, literary arts festivals, religious celebrations, and sporting championships across Sri Lanka.",
};

export default async function EventsPage() {
  const events: any[] = await getEvents();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Cultural Celebrations
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Upcoming Events & Festivals
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Immerse yourself in thousands of years of living tradition, electrifying Kandyan fire dancers, sacred illuminated full moon festivals, and international literary arts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <EventCard key={event.slug || event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
