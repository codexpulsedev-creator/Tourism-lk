"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, Compass } from "lucide-react";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";

export interface DestinationCardProps {
  destination: {
    _id?: string;
    name: string;
    slug: string;
    province: string;
    district: string;
    shortDescription: string;
    category: string;
    heroImage: string;
    rating: number;
    reviewsCount?: number;
    bestTimeToVisit?: string;
  };
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const {
    _id,
    name,
    slug,
    province,
    district,
    shortDescription,
    category,
    heroImage,
    rating,
    reviewsCount,
  } = destination;

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden bg-brandDark/10">
        <Image
          src={heroImage || "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-primary shadow-sm">
            {category}
          </span>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton destinationId={_id} destinationSlug={slug} />
        </div>

        {/* Location over image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            <span>
              {district}, {province}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-bold text-brandDark group-hover:text-primary transition-colors">
              <Link href={`/destinations/${slug}`} className="focus:outline-none">
                {name}
              </Link>
            </h3>
            <RatingStars rating={rating || 4.8} size="sm" showValue={true} />
          </div>

          <p className="text-sm text-brandDark/70 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-brandDark/8 flex items-center justify-between">
          <span className="text-xs text-brandDark/50 font-medium">
            {reviewsCount ? `${reviewsCount} reviews` : "Featured Spot"}
          </span>

          <Link
            href={`/destinations/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors uppercase tracking-wider"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
