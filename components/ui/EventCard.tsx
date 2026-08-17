import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface EventCardProps {
  event: {
    _id?: string;
    title: string;
    slug: string;
    description?: string;
    shortDescription: string;
    location: string;
    image: string;
    category: string;
    startDate: string | Date;
    endDate: string | Date;
    ticketInfo?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const { title, slug, shortDescription, location, image, category, startDate, endDate, ticketInfo } =
    event;

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-brandDark/10">
        <Image
          src={image || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/70 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-primary shadow-sm">
            {category}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-secondary" />
          <span>
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-brandDark group-hover:text-primary transition-colors line-clamp-1">
            <Link href={`/events/${slug}`}>{title}</Link>
          </h3>
          <p className="text-xs text-brandDark/70 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-brandDark/8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-brandDark/60 truncate max-w-[150px]">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <span className="font-semibold text-primary">{ticketInfo || "Free Event"}</span>
        </div>
      </div>
    </div>
  );
}
