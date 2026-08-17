import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITravelStory extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  publishedAt: Date;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TravelStorySchema = new Schema<ITravelStory>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, default: "" },
      bio: { type: String, default: "" },
    },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    readingTime: { type: String, default: "5 min read" },
    featured: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: Date.now },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TravelStorySchema.index({ title: "text", excerpt: "text", content: "text" });

const TravelStory: Model<ITravelStory> =
  mongoose.models.TravelStory || mongoose.model<ITravelStory>("TravelStory", TravelStorySchema);

export default TravelStory;
