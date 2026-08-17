import React from "react";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search keywords or filter criteria to discover destinations.",
  actionHref = "/destinations",
  actionLabel = "Explore All Destinations",
  icon,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl bg-white border border-brandDark/8 p-12 text-center max-w-lg mx-auto shadow-subtle my-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
        {icon || <Compass className="w-8 h-8" />}
      </div>
      <h3 className="font-serif text-2xl font-bold text-brandDark mb-2">{title}</h3>
      <p className="text-sm text-brandDark/70 mb-6 leading-relaxed">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>{actionLabel}</span>
        </Link>
      )}
    </div>
  );
}
