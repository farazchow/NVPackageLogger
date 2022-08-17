import { Schema, model } from "mongoose";
import { RoomInterface } from "./room";

type SemesterType = {
  room: string;
  dateIn: Date;
  dateOut: Date;
  notes: string;
};

const semesterSchema = new Schema<SemesterType>({
  room: String,
  dateIn: { type: Date, default: Date.now },
  dateOut: { type: Date, default: Date.now },
  notes: String,
});

const Semester = model<SemesterType>("Semester", semesterSchema);

export { Semester };
export type { SemesterType };
