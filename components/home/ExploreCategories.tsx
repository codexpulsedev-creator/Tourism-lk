import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { seedCategories } from "@/data/seedData";

export default function ExploreCategories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Wonder in Diversity"
        title="Explore Sri Lanka"
        subtitle="From golden tropical coasts to misty cloud forests and ancient sacred kingdoms, immerse in the diverse landscapes of Sri Lanka."
        viewAllHref="/destinations"
        viewAllText="View All Regions"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seedCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/destinations?category=${encodeURIComponent(category.name)}`}
            className="group relative h-80 rounded-3xl overflow-hidden shadow-subtle hover:shadow-cardHover border border-brandDark/8 transition-all duration-500 flex flex-col justify-end p-6"
          >
            {/* Background Image */}
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brandDark/90 via-brandDark/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Content */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-secondary transition-colors">
                  {category.name}
                </h3>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-secondary group-hover:text-brandDark transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed opacity-90">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
