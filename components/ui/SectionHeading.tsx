import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
  dark?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
  viewAllHref,
  viewAllText = "Explore All",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 ${
        centered ? "text-center items-center justify-center md:items-center" : ""
      }`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {badge && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              dark
                ? "bg-secondary/20 text-secondary border border-secondary/30"
                : "bg-primary/10 text-primary border border-primary/20"
            }`}
          >
            {badge}
          </span>
        )}
        <h2
          className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            dark ? "text-white" : "text-brandDark"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 text-base sm:text-lg leading-relaxed ${
              dark ? "text-gray-300" : "text-brandDark/70"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && !centered && (
        <Link
          href={viewAllHref}
          className={`inline-flex items-center gap-2 font-semibold text-sm transition-colors group flex-shrink-0 ${
            dark ? "text-secondary hover:text-white" : "text-primary hover:text-primary-dark"
          }`}
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
