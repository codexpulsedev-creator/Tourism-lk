import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Experience from "@/models/Experience";
import { getExperiences } from "@/lib/dataService";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const experienceSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  image: z.string().url(),
  duration: z.string().optional(),
  difficulty: z.string().optional(),
  location: z.string().optional(),
  destinations: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  highlights: z.array(z.string()).optional(),
});

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

    const experiences = await getExperiences({ category, featured, limit });
    return NextResponse.json({ experiences });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const parsed = experienceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    await connectDB();
    const slug = slugify(parsed.data.title);

    const newExp = await Experience.create({
      ...parsed.data,
      slug,
      destinations: parsed.data.destinations || [],
      highlights: parsed.data.highlights || [],
    });

    return NextResponse.json({ message: "Experience created", experience: newExp }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
