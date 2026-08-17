"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RatingStars from "@/components/ui/RatingStars";
import { formatDate } from "@/lib/utils";

interface ReviewItem {
  _id?: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string | Date;
}

interface DestinationReviewFormProps {
  destinationSlug: string;
  initialReviews: ReviewItem[];
}

export default function DestinationReviewForm({
  destinationSlug,
  initialReviews = [],
}: DestinationReviewFormProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationSlug,
          rating,
          title,
          comment,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg("Thank you! Your review has been published.");
        setReviews([data.review, ...reviews]);
        setTitle("");
        setComment("");
        setRating(5);
      } else {
        setStatus("error");
        setMsg(data.error || "Failed to submit review");
      }
    } catch (err) {
      setStatus("error");
      setMsg("Connection error. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Submission Form */}
      <div className="rounded-3xl bg-white border border-brandDark/8 p-6 sm:p-8 shadow-subtle">
        <h3 className="font-serif text-2xl font-bold text-brandDark mb-2 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <span>Leave a Review</span>
        </h3>
        <p className="text-xs sm:text-sm text-brandDark/70 mb-6">
          Share your authentic travel experience to help future travelers discover Sri Lanka.
        </p>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Stars Input */}
            <div>
              <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-brandDark ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-1">
                Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unforgettable sunrise over the tea hills!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-sm text-brandDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-brandDark/70 uppercase tracking-wider mb-1">
                Detailed Feedback
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what you enjoyed, best times to visit, or helpful travel tips..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brandBg border border-brandDark/10 text-sm text-brandDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{status === "loading" ? "Submitting..." : "Post Review"}</span>
            </button>

            {status === "success" && (
              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-4 h-4" />
                {msg}
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                <AlertCircle className="w-4 h-4" />
                {msg}
              </p>
            )}
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-brandBg border border-brandDark/10 text-center space-y-3">
            <p className="text-sm text-brandDark/80">
              Sign in to share your review and photos for this destination.
            </p>
            <Link
              href="/login"
              className="inline-block px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all"
            >
              Sign In to Review
            </Link>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="font-serif text-xl font-bold text-brandDark">
          Traveler Reviews ({reviews.length})
        </h4>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div
                key={rev._id || idx}
                className="rounded-2xl bg-white border border-brandDark/8 p-6 shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {rev.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-sm text-brandDark">
                        {rev.userName}
                      </h5>
                      <span className="text-[11px] text-brandDark/40">
                        {formatDate(rev.createdAt || new Date())}
                      </span>
                    </div>
                  </div>

                  <RatingStars rating={rev.rating} size="sm" showValue={true} />
                </div>

                <div>
                  <h6 className="font-bold text-sm text-brandDark mb-1">{rev.title}</h6>
                  <p className="text-xs sm:text-sm text-brandDark/70 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-brandDark/8 text-center text-xs text-brandDark/60">
            No reviews yet. Be the first traveler to write a review!
          </div>
        )}
      </div>
    </div>
  );
}
