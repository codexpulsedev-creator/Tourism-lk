import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Clock,
  Mountain,
  Sun,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Compass,
  Sparkles,
} from "lucide-react";
import { getExperienceBySlug, getDestinations } from "@/lib/dataService";
import DestinationCard from "@/components/ui/DestinationCard";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    return { title: "Experience Not Found — LankaExplore" };
  }

  return {
    title: `${experience.title} — Sri Lanka Activities | LankaExplore`,
    description: experience.shortDescription,
  };
}

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const allDestinations = (await getDestinations()) as any[];
  const relatedDestinations = allDestinations.filter((d: any) =>
    experience.destinations?.some((dest: string) => d.name.toLowerCase().includes(dest.toLowerCase()))
  );

  return (
    <div className="pt-20 space-y-16">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden flex items-end">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/90 via-brandDark/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-4">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Experiences</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-brandDark">
              {experience.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {experience.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl font-sans">
            {experience.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main info */}
          <div className="lg:col-span-8 space-y-10">
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brandDark">
                Experience Overview
              </h2>
              <p className="text-base text-brandDark/80 leading-relaxed whitespace-pre-line">
                {experience.description}
              </p>
            </div>

            {/* Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <h3 className="font-serif text-2xl font-bold text-brandDark flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span>Activity Highlights</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.highlights.map((item: string) => (
                    <div
                      key={item}
                      className="p-4 rounded-xl bg-brandBg border border-brandDark/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-brandDark">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl bg-brandDark text-white p-6 sm:p-8 shadow-card border border-white/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
                Activity Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Duration
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {experience.duration || "Half-Day"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mountain className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Difficulty Level
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {experience.difficulty || "Moderate"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Best Season
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {experience.bestSeason || "Year-Round"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href={`/contact?experience=${encodeURIComponent(experience.title)}`}
                  className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary-400 text-brandDark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Compass className="w-4 h-4" />
                  <span>Inquire for Activity</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <div className="pt-16 space-y-8">
            <h3 className="font-serif text-3xl font-bold text-brandDark">
              Featured In These Destinations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedDestinations.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
