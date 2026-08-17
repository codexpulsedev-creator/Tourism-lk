import React from "react";
import InteractiveMap from "@/components/ui/InteractiveMap";

interface MapSectionProps {
  destinations: any[];
}

export default function MapSection({ destinations }: MapSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InteractiveMap destinations={destinations} />
    </section>
  );
}
