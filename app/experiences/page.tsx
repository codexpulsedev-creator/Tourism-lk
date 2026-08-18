import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import PageHeaderBanner from "@/components/ui/PageHeaderBanner";
import { getExperiences } from "@/lib/dataService";
import ExperienceCard from "@/components/ui/ExperienceCard";

export const metadata: Metadata = {
  title: "What to Do & Experiences in Sri Lanka — LankaExplore",
  description:
    "Discover world-class surfing, leopard safaris, scenic blue mountain train rides, sacred pilgrimage, gem exploration, wellness retreats, and culinary journeys in Sri Lanka.",
};

const whatToDoCategories = [
  {
    title: "Things to See",
    tagline: "Iconic landmarks & hidden gems.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", // Blue train
    badge: "Nature",
    badgeColor: "bg-blue-600",
    href: "/destinations",
  },
  {
    title: "Pilgrimage & Sacred Shrines",
    tagline: "Sacred kovils, temples, and spiritual processions.",
    image: "/images/culture/hindu-kovil-chariot.jpg", // High-res Nallur Kovil chariot procession
    badge: "Culture",
    badgeColor: "bg-purple-600",
    href: "/experiences/sacred-kandy-cultural-pageantry",
  },
  {
    title: "Ayurveda & Healing",
    tagline: "Ancient healing for body, spirit, and mind.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", // Shirodhara oil pour
    badge: "Wellness",
    badgeColor: "bg-emerald-600",
    href: "/experiences/ayurveda-wellness-retreat-bentota",
  },
  {
    title: "Spa & Wellness",
    tagline: "Rejuvenate at world-class holistic sanctuaries.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop", // Luxury spa therapy
    badge: "Wellness",
    badgeColor: "bg-emerald-600",
    href: "/experiences/ayurveda-wellness-retreat-bentota",
  },
  {
    title: "Eco Tourism & Wildlife",
    tagline: "Sustainable safaris in untouched wilderness.",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=800&auto=format&fit=crop", // Safari traveler
    badge: "Nature",
    badgeColor: "bg-blue-600",
    href: "/experiences/yala-national-park-safari",
  },
  {
    title: "Masks & Folk Traditions",
    tagline: "Ambalangoda Raksha masks & traditional dance.",
    image: "/images/culture/raksha-mask-dancers.jpg", // Authentic Raksha mask dancers in street festival
    badge: "Culture",
    badgeColor: "bg-purple-600",
    href: "/destinations",
  },
  {
    title: "Night Life & Fire Pageants",
    tagline: "Southern fire rituals, drumming & beach clubs.",
    image: "/images/culture/ritual-demon-dance.jpg", // Spectacular Thovil fire ritual demon dancer
    badge: "Culture",
    badgeColor: "bg-purple-600",
    href: "/destinations/mirissa",
  },
  {
    title: "Buy Gemstone",
    tagline: "Island of gems: sapphires and treasures.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop", // Blue sapphire gemstones
    badge: "Culture",
    badgeColor: "bg-purple-600",
    href: "/destinations",
  },
  {
    title: "Dining & Seafood",
    tagline: "Flavours of authentic Sri Lankan cuisine.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop", // Ceylon curries
    badge: "Culture",
    badgeColor: "bg-purple-600",
    href: "/experiences/ceylon-tea-trails-tasting-experience",
  },
  {
    title: "Tourist Souvenir Shops",
    tagline: "Curated wood carvings, fridge magnets & crafts.",
    image: "/images/culture/souvenirs-handicrafts.jpg", // Handcrafted wooden magnets & souvenirs
    badge: "Culture",
    badgeColor: "bg-purple-600",
    href: "/destinations",
  },
  {
    title: "Spice Gardens",
    tagline: "Fragrant trails of cinnamon and cardamom.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop", // Spices
    badge: "Nature",
    badgeColor: "bg-blue-600",
    href: "/experiences",
  },
  {
    title: "Camping Sites & Glamping",
    tagline: "Official registered safari camp sites.",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop", // Mountain tents
    badge: "Nature",
    badgeColor: "bg-blue-600",
    href: "/camping-sites",
  },
];

export default async function ExperiencesPage() {
  const experiences: any[] = await getExperiences();

  return (
    <div className="pb-24 space-y-16">
      {/* Page Header Banner matching srilanka.travel */}
      <PageHeaderBanner
        title="What to Do in Sri Lanka"
        subtitle="Discover timeless cultural journeys, wild nature safaris, sacred pilgrimage, and coastal thrills."
        category="EXPERIENCES & ACTIVITIES"
        backgroundImage="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=85&w=2000&auto=format&fit=crop"
        breadcrumbs={[{ label: "What to Do" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Category Cards Mosaic Grid matching Screenshot 4 */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                Explore Categories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandDark">
                Sensory Wonders & Activities
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {whatToDoCategories.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-brandDark shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="relative z-10 self-end">
                  <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-1.5">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {item.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-secondary transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Curated Experiences List */}
        <div className="space-y-8 pt-8 border-t border-brandDark/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">
              Featured Tours & Expeditions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandDark">
              Top Ranked Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp: any) => (
              <ExperienceCard key={exp.slug || exp._id} experience={exp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
