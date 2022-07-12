import { Schema, model } from "mongoose";

interface DevPackage {
  id: String;
  shipper: String;
  resident: String;
  location: String;
  notes: String;
  worker: String;
  createdAt: Date;
}

const packageSchema = new Schema<DevPackage>({
  id: String,
  shipper: String,
  resident: String,
  location: String,
  notes: String,
  worker: { type: String, immutable: true },
  createdAt: { type: Date, immutable: true },
});

const Package = model<DevPackage>("package", packageSchema, "packages");

export { Package };
export type { DevPackage };
