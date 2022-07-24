import { Schema, model, Document } from "mongoose";

export interface DeskItemInterface extends Document {
  itemName: String;
  currentStatus: String; // residentId or Available
  lastBorrowed: Date;
  log: [
    {
      residentId: String;
      borrowedAt: Date;
      returnedAt: Date;
      notes: String;
    }
  ];
}

const deskItemSchema = new Schema<DeskItemInterface>({
  itemName: String,
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
