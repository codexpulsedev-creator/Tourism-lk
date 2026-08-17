import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles, ArrowRight } from "lucide-react";

export interface ItineraryCardProps {
  itinerary: {
    _id?: string;
    title: string;
    slug: string;
    durationDays: number;
    overview: string;
    coverImage: string;
    idealFor?: string;
    bestSeason?: string;
    routeHighlights?: string[];
    budgetEstimate?: string;
  };
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const { title, slug, durationDays, overview, coverImage, routeHighlights, budgetEstimate } =
    itinerary;

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 w-full overflow-hidden bg-brandDark/10">
        <Image
          src={coverImage || "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary text-brandDark shadow-sm flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {durationDays} Days / {durationDays - 1} Nights
          </span>
        </div>

        {budgetEstimate && (
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-brandDark shadow-sm">
              {budgetEstimate.split("(")[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-brandDark group-hover:text-primary transition-colors leading-tight">
            <Link href={`/itineraries/${slug}`}>{title}</Link>
          </h3>
          <p className="text-sm text-brandDark/70 line-clamp-2 leading-relaxed">
            {overview}
          </p>

          {/* Route path tags */}
          {routeHighlights && routeHighlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {routeHighlights.slice(0, 5).map((stop, i) => (
                <span
                  key={stop}
                  className="text-[11px] font-medium text-brandDark/60 bg-brandDark/5 px-2 py-0.5 rounded-md"
                >
                  {stop}
                  {i < Math.min(routeHighlights.length - 1, 4) && " →"}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-brandDark/8 flex items-center justify-between">
          <Link
            href={`/itineraries/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-dark uppercase tracking-wider"
          >
            <span>View Day by Day Guide</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
