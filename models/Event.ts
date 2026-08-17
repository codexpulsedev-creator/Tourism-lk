import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  image: string;
  category: string;
  startDate: Date;
  endDate: Date;
  featured: boolean;
  ticketInfo?: string;
  venue?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    featured: { type: Boolean, default: false, index: true },
    ticketInfo: { type: String, default: "Free / Open" },
    venue: { type: String, default: "" },
  },
  { timestamps: true }
);

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
