import { Schema, model } from "mongoose";

interface IResident {
  studentId: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  dateIn: string;
  dateOut: string;
  checkedIn: boolean;
}

const residentSchema = new Schema<IResident>({
  studentId: String,
  resident: String,
  room: String,
  year: String,
  homeAddress: String,
  forwardingAddress: String,
  dateIn: String,
  dateOut: String,
  checkedIn: Boolean,
});

const Resident = model<IResident>("Resident", residentSchema);

export { Resident };
export type { IResident };
