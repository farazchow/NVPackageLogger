import { Schema, model, Types } from "mongoose";
import { emptyNotes } from "./notes";
import { resident } from "./resident";
import { notes, kerb } from "./user";

export enum PackageCarrier {
  NONE = "",
  AMAZON = "Amazon",
  DHL = "DHL",
  FEDEX = "FedEx",
  LASERSHIP = "LaserShip",
  UPS = "UPS",
  USPS = "USPS",
  OTHER = "Other",
}

export enum Closets {
  NONE = "",
  A_C = "A-C",
  D_G = "D-G",
  H_J = "H-J",
  K_L = "K-L",
  M_O = "M-O",
  P_R = "P-R",
  S_V = "S-V",
  CLOSET_1 = "Closet 1",
  CLOSET_2 = "Closet 2",
  CLOSET_3 = "Closet 3",
  CLOSET_4 = "Closet 4",
  FLOOR = "Floor",
}

type pckge = {
  _id: Types.ObjectId;
  trackingNo: string;
  carrier: PackageCarrier;
  recipient: resident["firstName"] & resident["lastName"];
  recipientKerb: resident["kerb"];
  location: Closets;
  notes: notes;
  loggedBy: kerb;
  receivedAt: Date;
  deliveredAt: Date;
};

const emptyPckge = {
  _id: new Types.ObjectId(),
  trackingNo: "",
  carrier: PackageCarrier.NONE,
  recipient: "",
  recipientKerb: "",
  location: Closets.NONE,
  notes: emptyNotes,
  loggedBy: "",
  receivedAt: new Date(),
  deliveredAt: new Date(0),
};

export const emptyPackage: pckge = { ...emptyPckge };

export const packageSchema = new Schema<pckge>({
  trackingNo: { type: String, required: true },
  carrier: {
    type: String,
    enum: PackageCarrier,
    required: true,
    default: PackageCarrier.NONE,
    minlength: 1, // default is empt0.y so we force a length here!
  },
  recipient: { type: String, required: true },
  recipientKerb: { type: Schema.Types.String },
  location: {
    type: String,
    enum: Closets,
    default: Closets.NONE,
    minlength: 1,
    required: true,
  },
  notes: { type: Schema.Types.Mixed },
  loggedBy: { type: Schema.Types.String },
  receivedAt: { type: Date, immutable: true },
  deliveredAt: {
    type: Date,
    required: true,
    default: new Date(0),
  },
});

const Package = model<pckge>("Package", packageSchema, "packages");

export { Package };
export type { pckge };
