import { NextResponse } from "next/server";
import { getDestinations, getExperiences, getEvents, getTravelStories } from "@/lib/dataService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").trim().toLowerCase();

    if (!query) {
      return NextResponse.json({
        destinations: [],
        experiences: [],
        events: [],
        stories: [],
        total: 0,
      });
    }

    const [allDests, allExp, allEvents, allStories] = await Promise.all([
      getDestinations(),
      getExperiences(),
      getEvents(),
      getTravelStories(),
    ]);

    const destinations = (allDests as any[]).filter(
      (d: any) =>
        d.name.toLowerCase().includes(query) ||
        d.shortDescription.toLowerCase().includes(query) ||
        d.district.toLowerCase().includes(query) ||
        d.province.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query) ||
        d.tags?.some((t: string) => t.toLowerCase().includes(query))
    );

    const experiences = (allExp as any[]).filter(
      (e: any) =>
        e.title.toLowerCase().includes(query) ||
        e.shortDescription.toLowerCase().includes(query) ||
        e.category.toLowerCase().includes(query) ||
        e.location?.toLowerCase().includes(query)
    );

    const events = (allEvents as any[]).filter(
      (ev: any) =>
        ev.title.toLowerCase().includes(query) ||
        ev.shortDescription.toLowerCase().includes(query) ||
        ev.location.toLowerCase().includes(query) ||
        ev.category.toLowerCase().includes(query)
    );

    const stories = (allStories as any[]).filter(
      (s: any) =>
        s.title.toLowerCase().includes(query) ||
        s.excerpt.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );

    const total = destinations.length + experiences.length + events.length + stories.length;

    return NextResponse.json({
      query,
      destinations,
      experiences,
      events,
      stories,
      total,
    });
  } catch (err) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
