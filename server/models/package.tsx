import { Schema, model } from "mongoose";
interface DevPackage {
  shipping_id: String;
  recipient: String;
  shipper: String;
  location: String;
  notes: String;
  createdAt: Date;
}

const packageSchema = new Schema<DevPackage>({
  shipping_id: String,
  recipient: String,
  shipper: String,
  location: String,
  notes: String,
  createdAt: { type: Date, immutable: true },
});

const Package = model<DevPackage>("package", packageSchema, "packages");

export { Package };
export type { DevPackage };
