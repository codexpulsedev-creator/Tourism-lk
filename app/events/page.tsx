import React from "react";
import { Metadata } from "next";
import { getEvents } from "@/lib/dataService";
import EventCard from "@/components/ui/EventCard";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

export const metadata: Metadata = {
  title: "Events & Cultural Festivals in Sri Lanka — LankaExplore",
  description:
    "Discover grand cultural pageants, literary arts festivals, religious celebrations, and sporting championships across Sri Lanka.",
};

export default async function EventsPage() {
  const events: any[] = await getEvents();

  return (
    <div className="pb-24 space-y-12">
      <PageHeaderBanner
        title="Upcoming Events & Festivals"
        subtitle="Immerse yourself in thousands of years of living tradition, electrifying Kandyan fire dancers, sacred pageants, and international celebrations."
        category="CULTURAL CELEBRATIONS & PAGEANTRY"
        backgroundImage="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "Events & Festivals" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => (
            <EventCard key={event.slug || event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
