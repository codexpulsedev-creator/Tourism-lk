import { NextResponse } from "next/server";
import { getExperienceBySlug, getDestinations } from "@/lib/dataService";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const experience = await getExperienceBySlug(slug);

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    const allDests: any[] = await getDestinations();
    const relatedDestinations = allDests.filter((d: any) =>
      experience.destinations?.some((destName: string) =>
        d.name.toLowerCase().includes(destName.toLowerCase())
      )
    );

    return NextResponse.json({
      experience,
      relatedDestinations,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}
