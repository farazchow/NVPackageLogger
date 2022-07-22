import { Schema, model } from "mongoose";

interface IResident {
  id: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  date: string;
}

const residentSchema = new Schema<IResident>({
  id: String,
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
