import { Schema, model, Types } from "mongoose";
import { semester } from "./semester";
import PhoneInput from "react-phone-number-input";

type shadowResident = {
  firstName: string;
  middleName: string;
  lastName: string;
  kerb: string;
  residentID: string;
  // room: string;
  year: string;
  homeAddress: string;
  phoneNumber: string;
  forwardingAddress: string;
  // dateIn: Date;
  // dateOut: Date;
  checkedIn: boolean;
  semesters: semester[];
};

type resident = shadowResident & {
  _id: Types.ObjectId;
};

const residentSchema = new Schema<resident>({
  firstName: String,
  middleName: String,
  lastName: String,
  kerb: String,
  residentID: String,
  // room: String,
  year: String,
  homeAddress: String,
  phoneNumber: String,
  forwardingAddress: String,
  // dateIn: { type: Date, default: Date.now },
  // dateOut: Date,
  checkedIn: Boolean,
  semesters: [Schema.Types.Mixed],
});

const Resident = model<resident>("Resident", residentSchema, "residents");

export { Resident };
export type { resident, shadowResident };
