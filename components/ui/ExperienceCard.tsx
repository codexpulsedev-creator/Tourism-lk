import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mountain, ArrowRight } from "lucide-react";

export interface ExperienceCardProps {
  experience: {
    _id?: string;
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    image: string;
    duration?: string;
    difficulty?: string;
    location?: string;
    destinations?: string[];
  };
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const { title, slug, category, shortDescription, image, duration, difficulty, location } =
    experience;

  return (
    <Link
      href={`/experiences/${slug}`}
      className="group relative rounded-2xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-56 w-full overflow-hidden bg-brandDark/10">
        <Image
          src={image || "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?q=80&w=1200&auto=format&fit=crop"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/80 via-brandDark/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-primary shadow-sm">
            {category}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>{duration}</span>
            </div>
          )}
          {difficulty && (
            <div className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-secondary" />
              <span>{difficulty}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-brandDark group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-brandDark/70 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-brandDark/8 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark">
          <span>{location || "Sri Lanka"}</span>
          <div className="flex items-center gap-1 uppercase tracking-wider">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
