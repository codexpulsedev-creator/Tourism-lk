"use client";

import React, { useState } from "react";
import { MessageSquare, Star, Trash2 } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: "1",
      userName: "Marcus Laurent",
      destination: "Ella",
      rating: 5,
      title: "Magical sunrise",
      comment: "Taking the train across Nine Arch Bridge was stunning!",
      date: "Feb 14, 2026",
    },
    {
      id: "2",
      userName: "David K.",
      destination: "Yala",
      rating: 5,
      title: "Saw 3 leopards!",
      comment: "Early morning safari with our naturalist guide was perfect.",
      date: "Feb 10, 2026",
    },
    {
      id: "3",
      userName: "Akira Tanaka",
      destination: "Sigiriya",
      rating: 5,
      title: "Ancient architectural masterpiece",
      comment: "Climbing Pidurangala for sunrise view over Lion rock.",
      date: "Jan 28, 2026",
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-brandDark">Traveler Reviews</h1>
        <p className="text-xs text-brandDark/60 mt-1">Moderate traveler comments and ratings submitted for destinations.</p>
      </div>

      <div className="rounded-3xl bg-white border border-brandDark/8 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs text-brandDark">
          <thead className="bg-brandBg text-brandDark/70 uppercase text-[10px] tracking-wider border-b border-brandDark/8">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Comment</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brandDark/5">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-brandBg/60 transition-colors">
                <td className="px-6 py-4 font-semibold">{rev.userName}</td>
                <td className="px-6 py-4 text-primary font-medium">{rev.destination}</td>
                <td className="px-6 py-4">
                  <RatingStars rating={rev.rating} size="sm" showValue={true} />
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <span className="font-bold block">{rev.title}</span>
                  <span className="text-brandDark/60 line-clamp-1">{rev.comment}</span>
                </td>
                <td className="px-6 py-4 text-brandDark/50">{rev.date}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 rounded-lg bg-brandBg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
