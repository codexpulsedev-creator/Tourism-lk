import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import StoryCard from "@/components/ui/StoryCard";

interface TravelStoriesSectionProps {
  stories: any[];
}

export default function TravelStoriesSection({ stories }: TravelStoriesSectionProps) {
  const featuredStory = stories.find((s) => s.featured) || stories[0];
  const regularStories = stories.filter((s) => s.slug !== featuredStory?.slug).slice(0, 2);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Ceylon Chronicles"
        title="Travel Stories & Guides"
        subtitle="Read real firsthand accounts, photography journals, and local insider advice from explorers across Sri Lanka."
        viewAllHref="/stories"
        viewAllText="View All Stories"
      />

      <div className="space-y-8">
        {featuredStory && <StoryCard story={featuredStory} featured={true} />}

        {regularStories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {regularStories.map((story) => (
              <StoryCard key={story.slug || story._id} story={story} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
