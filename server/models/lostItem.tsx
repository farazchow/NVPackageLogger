import { Schema, model } from "mongoose";

interface LostItemInterface {
    description: String;
    deskworker: String;
    createdAt: Date;
}

const lostItemSchema = new Schema<LostItemInterface>({
    description: String,
    deskworker: String,
    createdAt: {type: Date, immutable: true },
});

const LostItems = model<LostItemInterface>("lostItem", lostItemSchema, "lostItems");

export { LostItems };
export type { LostItemInterface };