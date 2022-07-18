import { Schema, model } from "mongoose";
interface LostItemInterface {
  // TODO: add worker
  // TODO: research type for images
  photo: String;
  description: String;
  createdAt: String;
}

const lostItemSchema = new Schema<LostItemInterface>({
  photo: String,
  description: String,
  createdAt: { type: Date, immutable: true },
});

const LostItem = model<LostItemInterface>("lostItem", lostItemSchema, "lostItems");

export { LostItem };
export type { LostItemInterface };
