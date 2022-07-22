import { Schema, model } from "mongoose";

interface IResident {
  name: String;
  checkedIn: Date;
  checkedOut: Date;
  roomNumber: Number;
  forwardingAddress: String;
  keyGiven: Boolean;
  keyReturned: Boolean;
  studentId: Number;
  YellowCardFilled: Boolean;
}

const residentSchema = new Schema<IResident>({
  name: { type: String, required: true },
  checkedIn: { type: Date, required: true },
  checkedOut: { type: Date, required: false },
  roomNumber: Number,
  forwardingAddress: { type: String, required: true },
  keyGiven: { type: Boolean, required: true },
  keyReturned: { type: Boolean, required: true },
  studentId: Number,
  YellowCardFilled: Boolean,
});

const Resident = model<IResident>("Resident", residentSchema);

export { Resident };
export type { IResident };
