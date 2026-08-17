"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, SlidersHorizontal, RotateCcw, MapPin } from "lucide-react";
import DestinationCard from "@/components/ui/DestinationCard";
import EmptyState from "@/components/ui/EmptyState";

interface DestinationsViewProps {
  initialDestinations: any[];
}

export default function DestinationsView({ initialDestinations }: DestinationsViewProps) {
  const searchParams = useSearchParams();
  const defaultCat = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(defaultCat);
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "popular">("rating");

  const categories = ["All", "Beaches", "Mountains", "Heritage", "Wildlife", "Nature", "Cities"];
  const provinces = [
    "All",
    "Central",
    "Southern",
    "Eastern",
    "Uva",
    "North Central",
    "Western",
    "Northern",
    "North Western",
    "Sabaragamuwa",
  ];

  const filteredDestinations = useMemo(() => {
    return initialDestinations
      .filter((d) => {
        const matchesCategory =
          selectedCategory === "All" ||
          d.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesProvince =
          selectedProvince === "All" ||
          d.province.toLowerCase().includes(selectedProvince.toLowerCase());

        const matchesSearch =
          !search ||
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.district.toLowerCase().includes(search.toLowerCase()) ||
          d.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
          d.tags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));

        return matchesCategory && matchesProvince && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "popular") return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        return 0;
      });
  }, [initialDestinations, search, selectedCategory, selectedProvince, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedProvince("All");
    setSortBy("rating");
  };

  const isFiltered = search !== "" || selectedCategory !== "All" || selectedProvince !== "All";

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="rounded-2xl bg-white border border-brandDark/8 p-4 sm:p-6 shadow-subtle space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-brandDark/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, district, activities or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-brandBg border border-brandDark/10 text-brandDark placeholder-brandDark/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-brandDark/50 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-brandBg text-brandDark/70 hover:bg-brandDark/10 hover:text-brandDark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bottom controls: Province + Sort + Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-brandDark/8 text-xs font-medium">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-brandDark/60">Province:</span>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-brandBg text-brandDark px-2.5 py-1.5 rounded-lg border border-brandDark/10 focus:outline-none cursor-pointer"
              >
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov} {prov !== "All" && "Province"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
              <span className="text-brandDark/60">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-brandBg text-brandDark px-2.5 py-1.5 rounded-lg border border-brandDark/10 focus:outline-none cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Reviewed</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-brandDark/50">
              Showing <strong>{filteredDestinations.length}</strong> destination
              {filteredDestinations.length === 1 ? "" : "s"}
            </span>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.slug || dest._id} destination={dest} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No destinations match your filters"
          description="Try clearing some of your search terms or filters to discover other regions of Sri Lanka."
          actionLabel="Reset All Filters"
          actionHref="#"
        />
      )}
    </div>
  );
}
