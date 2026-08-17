import { NextResponse } from "next/server";
import { getTravelStoryBySlug, getTravelStories } from "@/lib/dataService";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const story = await getTravelStoryBySlug(slug);

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const allStories: any[] = await getTravelStories();
    const relatedStories = allStories.filter((s: any) => s.slug !== slug).slice(0, 3);

    return NextResponse.json({ story, relatedStories });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}
