import { Schema, model } from "mongoose";

interface IResident {
  studentId: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  date: string;
  checkedIn: Boolean;
}

const residentSchema = new Schema<IResident>({
  studentId: String,
  resident: String,
  room: String,
  year: String,
  homeAddress: String,
  forwardingAddress: String,
  date: String,
  checkedIn: Boolean,
});

const Resident = model<IResident>("Resident", residentSchema);

export { Resident };
export type { IResident };
