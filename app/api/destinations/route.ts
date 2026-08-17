import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { getDestinations } from "@/lib/dataService";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const destinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  province: z.string().min(2, "Province is required"),
  district: z.string().min(2, "District is required"),
  category: z.string().min(2, "Category is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  description: z.string().min(20, "Detailed description is required"),
  heroImage: z.string().url("Valid hero image URL is required"),
  images: z.array(z.string()).optional(),
  latitude: z.number(),
  longitude: z.number(),
  bestTimeToVisit: z.string().optional(),
  weatherSummary: z.string().optional(),
  attractions: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const province = searchParams.get("province") || undefined;
    const district = searchParams.get("district") || undefined;
    const search = searchParams.get("search") || undefined;
    const featured = searchParams.has("featured")
      ? searchParams.get("featured") === "true"
      : undefined;
    const limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    const destinations = await getDestinations({
      category,
      province,
      district,
      search,
      featured,
      limit,
    });

    return NextResponse.json({ destinations });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const parsed = destinationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    await connectDB();
    const slug = slugify(parsed.data.name);

    const existing = await Destination.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: "A destination with this name or slug already exists." }, { status: 409 });
    }

    const newDest = await Destination.create({
      ...parsed.data,
      slug,
      images: parsed.data.images || [parsed.data.heroImage],
      attractions: parsed.data.attractions || [],
      activities: parsed.data.activities || [],
    });

    return NextResponse.json({ message: "Destination created successfully", destination: newDest }, { status: 201 });
  } catch (err: any) {
    console.error("Create destination error:", err);
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}
