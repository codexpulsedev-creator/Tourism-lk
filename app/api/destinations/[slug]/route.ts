import { NextResponse } from "next/server";
import { getDestinationBySlug, getExperiences, getTravelStories } from "@/lib/dataService";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const destination = await getDestinationBySlug(slug);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    // Fetch related reviews from DB if available
    let reviews: any[] = [];
    try {
      const mongoose = await connectDB();
      if (mongoose) {
        reviews = await Review.find({ destinationSlug: slug }).sort({ createdAt: -1 }).lean();
      }
    } catch (e) {}

    // Fetch related experiences & stories
    const allExp: any[] = await getExperiences();
    const relatedExperiences = allExp.filter((e: any) =>
      e.destinations?.some((d: string) => d.toLowerCase() === destination.name.toLowerCase())
    );

    const allStories: any[] = await getTravelStories();
    const relatedStories = allStories.filter((s: any) =>
      s.tags?.some((t: string) => t.toLowerCase().includes(destination.name.toLowerCase()))
    );

    return NextResponse.json({
      destination,
      reviews,
      relatedExperiences: relatedExperiences.slice(0, 3),
      relatedStories: relatedStories.slice(0, 2),
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch destination details" }, { status: 500 });
  }
}
