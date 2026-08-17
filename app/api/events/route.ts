import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { getEvents } from "@/lib/dataService";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  shortDescription: z.string().min(5),
  location: z.string().min(2),
  image: z.string().url(),
  category: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  featured: z.boolean().optional(),
  ticketInfo: z.string().optional(),
  venue: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.has("featured")
      ? searchParams.get("featured") === "true"
      : undefined;
    const limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    const events = await getEvents({ featured, limit });
    return NextResponse.json({ events });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    await connectDB();
    const slug = slugify(parsed.data.title);

    const newEvent = await Event.create({
      ...parsed.data,
      slug,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
    });

    return NextResponse.json({ message: "Event created", event: newEvent }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
