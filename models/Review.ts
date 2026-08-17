import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  userName: string;
  userAvatar?: string;
  destination: mongoose.Types.ObjectId | string;
  destinationSlug: string;
  rating: number;
  title: string;
  comment: string;
  verifiedVisit?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String, default: "" },
    destination: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
    destinationSlug: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true },
    comment: { type: String, required: true, minlength: 10, maxlength: 2000 },
    verifiedVisit: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
