import React from "react";
import { Metadata } from "next";
import { getTravelStories } from "@/lib/dataService";
import StoryCard from "@/components/ui/StoryCard";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";

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
    <div className="pb-24 space-y-12">
      <PageHeaderBanner
        title="Ceylon Chronicles & Travel Stories"
        subtitle="Firsthand journeys through mountain cloud forests, ancient stone ruins, and spice-filled village kitchens written by explorers and travel journalists."
        category="STORIES & INSIDER ADVICE"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "Travel Stories" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {featuredStory && <StoryCard story={featuredStory} featured={true} />}

        {regularStories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularStories.map((story: any) => (
              <StoryCard key={story.slug || story._id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
