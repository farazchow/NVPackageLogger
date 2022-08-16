import { Schema, model } from "mongoose";
import { ACCESS } from "../routes/auth";

type user = {
  kerb: string;
  email: string;
  createdAt: Date;
  accessLevel: string;
};

const UserSchema = new Schema<user>({
  kerb: String,
  email: String,
  createdAt: { type: Date, immutable: true, default: Date.now },
  accessLevel: {
    type: String,
    enum: ACCESS,
    default: "RESIDENT",
  },
});

const User = model<user>("User", UserSchema, "users");

export { User, UserSchema, type user };
