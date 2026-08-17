import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  destinationSlug: string;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    destination: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
    destinationSlug: { type: String, required: true },
  },
  { timestamps: true }
);

FavoriteSchema.index({ user: 1, destination: 1 }, { unique: true });

const Favorite: Model<IFavorite> =
  mongoose.models.Favorite || mongoose.model<IFavorite>("Favorite", FavoriteSchema);

export default Favorite;
