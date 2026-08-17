import { MetadataRoute } from "next";
import {
  seedDestinations,
  seedExperiences,
  seedEvents,
  seedStories,
  seedItineraries,
} from "@/data/seedData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lankaexplore.com";

  const staticRoutes = [
    "",
    "/destinations",
    "/experiences",
    "/itineraries",
    "/accommodation",
    "/events",
    "/stories",
    "/plan-your-trip",
    "/search",
    "/contact",
    "/favorites",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const destinationRoutes = seedDestinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const experienceRoutes = seedExperiences.map((e) => ({
    url: `${baseUrl}/experiences/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const eventRoutes = seedEvents.map((ev) => ({
    url: `${baseUrl}/events/${ev.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const storyRoutes = seedStories.map((s) => ({
    url: `${baseUrl}/stories/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const itineraryRoutes = seedItineraries.map((it) => ({
    url: `${baseUrl}/itineraries/${it.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...experienceRoutes,
    ...eventRoutes,
    ...storyRoutes,
    ...itineraryRoutes,
  ];
}
