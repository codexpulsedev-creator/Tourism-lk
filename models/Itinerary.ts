import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItineraryDay {
  dayNumber: number;
  title: string;
  destination: string;
  description: string;
  activities: string[];
  image?: string;
  stayOvernight?: string;
}

export interface IItinerary extends Document {
  title: string;
  slug: string;
  durationDays: number;
  overview: string;
  coverImage: string;
  idealFor: string;
  bestSeason: string;
  routeHighlights: string[];
  days: IItineraryDay[];
  featured: boolean;
  budgetEstimate: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryDaySchema = new Schema<IItineraryDay>(
  {
    dayNumber: { type: Number, required: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    description: { type: String, required: true },
    activities: [{ type: String }],
    image: { type: String, default: "" },
    stayOvernight: { type: String, default: "" },
  },
  { _id: false }
);

const ItinerarySchema = new Schema<IItinerary>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    durationDays: { type: Number, required: true },
    overview: { type: String, required: true },
    coverImage: { type: String, required: true },
    idealFor: { type: String, default: "Couples, Solo, Families" },
    bestSeason: { type: String, default: "Year-Round" },
    routeHighlights: [{ type: String }],
    days: [ItineraryDaySchema],
    featured: { type: Boolean, default: false, index: true },
    budgetEstimate: { type: String, default: "$$ - Moderate" },
  },
  { timestamps: true }
);

const Itinerary: Model<IItinerary> =
  mongoose.models.Itinerary || mongoose.model<IItinerary>("Itinerary", ItinerarySchema);

export default Itinerary;
