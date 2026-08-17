import { NextResponse } from "next/server";
import { getItineraries } from "@/lib/dataService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.has("featured")
      ? searchParams.get("featured") === "true"
      : undefined;
    const limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    const itineraries = await getItineraries({ featured, limit });
    return NextResponse.json({ itineraries });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch itineraries" }, { status: 500 });
  }
}
