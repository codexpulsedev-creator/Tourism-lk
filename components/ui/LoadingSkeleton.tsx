import React from "react";

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-brandDark/8 overflow-hidden animate-pulse flex flex-col h-full">
      <div className="h-56 bg-brandDark/10 w-full" />
      <div className="p-5 space-y-3 flex-1">
        <div className="h-5 bg-brandDark/10 rounded w-2/3" />
        <div className="h-4 bg-brandDark/5 rounded w-full" />
        <div className="h-4 bg-brandDark/5 rounded w-4/5" />
        <div className="pt-4 border-t border-brandDark/5 flex justify-between">
          <div className="h-4 bg-brandDark/10 rounded w-1/4" />
          <div className="h-4 bg-brandDark/10 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
