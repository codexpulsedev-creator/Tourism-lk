import { NextResponse } from "next/server";
import { getAccommodations } from "@/lib/dataService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.has("featured")
      ? searchParams.get("featured") === "true"
      : undefined;
    const limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    const accommodations = await getAccommodations({ category, featured, limit });
    return NextResponse.json({ accommodations });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch accommodation" }, { status: 500 });
  }
}
