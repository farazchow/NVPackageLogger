import { Schema, Types, model } from "mongoose";
import { Room } from "./room";

type semester = {
  _id: Types.ObjectId;
  room: string;
  dateIn: Date;
  dateOut: Date;
  notes: string;
};

const semesterSchema = new Schema<semester>({
  room: String,
  dateIn: { type: Date, default: Date.now },
  dateOut: { type: Date, default: Date.now },
  notes: String,
});

const Semester = model<semester>("Semester", semesterSchema, "semesters");

export { Semester };
export type { semester };
