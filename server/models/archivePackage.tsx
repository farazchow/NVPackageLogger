import { Schema, model } from "mongoose";
interface ArchivePackageInterface {
  shipping_id: String;
  recipient: String;
  shipper: String;
  notes: String;
  workerIn: String;
  workerOut: String;
  createdAt: Date;
  deliveredAt: Date;
}

const archivePackageSchema = new Schema<ArchivePackageInterface>({
  shipping_id: String,
  recipient: String,
  shipper: String,
  notes: String,
  workerIn: String,
  workerOut: String,
  createdAt: { type: Date, immutable: true },
  deliveredAt: { type: Date, immutable: true },
});

const ArchivePackage = model<ArchivePackageInterface>(
  "archivePackage",
  archivePackageSchema,
  "archivePackages"
);

export { ArchivePackage };
export type { ArchivePackageInterface };
