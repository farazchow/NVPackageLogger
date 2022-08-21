import { Schema, model } from "mongoose";
import { ACCESS } from "../routes/auth";
import { NotesInterface } from "./notes";

export type kerb = string;
export type notes = string;

type user = {
  firstName: string;
  middleName: string;
  lastName: string;
  kerb: kerb;
  email: string;
  createdAt: Date;
  accessLevel: ACCESS;
  notes: notes[];
};

const emptUser: user = {
  firstName: "",
  middleName: "",
  lastName: "",
  kerb: "",
  email: "",
  createdAt: new Date(0),
  accessLevel: ACCESS.RESIDENT,
  notes: [""],
};

export const emptyUser = { ...emptUser };

const UserSchema = new Schema<user>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  kerb: { type: String, minLength: 9, maxLength: 9 },
  email: { type: String, required: true },
  createdAt: { type: Date, immutable: true, default: Date.now() },
  accessLevel: {
    type: String,
    enum: ACCESS,
    // default: ACCESS["RESIDENT"],
    required: true,
  },
});

const User = model<user>("User", UserSchema, "users");

export { User };
export type { user, UserSchema };
