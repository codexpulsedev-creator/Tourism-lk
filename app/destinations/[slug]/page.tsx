import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  MapPin,
  Calendar,
  CloudSun,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowLeft,
  Navigation,
} from "lucide-react";
import {
  getDestinationBySlug,
  getDestinations,
  getExperiences,
  getTravelStories,
} from "@/lib/dataService";
import RatingStars from "@/components/ui/RatingStars";
import FavoriteButton from "@/components/ui/FavoriteButton";
import ExperienceCard from "@/components/ui/ExperienceCard";
import StoryCard from "@/components/ui/StoryCard";
import DestinationReviewForm from "@/components/destinations/DestinationReviewForm";
import DestinationCard from "@/components/ui/DestinationCard";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination Not Found — LankaExplore" };
  }

  return {
    title: `${destination.name}, ${destination.district} — Sri Lanka Tourism Guide | LankaExplore`,
    description: destination.shortDescription,
    openGraph: {
      title: `${destination.name} Travel Guide — LankaExplore`,
      description: destination.shortDescription,
      images: [{ url: destination.heroImage }],
    },
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const [allDests, allExp, allStories] = await Promise.all([
    getDestinations(),
    getExperiences(),
    getTravelStories(),
  ]);

  const nearbyDestinations = (allDests as any[])
    .filter((d: any) => d.slug !== slug && (d.province === destination.province || d.category === destination.category))
    .slice(0, 3);

  const relatedExperiences = (allExp as any[]).filter((e: any) =>
    e.destinations?.some((d: string) => d.toLowerCase().includes(destination.name.toLowerCase()))
  );

  return (
    <div className="pt-20 space-y-16">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden flex items-end">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/90 via-brandDark/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all destinations</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-brandDark">
                {destination.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-white/90 bg-white/15 backdrop-blur-md">
                {destination.province} Province
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
              {destination.name}
            </h1>

            <div className="flex items-center gap-4 text-white text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>
                  {destination.district} District, Sri Lanka
                </span>
              </div>
              <RatingStars rating={destination.rating || 4.9} size="sm" showValue={true} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FavoriteButton
              destinationId={destination._id}
              destinationSlug={destination.slug}
              className="p-3.5"
            />
            <Link
              href={`/plan-your-trip?destination=${encodeURIComponent(destination.name)}`}
              className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Plan Trip Here</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (8 cols): Overview, Attractions, Activities, Reviews */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brandDark">
                About {destination.name}
              </h2>
              <p className="text-base text-brandDark/80 leading-relaxed whitespace-pre-line">
                {destination.description}
              </p>

              {/* Tags */}
              {destination.tags && destination.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-brandDark/8">
                  {destination.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-brandBg border border-brandDark/10 text-brandDark/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Photo Gallery Grid */}
            {destination.images && destination.images.length > 1 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-brandDark">
                  Visual Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.images.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="relative h-64 rounded-2xl overflow-hidden shadow-subtle group"
                    >
                      <Image
                        src={img}
                        alt={`${destination.name} photo ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Attractions */}
            {destination.attractions && destination.attractions.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <h3 className="font-serif text-2xl font-bold text-brandDark flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span>Must-Visit Attractions</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.attractions.map((attr: string) => (
                    <div
                      key={attr}
                      className="p-4 rounded-xl bg-brandBg border border-brandDark/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-bold text-base text-brandDark">
                          {attr}
                        </h4>
                        <p className="text-xs text-brandDark/60 mt-0.5">
                          Top recommended regional highlight
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities to Experience */}
            {destination.activities && destination.activities.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <h3 className="font-serif text-2xl font-bold text-brandDark flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" />
                  <span>Popular Activities</span>
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {destination.activities.map((act: string) => (
                    <span
                      key={act}
                      className="px-4 py-2 rounded-xl bg-primary/5 text-primary font-semibold text-xs border border-primary/15"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <DestinationReviewForm destinationSlug={destination.slug} initialReviews={[]} />
          </div>

          {/* Right Column (4 cols): Quick Facts, Weather, Location & Related */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Travel Facts Widget */}
            <div className="rounded-3xl bg-brandDark text-white p-6 sm:p-8 shadow-card border border-white/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
                Traveler Quick Facts
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Best Time to Visit
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {destination.bestTimeToVisit || "Year-Round"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CloudSun className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Typical Weather
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {destination.weatherSummary || "Warm Tropical"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Geographic GPS
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {destination.latitude?.toFixed(4)}° N, {destination.longitude?.toFixed(4)}° E
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/plan-your-trip"
                  className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary-400 text-brandDark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Island Travel Guide</span>
                </Link>
              </div>
            </div>

            {/* Related Experiences */}
            {relatedExperiences.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold text-brandDark">
                  Nearby Experiences
                </h4>
                <div className="space-y-4">
                  {relatedExperiences.slice(0, 2).map((exp) => (
                    <ExperienceCard key={exp.slug} experience={exp} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nearby / Similar Destinations */}
        {nearbyDestinations.length > 0 && (
          <div className="pt-16 space-y-8">
            <h3 className="font-serif text-3xl font-bold text-brandDark">
              More Places You May Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyDestinations.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
