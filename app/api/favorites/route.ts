import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Favorite from "@/models/Favorite";
import Destination from "@/models/Destination";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }

    await connectDB();
    const favorites = await Favorite.find({ user: user.userId })
      .populate("destination")
      .sort({ createdAt: -1 });

    return NextResponse.json({ favorites });
  } catch (err) {
    return NextResponse.json({ favorites: [] }, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destinationId, destinationSlug } = await req.json();
    await connectDB();

    let destId = destinationId;
    if (!destId && destinationSlug) {
      const dest = await Destination.findOne({ slug: destinationSlug });
      if (dest) destId = dest._id;
    }

    if (!destId) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const fav = await Favorite.findOneAndUpdate(
      { user: user.userId, destination: destId },
      { user: user.userId, destination: destId, destinationSlug },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Added to favorites", favorite: fav });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destinationId, destinationSlug } = await req.json();
    await connectDB();

    await Favorite.deleteMany({
      user: user.userId,
      $or: [{ destination: destinationId }, { destinationSlug }],
    });

    return NextResponse.json({ message: "Removed from favorites" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}
