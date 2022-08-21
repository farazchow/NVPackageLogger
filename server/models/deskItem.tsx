import { Schema, model, Document } from "mongoose";

export interface DeskItemInterface extends Document {
  itemName: string;
  itemCategory: string;
  currentStatus: string; // residentId or Available
  lastBorrowed: Date;
  log: [
    {
      residentId: string;
      borrowedAt: Date;
      returnedAt: Date;
      notes: string;
    }
  ];
}

const deskItemSchema = new Schema<DeskItemInterface>({
  itemName: String,
  itemCategory: String,
  currentStatus: String, // residentId or Available
  lastBorrowed: Date,
  log: [
    {
      residentId: String,
      borrowedAt: Date,
      returnedAt: Date,
      notes: String,
    },
  ],
});

const DeskItem = model<DeskItemInterface>("deskItem", deskItemSchema);

export default DeskItem;
