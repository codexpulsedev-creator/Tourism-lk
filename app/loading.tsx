import React from "react";
import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-subtle animate-bounce">
        <Compass className="w-8 h-8 animate-spin" />
      </div>
      <p className="font-serif text-lg font-bold text-brandDark">
        Loading Lanka<span className="text-secondary">Explore</span>...
      </p>
    </div>
  );
}
