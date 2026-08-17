import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TravelStory from "@/models/TravelStory";
import { requireAdminSession } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdminSession();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const updated = await TravelStory.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Story not found" }, { status: 404 });

    return NextResponse.json({ message: "Story updated", story: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdminSession();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { id } = await params;
    await connectDB();
    const deleted = await TravelStory.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Story not found" }, { status: 404 });

    return NextResponse.json({ message: "Story deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
