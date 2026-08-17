"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface FavoriteButtonProps {
  destinationId?: string;
  destinationSlug: string;
  className?: string;
}

export default function FavoriteButton({
  destinationId = "",
  destinationSlug,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useAuth();
  const [animating, setAnimating] = useState(false);

  const favorited = isFavorite(destinationSlug) || (destinationId && isFavorite(destinationId));

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    await toggleFavorite(destinationId, destinationSlug);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
        favorited
          ? "bg-red-500 text-white hover:bg-red-600 scale-105"
          : "bg-white/80 text-brandDark/70 hover:bg-white hover:text-red-500 hover:scale-105"
      } ${animating ? "scale-125" : ""} ${className}`}
    >
      <Heart className={`w-4 h-4 transition-transform ${favorited ? "fill-current" : ""}`} />
    </button>
  );
}
