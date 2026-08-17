import React from "react";
import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";

export default function ReviewsSection() {
  const testimonials = [
    {
      name: "Marcus & Sophie Laurent",
      country: "France",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      destination: "Ella & Central Highlands",
      comment: "Taking the train across the Nine Arch Bridge and waking up to misty tea hills in Ella was the highlight of our 2-week journey across Asia. The warmth of the Sri Lankan people is unmatched!",
      rating: 5.0,
    },
    {
      name: "David K.",
      country: "Australia",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      destination: "Yala Safari & Mirissa",
      comment: "We saw three leopards on our morning safari in Yala and spent the next afternoon watching Blue Whales off the coast of Mirissa. A truly magical, biodiverse island paradise.",
      rating: 5.0,
    },
    {
      name: "Akira Tanaka",
      country: "Japan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      destination: "Sigiriya & Ancient Kingdom",
      comment: "Climbing Pidurangala Rock before dawn to watch the sunrise strike the ancient Sigiriya Lion Rock citadel is an image I will remember forever. Pure archaeological wonder.",
      rating: 5.0,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brandBg border-t border-brandDark/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Traveler Voices"
          title="Loved by Global Explorers"
          subtitle="Read honest reviews and memorable impressions shared by travelers who have experienced the magic of Sri Lanka."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-8 border border-brandDark/8 shadow-subtle flex flex-col justify-between space-y-6 relative hover:shadow-cardHover transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-secondary/30 absolute top-6 right-6" />

              <div className="space-y-4">
                <RatingStars rating={t.rating} size="sm" showValue={false} />
                <p className="text-sm text-brandDark/80 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-brandDark/8 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden relative bg-brandDark/10 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-brandDark leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-brandDark/60">
                    {t.country} • <span className="text-primary font-medium">{t.destination}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
