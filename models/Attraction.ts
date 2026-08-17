import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttraction extends Document {
  name: string;
  slug: string;
  destination: string;
  destinationSlug: string;
  description: string;
  image: string;
  entryFee?: string;
  openingHours?: string;
  featured: boolean;
}

const AttractionSchema = new Schema<IAttraction>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    destination: { type: String, required: true },
    destinationSlug: { type: String, required: true, index: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    entryFee: { type: String, default: "Free / Local Rates" },
    openingHours: { type: String, default: "6:00 AM - 6:00 PM" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Attraction: Model<IAttraction> =
  mongoose.models.Attraction || mongoose.model<IAttraction>("Attraction", AttractionSchema);

export default Attraction;
