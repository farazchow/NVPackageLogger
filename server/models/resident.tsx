import { Schema, model } from "mongoose";
import { SemesterType } from "./semester";
import PhoneInput from "react-phone-number-input";

type ResidentType = {
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
  semesters: SemesterType[];
};

const residentSchema = new Schema<ResidentType>({
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

const Resident = model<ResidentType>("Resident", residentSchema);

export { Resident };
export type { ResidentType };
