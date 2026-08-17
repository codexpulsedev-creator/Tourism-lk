import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Destination from "@/models/Destination";
import { getSessionUser } from "@/lib/auth";

const reviewSchema = z.object({
  destinationId: z.string().optional(),
  destinationSlug: z.string().min(1),
  rating: z.number().min(1).max(5),
  title: z.string().min(3).max(100),
  comment: z.string().min(10).max(2000),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const destinationSlug = searchParams.get("destinationSlug");
    if (!destinationSlug) {
      return NextResponse.json({ error: "destinationSlug is required" }, { status: 400 });
    }

    await connectDB();
    const reviews = await Review.find({ destinationSlug }).sort({ createdAt: -1 });
    return NextResponse.json({ reviews });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to submit a review." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    await connectDB();
    const dest = await Destination.findOne({ slug: parsed.data.destinationSlug });

    const review = await Review.create({
      user: user.userId,
      userName: user.name,
      destination: dest?._id || user.userId,
      destinationSlug: parsed.data.destinationSlug,
      rating: parsed.data.rating,
      title: parsed.data.title,
      comment: parsed.data.comment,
    });

    // Update destination rating
    if (dest) {
      const allReviews = await Review.find({ destinationSlug: parsed.data.destinationSlug });
      const avg = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
      dest.rating = Math.round(avg * 10) / 10;
      dest.reviewsCount = allReviews.length;
      await dest.save();
    }

    return NextResponse.json({ message: "Review posted successfully!", review }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to post review" }, { status: 500 });
  }
}
