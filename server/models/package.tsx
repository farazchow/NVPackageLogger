import { Schema, model } from "mongoose";
interface PackageInterface {
  shipping_id: string;
  recipient: string;
  shipper: string;
  location: string;
  notes: string;
  // notes: { value: string };
  workerIn: string;
  createdAt: Date;
}

const packageSchema = new Schema<PackageInterface>({
  shipping_id: String,
  recipient: String,
  shipper: String,
  location: String,
  notes: String,
  // notes: { value: String },
  workerIn: String,
  createdAt: { type: Date, immutable: true, default: Date.now },
});

const Package = model<PackageInterface>("package", packageSchema, "packages");

export { Package };
export type { PackageInterface };
