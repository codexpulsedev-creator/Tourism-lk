import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  title: string;
  name?: string;
  slug: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  shortDescription: string;
  description: string;
  image: string;
  images?: string[];
  duration: string;
  difficulty?: string;
  bestSeason?: string;
  location?: string;
  destinations: string[];
  featured: boolean;
  highlights: string[];
  whyExperience?: string[];
  popularPlaces?: { name: string; description: string; district?: string }[];
  thingsToDo?: string[];
  travelTips?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    badge: { type: String, default: "Nature" },
    badgeColor: { type: String, default: "bg-blue-600" },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    duration: { type: String, default: "Half-day" },
    difficulty: { type: String, default: "Moderate" },
    bestSeason: { type: String, default: "November to April" },
    location: { type: String, default: "Sri Lanka" },
    destinations: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    highlights: [{ type: String }],
    whyExperience: [{ type: String }],
    popularPlaces: [
      {
        name: { type: String },
        description: { type: String },
        district: { type: String },
      },
    ],
    thingsToDo: [{ type: String }],
    travelTips: [{ type: String }],
  },
  { timestamps: true }
);

ExperienceSchema.index({ title: "text", description: "text" });

const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;

