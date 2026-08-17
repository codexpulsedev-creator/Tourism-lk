import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  ArrowLeft,
  Compass,
  ArrowRight,
} from "lucide-react";
import { getItineraryBySlug } from "@/lib/dataService";

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);

  if (!itinerary) {
    return { title: "Itinerary Not Found — LankaExplore" };
  }

  return {
    title: `${itinerary.title} — LankaExplore`,
    description: itinerary.overview,
  };
}

export default async function ItineraryDetailPage({ params }: ItineraryPageProps) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);

  if (!itinerary) {
    notFound();
  }

  return (
    <div className="pt-20 space-y-16">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden flex items-end">
        <Image
          src={itinerary.coverImage}
          alt={itinerary.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/90 via-brandDark/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-4">
          <Link
            href="/itineraries"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Itineraries</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary text-brandDark">
              {itinerary.durationDays} Days / {itinerary.durationDays - 1} Nights
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-md">
              {itinerary.budgetEstimate}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {itinerary.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-3xl font-sans leading-relaxed">
            {itinerary.overview}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Day by Day Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-brandDark/10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brandDark">
                Day-by-Day Journey
              </h2>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Full Route Plan
              </span>
            </div>

            <div className="space-y-8">
              {itinerary.days?.map((day: any) => (
                <div
                  key={day.dayNumber}
                  className="rounded-3xl bg-white border border-brandDark/8 p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row gap-6 items-start"
                >
                  {/* Day Badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary text-white flex flex-col items-center justify-center font-bold shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-secondary">DAY</span>
                    <span className="font-serif text-2xl -mt-1">{day.dayNumber}</span>
                  </div>

                  {/* Day Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif text-xl font-bold text-brandDark">
                        {day.title}
                      </h3>
                      <Link
                        href={`/destinations/${day.destination.toLowerCase()}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{day.destination}</span>
                      </Link>
                    </div>

                    <p className="text-xs sm:text-sm text-brandDark/70 leading-relaxed">
                      {day.description}
                    </p>

                    {/* Day Activities */}
                    {day.activities && day.activities.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-brandDark/50 uppercase tracking-wider block mb-1.5">
                          Highlights & Stops:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {day.activities.map((act: string) => (
                            <span
                              key={act}
                              className="text-xs px-2.5 py-1 rounded-lg bg-brandBg border border-brandDark/8 text-brandDark/80 font-medium flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-secondary" />
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {day.stayOvernight && (
                      <p className="text-xs text-brandDark/50 pt-1">
                        <strong>Overnight Stay:</strong> {day.stayOvernight}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl bg-brandDark text-white p-6 sm:p-8 shadow-card border border-white/10 space-y-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
                Trip Highlights
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                    Ideal For
                  </span>
                  <span className="font-semibold text-white text-sm">
                    {itinerary.idealFor || "Couples, Solo, Families"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                    Recommended Season
                  </span>
                  <span className="font-semibold text-white text-sm">
                    {itinerary.bestSeason || "Year-Round"}
                  </span>
                </div>

                {itinerary.routeHighlights && (
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px] mb-1">
                      Destinations Covered
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {itinerary.routeHighlights.map((dest: string) => (
                        <span
                          key={dest}
                          className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white font-medium"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  href={`/contact?itinerary=${encodeURIComponent(itinerary.title)}`}
                  className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary-400 text-brandDark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Compass className="w-4 h-4" />
                  <span>Customize This Itinerary</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
