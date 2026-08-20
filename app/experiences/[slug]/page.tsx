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
  Camera,
  Lightbulb,
  HeartHandshake,
  Navigation,
} from "lucide-react";
import { getExperienceBySlug, getDestinations, getExperiences } from "@/lib/dataService";
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
    title: `${experience.title} — Sri Lanka Activities & Experiences | LankaExplore`,
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

  const allExperiences = (await getExperiences()) as any[];
  const otherExperiences = allExperiences
    .filter((e: any) => e.slug !== experience.slug)
    .slice(0, 3);

  const galleryImages =
    experience.images && experience.images.length > 0
      ? experience.images
      : [experience.image];

  return (
    <div className="pt-20 space-y-16">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[440px] w-full overflow-hidden flex items-end">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/95 via-brandDark/50 to-brandDark/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-4">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all hover:bg-black/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Experiences</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
                experience.badgeColor || "bg-primary"
              }`}
            >
              {experience.badge || experience.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              {experience.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {experience.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-3xl font-sans leading-relaxed">
            {experience.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* About / Overview */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
              <div className="flex items-center gap-2.5 text-primary">
                <Compass className="w-6 h-6 text-secondary" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brandDark">
                  About this Experience
                </h2>
              </div>
              <p className="text-base text-brandDark/80 leading-relaxed whitespace-pre-line">
                {experience.description}
              </p>
            </div>

            {/* Why Experience This */}
            {experience.whyExperience && experience.whyExperience.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-6 h-6 text-secondary" />
                  <h3 className="font-serif text-2xl font-bold text-brandDark">
                    Why Experience This
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.whyExperience.map((reason: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/50 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-brandDark leading-snug">
                        {reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-6 h-6 text-secondary" />
                  <h3 className="font-serif text-2xl font-bold text-brandDark">
                    Key Highlights
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.highlights.map((item: string) => (
                    <div
                      key={item}
                      className="p-4 rounded-xl bg-brandBg border border-brandDark/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-brandDark">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Places / Locations */}
            {experience.popularPlaces && experience.popularPlaces.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-6 h-6 text-secondary" />
                  <h3 className="font-serif text-2xl font-bold text-brandDark">
                    Popular Places & Hotspots
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.popularPlaces.map((place: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-brandDark/8 shadow-sm space-y-2 hover:border-secondary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-serif font-bold text-base text-brandDark">
                          {place.name}
                        </h4>
                        {place.district && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/15 text-brandDark">
                            {place.district}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brandDark/70 leading-relaxed">
                        {place.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Things Visitors Can Do */}
            {experience.thingsToDo && experience.thingsToDo.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-6 h-6 text-secondary" />
                  <h3 className="font-serif text-2xl font-bold text-brandDark">
                    Things Visitors Can Do
                  </h3>
                </div>
                <div className="space-y-3">
                  {experience.thingsToDo.map((todo: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gray-50/80 border border-brandDark/5 flex items-start gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-brandDark leading-relaxed">
                        {todo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Tips */}
            {experience.travelTips && experience.travelTips.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <h3 className="font-serif text-2xl font-bold text-brandDark">
                    Essential Travel & Visitor Tips
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3.5">
                  {experience.travelTips.map((tip: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/40 flex items-start gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-brandDark/85 leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery (5-10 authentic images) */}
            {galleryImages.length > 0 && (
              <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Camera className="w-6 h-6 text-secondary" />
                    <h3 className="font-serif text-2xl font-bold text-brandDark">
                      Authentic Photo Gallery
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-brandDark/50">
                    {galleryImages.length} Photographs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((imgUrl: string, idx: number) => (
                    <div
                      key={idx}
                      className={`relative rounded-2xl overflow-hidden shadow-sm border border-brandDark/5 group bg-black/5 ${
                        idx === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${experience.title} photograph ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 rounded-3xl bg-brandDark text-white p-6 sm:p-8 shadow-card border border-white/10 space-y-6">
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

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Location / Region
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {experience.location || "Sri Lanka"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  href={`/contact?experience=${encodeURIComponent(experience.title)}`}
                  className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary-400 text-brandDark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Compass className="w-4 h-4" />
                  <span>Inquire for Activity</span>
                </Link>

                <Link
                  href="/experiences"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Browse Other Experiences</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured in These Destinations */}
        {relatedDestinations.length > 0 && (
          <div className="pt-8 space-y-8 border-t border-brandDark/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                Destinations
              </span>
              <h3 className="font-serif text-3xl font-bold text-brandDark">
                Featured In These Locations
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedDestinations.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </div>
          </div>
        )}

        {/* Explore More Experiences */}
        {otherExperiences.length > 0 && (
          <div className="pt-8 space-y-8 border-t border-brandDark/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                More Adventures
              </span>
              <h3 className="font-serif text-3xl font-bold text-brandDark">
                Other Unmissable Experiences
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherExperiences.map((exp: any) => (
                <Link
                  key={exp.slug}
                  href={`/experiences/${exp.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-card transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider ${
                          exp.badgeColor || "bg-primary"
                        }`}
                      >
                        {exp.badge || exp.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-brandDark group-hover:text-primary transition-colors">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-brandDark/70 line-clamp-2 mt-1">
                        {exp.shortDescription}
                      </p>
                    </div>
                    <div className="pt-2 text-xs font-bold text-primary flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

