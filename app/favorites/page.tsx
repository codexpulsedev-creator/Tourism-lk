"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Compass, Sparkles, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DestinationCard from "@/components/ui/DestinationCard";
import EmptyState from "@/components/ui/EmptyState";
import { seedDestinations } from "@/data/seedData";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, user } = useAuth();
  const [allDestinations, setAllDestinations] = useState<any[]>(seedDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const res = await fetch("/api/destinations");
        if (res.ok) {
          const data = await res.json();
          if (data.destinations) {
            setAllDestinations(data.destinations);
          }
        }
      } catch (e) {}
      finally {
        setLoading(false);
      }
    }
    loadDestinations();
  }, []);

  const savedDestinations = allDestinations.filter((d) =>
    favorites.includes(d.slug) || favorites.includes(d._id)
  );

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-brandDark border border-secondary/30 mb-3">
          Saved Itinerary Wishlist
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark tracking-tight flex items-center gap-3">
          <span>Your Saved Places</span>
          <Heart className="w-8 h-8 text-secondary fill-secondary" />
        </h1>
        <p className="text-base sm:text-lg text-brandDark/70 mt-3 leading-relaxed">
          Keep track of your favorite Sri Lankan destinations and easily organize your dream island vacation.
        </p>
      </div>

      {savedDestinations.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-brandDark/60 pb-2 border-b border-brandDark/10">
            <span>
              You have saved <strong>{savedDestinations.length}</strong> destination
              {savedDestinations.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedDestinations.map((dest) => (
              <DestinationCard key={dest.slug || dest._id} destination={dest} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="No saved places yet"
          description="Click the heart icon on any destination card to save your dream Sri Lankan destinations here."
          actionHref="/destinations"
          actionLabel="Discover Destinations"
          icon={<Heart className="w-8 h-8 text-secondary" />}
        />
      )}
    </div>
  );
}
