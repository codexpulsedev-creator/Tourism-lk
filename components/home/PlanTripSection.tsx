import React from "react";
import Link from "next/link";
import { Train, SunMedium, FileText, Compass, ShieldCheck, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PlanTripSection() {
  const guideFeatures = [
    {
      icon: <SunMedium className="w-6 h-6 text-secondary" />,
      title: "Year-Round Sunshine",
      description: "Sri Lanka has two contrasting monsoon seasons. When it rains on the southwest coast, the east coast (Arugam Bay, Trincomalee) is sunny and dry.",
      href: "/plan-your-trip#weather",
      linkText: "Weather Guide",
    },
    {
      icon: <Train className="w-6 h-6 text-secondary" />,
      title: "Scenic Train Journeys",
      description: "Book first-class observation carriages or second-class open-door seats for the legendary mountain train between Kandy, Nanu Oya, and Ella.",
      href: "/plan-your-trip#transport",
      linkText: "Train Booking Tips",
    },
    {
      icon: <FileText className="w-6 h-6 text-secondary" />,
      title: "Electronic Travel Visa (ETA)",
      description: "Most travelers can easily obtain a 30-day tourist visa online prior to arrival via the official Sri Lanka electronic visa portal.",
      href: "/plan-your-trip#visa",
      linkText: "Visa Requirements",
    },
    {
      icon: <Compass className="w-6 h-6 text-secondary" />,
      title: "Custom Tailored Itineraries",
      description: "Explore curated routes designed by local Ceylon travel specialists for solo travelers, couples, wildlife seekers, and families.",
      href: "/itineraries",
      linkText: "View Itineraries",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brandDark text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Essential Travel Guide"
          title="Plan Your Sri Lankan Journey"
          subtitle="Everything you need to know before stepping foot on the island—from seasonal weather patterns to iconic rail transit."
          dark={true}
          viewAllHref="/plan-your-trip"
          viewAllText="Complete Travel Guide"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guideFeatures.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 hover:border-secondary/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
