"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home, Printer } from "lucide-react";

interface PageHeaderBannerProps {
  title: string;
  subtitle?: string;
  category?: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundImage?: string;
}

export default function PageHeaderBanner({
  title,
  subtitle = "Discover Sri Lanka — One Island, Many Worlds",
  category,
  breadcrumbs,
  backgroundImage = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=85&w=2000&auto=format&fit=crop",
}: PageHeaderBannerProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full">
      {/* Hero Panoramic Banner matching srilanka.travel */}
      <div className="relative min-h-[280px] sm:min-h-[340px] md:min-h-[380px] w-full overflow-hidden bg-brandDark flex items-end">
        {/* Background Image with Cultural Art Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brandDark/95 via-brandDark/75 to-brandDark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-black/30" />
        </div>

        {/* Floating Content Card in Banner */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 pt-28">
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl space-y-3">
            {category && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-secondary block">
                {category}
              </span>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>
            <div className="h-1 w-14 bg-primary rounded-full" />
            <p className="text-xs sm:text-sm md:text-base text-gray-200 font-sans pt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb Bar underneath */}
      <div className="bg-brandBg border-b border-brandDark/8 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center space-x-2 text-xs text-brandDark/60 font-medium">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {breadcrumbs ? (
              breadcrumbs.map((b, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-brandDark/30" />
                  {b.href ? (
                    <Link href={b.href} className="hover:text-primary transition-colors">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-primary font-bold">{b.label}</span>
                  )}
                </React.Fragment>
              ))
            ) : (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-brandDark/30" />
                <span className="text-primary font-bold">{title}</span>
              </>
            )}
          </nav>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brandDark/15 bg-white text-xs font-semibold text-brandDark/75 hover:text-primary hover:border-primary transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
