import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CheckCircle, ExternalLink } from "lucide-react";
import RatingStars from "./RatingStars";

export interface AccommodationCardProps {
  hotel: {
    _id?: string;
    name: string;
    slug: string;
    category: string;
    location: string;
    district: string;
    shortDescription: string;
    priceRange: string;
    pricePerNightUSD: number;
    rating: number;
    reviewsCount?: number;
    image: string;
    amenities: string[];
    bookingUrl?: string;
  };
}

export default function AccommodationCard({ hotel }: AccommodationCardProps) {
  const {
    name,
    category,
    location,
    shortDescription,
    priceRange,
    pricePerNightUSD,
    rating,
    reviewsCount,
    image,
    amenities,
    bookingUrl,
  } = hotel;

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 w-full overflow-hidden bg-brandDark/10">
        <Image
          src={image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/70 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-primary shadow-sm">
            {category}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brandDark/80 text-white backdrop-blur-sm">
            {priceRange}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          <span>{location}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-brandDark group-hover:text-primary transition-colors">
              {name}
            </h3>
            <RatingStars rating={rating} size="sm" showValue={true} />
          </div>

          <p className="text-xs text-brandDark/70 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>

          {/* Amenities tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[10px] font-medium bg-primary/5 text-primary-800 px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <CheckCircle className="w-2.5 h-2.5 text-primary" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-brandDark/8 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brandDark/50 uppercase tracking-wider block">
              From
            </span>
            <span className="text-base font-bold text-brandDark font-sans">
              ${pricePerNightUSD}{" "}
              <span className="text-xs font-normal text-brandDark/60">/ night</span>
            </span>
          </div>

          <a
            href={bookingUrl || `/contact?stay=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-all shadow-sm"
          >
            <span>Inquire</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
