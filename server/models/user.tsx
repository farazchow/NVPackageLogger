import { Schema, model } from "mongoose";
import { ACCESS } from "../routes/auth";

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  accessLevel: string;
}

const UserSchema = new Schema<UserInterface>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: { type: Date, immutable: true, default: Date.now() },
  accessLevel: {
    type: String,
    enum: ACCESS,
    default: "DESKCAPTAIN",
  },
});

const User = model<UserInterface>("User", UserSchema, "users");

export { User, UserSchema, type UserInterface };
