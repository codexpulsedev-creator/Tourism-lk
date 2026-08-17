import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/ui/ExperienceCard";

interface ExperiencesSectionProps {
  experiences: any[];
}

export default function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-brandDark/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Unforgettable Journeys"
          title="Signature Experiences"
          subtitle="From tracking leopards in ancient scrub forests to leaning out of blue highland trains and surfing legendary point breaks."
          viewAllHref="/experiences"
          viewAllText="View All Experiences"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.slice(0, 4).map((exp) => (
            <ExperienceCard key={exp.slug || exp._id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
