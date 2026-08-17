import React from "react";
import { Metadata } from "next";
import { getTravelStories } from "@/lib/dataService";
import StoryCard from "@/components/ui/StoryCard";

export const metadata: Metadata = {
  title: "Travel Stories & Guides — LankaExplore",
  description:
    "Firsthand travel stories, cultural chronicles, local recipes, and insider advice from explorers across Sri Lanka.",
};

export default async function TravelStoriesPage() {
  const stories: any[] = await getTravelStories();
  const featuredStory = stories.find((s: any) => s.featured) || stories[0];
  const regularStories = stories.filter((s: any) => s.slug !== featuredStory?.slug);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Ceylon Chronicles
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Travel Stories & Guides
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Firsthand journeys through mountain cloud forests, ancient stone ruins, and spice-filled village kitchens written by travel writers and cultural historians.
        </p>
      </div>

      {featuredStory && <StoryCard story={featuredStory} featured={true} />}

      {regularStories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularStories.map((story: any) => (
            <StoryCard key={story.slug || story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
