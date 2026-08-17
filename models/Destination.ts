import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDestination extends Document {
  name: string;
  slug: string;
  province: string;
  district: string;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  heroImage: string;
  latitude: number;
  longitude: number;
  bestTimeToVisit: string;
  weatherSummary: string;
  attractions: string[];
  activities: string[];
  featured: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    province: { type: String, required: true, index: true },
    district: { type: String, required: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: { type: String, required: true, index: true },
    images: [{ type: String }],
    heroImage: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    bestTimeToVisit: { type: String, default: "Year-round" },
    weatherSummary: { type: String, default: "Tropical & Warm" },
    attractions: [{ type: String }],
    activities: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    rating: { type: Number, default: 4.8, min: 1, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

DestinationSchema.index({ name: "text", description: "text", shortDescription: "text" });

const Destination: Model<IDestination> =
  mongoose.models.Destination || mongoose.model<IDestination>("Destination", DestinationSchema);

export default Destination;
