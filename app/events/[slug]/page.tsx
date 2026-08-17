import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Calendar,
  MapPin,
  Tag,
  ArrowLeft,
  Ticket,
  Clock,
  Sparkles,
} from "lucide-react";
import { getEventBySlug } from "@/lib/dataService";
import { formatDate } from "@/lib/utils";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found — LankaExplore" };
  }

  return {
    title: `${event.title} — Sri Lanka Events | LankaExplore`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="pt-20 space-y-16">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden flex items-end">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/90 via-brandDark/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Events</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-brandDark">
              {event.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl font-sans">
            {event.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-brandDark/8 shadow-subtle space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brandDark">
                Event Description
              </h2>
              <p className="text-base text-brandDark/80 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl bg-brandDark text-white p-6 sm:p-8 shadow-card border border-white/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
                Event Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Dates
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {formatDate(event.startDate)} — {formatDate(event.endDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Location
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {event.location}
                    </span>
                  </div>
                </div>

                {event.venue && (
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                        Venue
                      </span>
                      <span className="font-semibold text-white text-sm">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Ticket className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block uppercase tracking-wider text-[10px]">
                      Admission / Tickets
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {event.ticketInfo || "Free / Open Entry"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
