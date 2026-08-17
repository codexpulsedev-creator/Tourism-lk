import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDestinationCategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  order: number;
}

const DestinationCategorySchema = new Schema<IDestinationCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const DestinationCategory: Model<IDestinationCategory> =
  mongoose.models.DestinationCategory ||
  mongoose.model<IDestinationCategory>("DestinationCategory", DestinationCategorySchema);

export default DestinationCategory;
