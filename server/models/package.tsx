import { Schema, model } from "mongoose";

interface IPackage {
  name: String;
  recipient: String;
  createdAt: Date;
}

const packageSchema = new Schema<IPackage>({
  name: String,
  recipient: String,
  createdAt: { type: Date, immutable: true },
});

const Package = model<IPackage>("Package", packageSchema);

export { Package };
export type { IPackage };