import connectDB from "./db";
import Destination from "@/models/Destination";
import DestinationCategory from "@/models/DestinationCategory";
import Experience from "@/models/Experience";
import Event from "@/models/Event";
import Itinerary from "@/models/Itinerary";
import Accommodation from "@/models/Accommodation";
import TravelStory from "@/models/TravelStory";
import Review from "@/models/Review";
import User from "@/models/User";
import {
  seedCategories,
  seedDestinations,
  seedExperiences,
  seedEvents,
  seedItineraries,
  seedAccommodations,
  seedStories,
} from "@/data/seedData";

export async function ensureSeeded() {
  const mongooseInstance = await connectDB();
  if (!mongooseInstance) return;

  try {
    const destCount = await Destination.countDocuments();
    if (destCount === 0) {
      console.log("🌱 Auto-seeding initial demonstration data...");
      await DestinationCategory.insertMany(seedCategories);
      await Destination.insertMany(seedDestinations);
      await Experience.insertMany(seedExperiences);
      await Event.insertMany(seedEvents);
      await Itinerary.insertMany(seedItineraries);
      await Accommodation.insertMany(seedAccommodations);
      await TravelStory.insertMany(seedStories);
      console.log("✅ Auto-seeding complete!");
    } else {
      // Sync destination images, heroImage and details from seedDestinations
      for (const dest of seedDestinations) {
        await Destination.findOneAndUpdate(
          { slug: dest.slug },
          { $set: { heroImage: dest.heroImage, images: dest.images, description: dest.description, shortDescription: dest.shortDescription } }
        );
      }
      // Remove deleted destinations (e.g. pinnawala, galle) from database if present
      const validSlugs = seedDestinations.map((d) => d.slug);
      await Destination.deleteMany({ slug: { $nin: validSlugs } });
    }
  } catch (err) {
    console.warn("Auto-seed error:", err);
  }
}

export async function getDestinations(query: {
  category?: string;
  province?: string;
  district?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
} = {}) {
  const mongooseInstance = await connectDB();

  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const filter: any = {};
      if (query.category && query.category !== "All") filter.category = new RegExp(query.category, "i");
      if (query.province && query.province !== "All") filter.province = new RegExp(query.province, "i");
      if (query.district && query.district !== "All") filter.district = new RegExp(query.district, "i");
      if (query.featured !== undefined) filter.featured = query.featured;
      if (query.search) {
        filter.$or = [
          { name: new RegExp(query.search, "i") },
          { shortDescription: new RegExp(query.search, "i") },
          { district: new RegExp(query.search, "i") },
          { province: new RegExp(query.search, "i") },
          { tags: new RegExp(query.search, "i") },
        ];
      }

      let q = Destination.find(filter).sort({ rating: -1, createdAt: -1 });
      if (query.limit) q = q.limit(query.limit);
      const docs = await q.lean();
      if (docs && docs.length > 0) return JSON.parse(JSON.stringify(docs));
    } catch (e) {
      console.warn("DB fetch error for destinations, fallback to seed:", e);
    }
  }

  // Fallback to static seed data
  let list = [...seedDestinations];
  if (query.category && query.category !== "All") {
    list = list.filter((d) => d.category.toLowerCase() === query.category!.toLowerCase());
  }
  if (query.province && query.province !== "All") {
    list = list.filter((d) => d.province.toLowerCase().includes(query.province!.toLowerCase()));
  }
  if (query.district && query.district !== "All") {
    list = list.filter((d) => d.district.toLowerCase().includes(query.district!.toLowerCase()));
  }
  if (query.featured !== undefined) {
    list = list.filter((d) => d.featured === query.featured);
  }
  if (query.search) {
    const s = query.search.toLowerCase();
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.shortDescription.toLowerCase().includes(s) ||
        d.district.toLowerCase().includes(s) ||
        d.province.toLowerCase().includes(s) ||
        d.tags.some((t) => t.toLowerCase().includes(s))
    );
  }
  if (query.limit) {
    list = list.slice(0, query.limit);
  }
  return list;
}

export async function getDestinationBySlug(slug: string) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const doc = await Destination.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch (e) {
      console.warn("DB fetch error for destination slug:", e);
    }
  }
  return seedDestinations.find((d) => d.slug === slug) || null;
}

export async function getExperiences(query: { category?: string; featured?: boolean; limit?: number } = {}) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const filter: any = {};
      if (query.category && query.category !== "All") filter.category = new RegExp(query.category, "i");
      if (query.featured !== undefined) filter.featured = query.featured;
      let q = Experience.find(filter);
      if (query.limit) q = q.limit(query.limit);
      const docs = await q.lean();
      if (docs && docs.length > 0) return JSON.parse(JSON.stringify(docs));
    } catch (e) {}
  }

  let list = [...seedExperiences];
  if (query.category && query.category !== "All") {
    list = list.filter((e) => e.category.toLowerCase() === query.category!.toLowerCase());
  }
  if (query.featured !== undefined) {
    list = list.filter((e) => e.featured === query.featured);
  }
  if (query.limit) list = list.slice(0, query.limit);
  return list;
}

export async function getExperienceBySlug(slug: string) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const doc = await Experience.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch (e) {}
  }
  return seedExperiences.find((e) => e.slug === slug) || null;
}

export async function getEvents(query: { featured?: boolean; limit?: number } = {}) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const filter: any = {};
      if (query.featured !== undefined) filter.featured = query.featured;
      let q = Event.find(filter).sort({ startDate: 1 });
      if (query.limit) q = q.limit(query.limit);
      const docs = await q.lean();
      if (docs && docs.length > 0) return JSON.parse(JSON.stringify(docs));
    } catch (e) {}
  }

  let list = [...seedEvents];
  if (query.featured !== undefined) {
    list = list.filter((e) => e.featured === query.featured);
  }
  if (query.limit) list = list.slice(0, query.limit);
  return list;
}

export async function getEventBySlug(slug: string) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const doc = await Event.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch (e) {}
  }
  return seedEvents.find((e) => e.slug === slug) || null;
}

export async function getItineraries(query: { featured?: boolean; limit?: number } = {}) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const filter: any = {};
      if (query.featured !== undefined) filter.featured = query.featured;
      let q = Itinerary.find(filter);
      if (query.limit) q = q.limit(query.limit);
      const docs = await q.lean();
      if (docs && docs.length > 0) return JSON.parse(JSON.stringify(docs));
    } catch (e) {}
  }

  let list = [...seedItineraries];
  if (query.featured !== undefined) {
    list = list.filter((it) => it.featured === query.featured);
  }
  if (query.limit) list = list.slice(0, query.limit);
  return list;
}

export async function getItineraryBySlug(slug: string) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const doc = await Itinerary.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch (e) {}
  }
  return seedItineraries.find((it) => it.slug === slug) || null;
}

export async function getAccommodations(query: { category?: string; featured?: boolean; limit?: number } = {}) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const filter: any = {};
      if (query.category && query.category !== "All") filter.category = query.category;
      if (query.featured !== undefined) filter.featured = query.featured;
      let q = Accommodation.find(filter);
      if (query.limit) q = q.limit(query.limit);
      const docs = await q.lean();
      if (docs && docs.length > 0) return JSON.parse(JSON.stringify(docs));
    } catch (e) {}
  }

  let list = [...seedAccommodations];
  if (query.category && query.category !== "All") {
    list = list.filter((a) => a.category.toLowerCase() === query.category!.toLowerCase());
  }
  if (query.featured !== undefined) {
    list = list.filter((a) => a.featured === query.featured);
  }
  if (query.limit) list = list.slice(0, query.limit);
  return list;
}

export async function getTravelStories(query: { featured?: boolean; limit?: number } = {}) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const filter: any = {};
      if (query.featured !== undefined) filter.featured = query.featured;
      let q = TravelStory.find(filter).sort({ publishedAt: -1 });
      if (query.limit) q = q.limit(query.limit);
      const docs = await q.lean();
      if (docs && docs.length > 0) return JSON.parse(JSON.stringify(docs));
    } catch (e) {}
  }

  let list = [...seedStories];
  if (query.featured !== undefined) {
    list = list.filter((s) => s.featured === query.featured);
  }
  if (query.limit) list = list.slice(0, query.limit);
  return list;
}

export async function getTravelStoryBySlug(slug: string) {
  const mongooseInstance = await connectDB();
  if (mongooseInstance) {
    try {
      await ensureSeeded();
      const doc = await TravelStory.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch (e) {}
  }
  return seedStories.find((s) => s.slug === slug) || null;
}
