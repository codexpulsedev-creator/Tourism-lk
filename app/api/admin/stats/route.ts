import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import Experience from "@/models/Experience";
import Event from "@/models/Event";
import TravelStory from "@/models/TravelStory";
import Accommodation from "@/models/Accommodation";
import Review from "@/models/Review";
import User from "@/models/User";
import ContactMessage from "@/models/ContactMessage";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { requireAdminSession } from "@/lib/auth";
import {
  seedDestinations,
  seedExperiences,
  seedEvents,
  seedAccommodations,
  seedStories,
} from "@/data/seedData";

export async function GET() {
  try {
    const admin = await requireAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const mongoose = await connectDB();
    if (mongoose) {
      const [
        destinations,
        experiences,
        events,
        stories,
        accommodations,
        users,
        reviews,
        contacts,
        subscribers,
      ] = await Promise.all([
        Destination.countDocuments(),
        Experience.countDocuments(),
        Event.countDocuments(),
        TravelStory.countDocuments(),
        Accommodation.countDocuments(),
        User.countDocuments(),
        Review.countDocuments(),
        ContactMessage.countDocuments(),
        NewsletterSubscriber.countDocuments(),
      ]);

      const recentUsers = await User.find().select("-password").sort({ createdAt: -1 }).limit(5);
      const recentReviews = await Review.find().sort({ createdAt: -1 }).limit(5);

      return NextResponse.json({
        stats: {
          destinations: destinations || seedDestinations.length,
          experiences: experiences || seedExperiences.length,
          events: events || seedEvents.length,
          stories: stories || seedStories.length,
          accommodations: accommodations || seedAccommodations.length,
          users: users || 1,
          reviews: reviews || 24,
          contacts,
          subscribers,
        },
        recentUsers,
        recentReviews,
      });
    }

    return NextResponse.json({
      stats: {
        destinations: seedDestinations.length,
        experiences: seedExperiences.length,
        events: seedEvents.length,
        stories: seedStories.length,
        accommodations: seedAccommodations.length,
        users: 1,
        reviews: 24,
        contacts: 0,
        subscribers: 0,
      },
      recentUsers: [],
      recentReviews: [],
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}
