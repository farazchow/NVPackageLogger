import { Schema, model } from "mongoose";
interface PackageInterface {
  shipping_id: String;
  recipient: String;
  shipper: String;
  location: String;
  notes: String;
  workerIn: String;
  createdAt: Date;
}

const packageSchema = new Schema<PackageInterface>({
  shipping_id: String,
  recipient: String,
  shipper: String,
  location: String,
  notes: String,
  workerIn: String,
  createdAt: { type: Date, immutable: true },
});

const Package = model<PackageInterface>("package", packageSchema, "packages");

export { Package };
export type { PackageInterface };
