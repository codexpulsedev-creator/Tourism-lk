import React from "react";
import { Metadata } from "next";
import { getExperiences } from "@/lib/dataService";
import ExperienceCard from "@/components/ui/ExperienceCard";

export const metadata: Metadata = {
  title: "Experiences & Activities in Sri Lanka — LankaExplore",
  description:
    "Discover world-class surfing, leopard safaris, scenic blue mountain train rides, hiking, wellness retreats, and culinary journeys in Sri Lanka.",
};

export default async function ExperiencesPage() {
  const experiences: any[] = await getExperiences();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
          Endless Adventures
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight">
          Sri Lankan Experiences & Activities
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Whether catching warm ocean waves in Arugam Bay or tracing sacred trails up misty mountain peaks, find unforgettable experiences curated for every adventurer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((exp: any) => (
          <ExperienceCard key={exp.slug || exp._id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
