import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Tent, Hotel, Compass, ArrowRight } from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";
import { getAccommodations } from "@/lib/dataService";
import AccommodationCard from "@/components/ui/AccommodationCard";

export const metadata: Metadata = {
  title: "Accommodation & Places to Stay in Sri Lanka — LankaExplore",
  description:
    "Explore luxury boutique hotels, tea planter bungalows, coastal beach resorts, and official SLTDA approved camping sites across Sri Lanka.",
};

export default async function AccommodationPage() {
  const accommodations: any[] = await getAccommodations();

  return (
    <div className="pb-24 space-y-16">
      {/* Page Header Banner matching srilanka.travel */}
      <PageHeaderBanner
        title="Places to Stay & Accommodation"
        subtitle="Discover luxury colonial tea estates, Geoffrey Bawa beachfront resorts, and official camping sites."
        category="REGISTERED SRI LANKA ACCOMMODATION"
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "Accommodation" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/camping-sites"
            className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white shadow-xl hover:shadow-2xl transition-all group flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Tent className="w-3.5 h-3.5" />
                <span>Official Directory</span>
              </div>
              <h3 className="font-serif font-bold text-2xl group-hover:text-secondary transition-colors">
                Camping Sites & Glamping
              </h3>
              <p className="text-xs text-gray-300 max-w-md leading-relaxed">
                Explore SLTDA registered safari camps in Yala, Udawalawe, Wilpattu, and Knuckles.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
          </Link>

          <Link
            href="/travel-agents"
            className="p-8 rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 text-white shadow-xl hover:shadow-2xl transition-all group flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-secondary text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Certified Operators</span>
              </div>
              <h3 className="font-serif font-bold text-2xl group-hover:text-secondary transition-colors">
                Find a Travel Specialist
              </h3>
              <p className="text-xs text-gray-300 max-w-md leading-relaxed">
                Connect with verified Sri Lankan tour operators for custom itinerary booking.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Boutique Stays & Eco Lodges Grid */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">
              Curated Stays
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandDark">
              Boutique Hotels & Heritage Bungalows
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accommodations.map((hotel: any) => (
              <AccommodationCard key={hotel.slug || hotel._id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
