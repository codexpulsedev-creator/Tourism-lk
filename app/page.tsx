import React from "react";
import Hero from "@/components/home/Hero";
import ExploreCategories from "@/components/home/ExploreCategories";
import PopularDestinations from "@/components/home/PopularDestinations";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import MapSection from "@/components/home/MapSection";
import PlanTripSection from "@/components/home/PlanTripSection";
import FeaturedItineraries from "@/components/home/FeaturedItineraries";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import AccommodationSection from "@/components/home/AccommodationSection";
import TravelStoriesSection from "@/components/home/TravelStoriesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
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
      {/* 1. Hero */}
      <Hero />

      {/* 2. Explore Sri Lanka (Categories) */}
      <ExploreCategories />

      {/* 3. Popular Destinations */}
      <PopularDestinations destinations={destinations} />

      {/* 4. Signature Experiences */}
      <ExperiencesSection experiences={experiences} />

      {/* 5. Interactive Map of Sri Lanka */}
      <MapSection destinations={destinations} />

      {/* 6. Plan Your Trip Guide */}
      <PlanTripSection />

      {/* 7. Featured Itineraries */}
      <FeaturedItineraries itineraries={itineraries} />

      {/* 8. Upcoming Events & Festivals */}
      <UpcomingEvents events={events} />

      {/* 9. Boutique Stays & Eco Lodges */}
      <AccommodationSection accommodations={accommodations} />

      {/* 10. Ceylon Chronicles (Travel Stories) */}
      <TravelStoriesSection stories={stories} />

      {/* 11. Traveler Reviews */}
      <ReviewsSection />
    </div>
  );
}
