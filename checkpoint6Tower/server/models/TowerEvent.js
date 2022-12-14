import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, default: 200 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: {
      type: String,
      enum: ["concert", "convention", "sport", "digital"],
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

TowerEventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
