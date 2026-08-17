import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import DestinationCategory from "@/models/DestinationCategory";
import Destination from "@/models/Destination";
import Experience from "@/models/Experience";
import Event from "@/models/Event";
import Itinerary from "@/models/Itinerary";
import Accommodation from "@/models/Accommodation";
import TravelStory from "@/models/TravelStory";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";
import {
  seedCategories,
  seedDestinations,
  seedExperiences,
  seedEvents,
  seedItineraries,
  seedAccommodations,
  seedStories,
} from "@/data/seedData";

export async function POST() {
  try {
    const mongoose = await connectDB();
    if (!mongoose) {
      return NextResponse.json(
        { message: "MongoDB connection is in fallback mode (URI not provided or unreachable)." },
        { status: 200 }
      );
    }

    // Clean existing records
    await Promise.all([
      DestinationCategory.deleteMany({}),
      Destination.deleteMany({}),
      Experience.deleteMany({}),
      Event.deleteMany({}),
      Itinerary.deleteMany({}),
      Accommodation.deleteMany({}),
      TravelStory.deleteMany({}),
    ]);

    // Insert seeds
    await DestinationCategory.insertMany(seedCategories);
    await Destination.insertMany(seedDestinations);
    await Experience.insertMany(seedExperiences);
    await Event.insertMany(seedEvents);
    await Itinerary.insertMany(seedItineraries);
    await Accommodation.insertMany(seedAccommodations);
    await TravelStory.insertMany(seedStories);

    // Create default demo admin user if none exists
    const adminEmail = "admin@lankaexplore.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await hashPassword("admin123456");
      await User.create({
        name: "Admin LankaExplore",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        country: "Sri Lanka",
      });
    }

    return NextResponse.json({
      message: "Database seeded successfully with authentic Ceylon tourism data!",
      counts: {
        categories: seedCategories.length,
        destinations: seedDestinations.length,
        experiences: seedExperiences.length,
        events: seedEvents.length,
        itineraries: seedItineraries.length,
        accommodations: seedAccommodations.length,
        stories: seedStories.length,
      },
    });
  } catch (err: any) {
    console.error("Seed API error:", err);
    return NextResponse.json({ error: "Failed to seed database", details: err.message }, { status: 500 });
  }
}
