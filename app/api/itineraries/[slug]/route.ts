import { NextResponse } from "next/server";
import { getItineraryBySlug } from "@/lib/dataService";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const itinerary = await getItineraryBySlug(slug);

    if (!itinerary) {
      return NextResponse.json({ error: "Itinerary not found" }, { status: 404 });
    }

    return NextResponse.json({ itinerary });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch itinerary" }, { status: 500 });
  }
}
