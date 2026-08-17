import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] pt-28 pb-16 px-4 flex items-center justify-center text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center shadow-subtle">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Error 404
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandDark">
            Page Off the Beaten Path
          </h1>
          <p className="text-sm text-brandDark/70 leading-relaxed">
            The page or destination you are searching for might have moved or is not charted on our Ceylon map.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-brandDark/15 hover:bg-brandDark/5 text-brandDark text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Compass className="w-4 h-4 text-secondary" />
            <span>Explore Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
