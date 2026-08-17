import React from "react";
import Hero from "@/components/home/Hero";
import WelcomeAyubowan from "@/components/home/WelcomeAyubowan";
import ExploreCategories from "@/components/home/ExploreCategories";
import PopularDestinations from "@/components/home/PopularDestinations";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import MapSection from "@/components/home/MapSection";
import PlanTripSection from "@/components/home/PlanTripSection";
import FeaturedItineraries from "@/components/home/FeaturedItineraries";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import AccommodationSection from "@/components/home/AccommodationSection";
import TravelStoriesSection from "@/components/home/TravelStoriesSection";
import WhatsNewSection from "@/components/home/WhatsNewSection";
import {
  getDestinations,
  getExperiences,
  getEvents,
  getItineraries,
  getAccommodations,
  getTravelStories,
} from "@/lib/dataService";

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [
    destinations,
    experiences,
    events,
    itineraries,
    accommodations,
    stories,
  ] = await Promise.all([
    getDestinations({ limit: 10 }),
    getExperiences({ limit: 8 }),
    getEvents({ limit: 6 }),
    getItineraries({ limit: 4 }),
    getAccommodations({ limit: 8 }),
    getTravelStories({ limit: 6 }),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. Full-screen Cinematic Hero (AN ISLAND ESCAPE AWAITS YOU) */}
      <Hero />

      {/* 2. Ayubowan - Welcome to Sri Lanka Highlight Section */}
      <WelcomeAyubowan />

      {/* 3. Explore Sri Lanka (Categories) */}
      <ExploreCategories />

      {/* 4. Popular Destinations */}
      <PopularDestinations destinations={destinations} />

      {/* 5. Signature Experiences */}
      <ExperiencesSection experiences={experiences} />

      {/* 6. Interactive Map of Sri Lanka */}
      <MapSection destinations={destinations} />

      {/* 7. Plan Your Trip Guide */}
      <PlanTripSection />

      {/* 8. Featured Itineraries */}
      <FeaturedItineraries itineraries={itineraries} />

      {/* 9. Upcoming Events & Festivals */}
      <UpcomingEvents events={events} />

      {/* 10. Boutique Stays & Eco Lodges */}
      <AccommodationSection accommodations={accommodations} />

      {/* 11. Ceylon Chronicles (Travel Stories) */}
      <TravelStoriesSection stories={stories} />

      {/* 12. What's New Section (Matching srilanka.travel Screenshot) */}
      <WhatsNewSection />
    </div>
  );
}
