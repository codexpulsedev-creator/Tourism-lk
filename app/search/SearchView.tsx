"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Compass, Sparkles, MapPin, Tag } from "lucide-react";
import DestinationCard from "@/components/ui/DestinationCard";
import ExperienceCard from "@/components/ui/ExperienceCard";
import EventCard from "@/components/ui/EventCard";
import StoryCard from "@/components/ui/StoryCard";
import EmptyState from "@/components/ui/EmptyState";

export default function SearchView() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "destinations" | "experiences" | "events" | "stories">("all");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    destinations: any[];
    experiences: any[];
    events: any[];
    stories: any[];
    total: number;
  }>({
    destinations: [],
    experiences: [],
    events: [],
    stories: [],
    total: 0,
  });

  const fetchResults = async (q: string) => {
    if (!q.trim()) {
      setResults({ destinations: [], experiences: [], events: [], stories: [], total: 0 });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchResults(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      fetchResults(query.trim());
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative max-w-3xl">
        <Search className="w-5 h-5 text-brandDark/40 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by destination name, activities, province, beaches, surfing..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border border-brandDark/15 text-brandDark placeholder-brandDark/40 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-subtle"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold uppercase tracking-wider transition-all"
        >
          Search
        </button>
      </form>

      {/* Tabs */}
      {results.total > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-brandDark/10 pb-3">
          {[
            { id: "all", label: `All (${results.total})` },
            { id: "destinations", label: `Destinations (${results.destinations.length})` },
            { id: "experiences", label: `Experiences (${results.experiences.length})` },
            { id: "events", label: `Events (${results.events.length})` },
            { id: "stories", label: `Stories (${results.stories.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-brandBg text-brandDark/70 hover:bg-brandDark/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-16 text-sm text-brandDark/60">
          Searching through Sri Lankan destinations, stories, and experiences...
        </div>
      )}

      {/* Results Container */}
      {!loading && results.total > 0 && (
        <div className="space-y-12">
          {/* Destinations */}
          {(activeTab === "all" || activeTab === "destinations") && results.destinations.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-brandDark">
                Destinations ({results.destinations.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.destinations.map((d) => (
                  <DestinationCard key={d.slug} destination={d} />
                ))}
              </div>
            </div>
          )}

          {/* Experiences */}
          {(activeTab === "all" || activeTab === "experiences") && results.experiences.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-brandDark">
                Experiences ({results.experiences.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.experiences.map((e) => (
                  <ExperienceCard key={e.slug} experience={e} />
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {(activeTab === "all" || activeTab === "events") && results.events.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-brandDark">
                Upcoming Events ({results.events.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.events.map((ev) => (
                  <EventCard key={ev.slug} event={ev} />
                ))}
              </div>
            </div>
          )}

          {/* Stories */}
          {(activeTab === "all" || activeTab === "stories") && results.stories.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-brandDark">
                Stories & Guides ({results.stories.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.stories.map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && query && results.total === 0 && (
        <EmptyState
          title={`No results found for "${query}"`}
          description="Try searching with other popular terms like 'Ella', 'Safari', 'Heritage', 'Beaches', or 'Tea'."
          actionHref="/destinations"
          actionLabel="Browse All Destinations"
        />
      )}
    </div>
  );
}
