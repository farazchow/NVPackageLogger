import { Schema, model } from "mongoose";

interface IResident {
  studentId: String;
  resident: String;
  room: String;
  year: String;
  homeAddress: String;
  forwardingAddress: String;
  date: String;
}

const residentSchema = new Schema<IResident>({
  studentId: String,
  resident: String,
  room: String,
  year: String,
  homeAddress: String,
  forwardingAddress: String,
  date: String,
});

const Resident = model<IResident>("Resident", residentSchema);

export { Resident };
export type { IResident };
