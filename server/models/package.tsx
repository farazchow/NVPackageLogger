import { Schema, model } from "mongoose";

interface IPackage {
  shipping_id: String;
  recipient: String;
  shipper: String;
  location: String;
  notes: String;
  createdAt: Date;
}

const packageSchema = new Schema<IPackage>({
  shipping_id: String,
  recipient: String,
  shipper: String,
  location: String,
  notes: String,
  createdAt: { type: Date, immutable: true },
});

const Package = model<IPackage>("Package", packageSchema);

export { Package };
export type { IPackage };
