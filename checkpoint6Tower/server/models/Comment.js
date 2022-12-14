import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "TowerEvent", required: true },
    body: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
