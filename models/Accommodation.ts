import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAccommodation extends Document {
  name: string;
  slug: string;
  category: "Luxury Hotels" | "Beach Resorts" | "Villas" | "Budget Hotels" | "Eco Lodges";
  location: string;
  district: string;
  description: string;
  shortDescription: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  pricePerNightUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  bookingUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccommodationSchema = new Schema<IAccommodation>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["Luxury Hotels", "Beach Resorts", "Villas", "Budget Hotels", "Eco Lodges"],
      index: true,
    },
    location: { type: String, required: true },
    district: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    priceRange: { type: String, default: "$$$" },
    pricePerNightUSD: { type: Number, default: 150 },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 24 },
    image: { type: String, required: true },
    images: [{ type: String }],
    amenities: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    bookingUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Accommodation: Model<IAccommodation> =
  mongoose.models.Accommodation || mongoose.model<IAccommodation>("Accommodation", AccommodationSchema);

export default Accommodation;
