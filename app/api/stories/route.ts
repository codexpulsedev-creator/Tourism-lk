import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import TravelStory from "@/models/TravelStory";
import { getTravelStories } from "@/lib/dataService";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const storySchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().url(),
  author: z.object({
    name: z.string().min(2),
    avatar: z.string().optional(),
    bio: z.string().optional(),
  }),
  category: z.string().min(2),
  tags: z.array(z.string()).optional(),
  readingTime: z.string().optional(),
  featured: z.boolean().optional(),
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

    const stories = await getTravelStories({ featured, limit });
    return NextResponse.json({ stories });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const parsed = storySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    await connectDB();
    const slug = slugify(parsed.data.title);

    const newStory = await TravelStory.create({
      ...parsed.data,
      slug,
      tags: parsed.data.tags || [],
    });

    return NextResponse.json({ message: "Story created", story: newStory }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}
