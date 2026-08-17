import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import EventCard from "@/components/ui/EventCard";

interface UpcomingEventsProps {
  events: any[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Festivals & Culture"
        title="Upcoming Events & Celebrations"
        subtitle="Experience vibrant pageantries, literary arts festivals, surfing championships, and illuminated street celebrations."
        viewAllHref="/events"
        viewAllText="View All Events"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.slug || event._id} event={event} />
        ))}
      </div>
    </section>
  );
}
