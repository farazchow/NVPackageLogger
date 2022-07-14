import { Schema, model } from "mongoose";

export interface UserInterface {
  name: String;
  createdAt: Date;
}

const userSchema = new Schema<UserInterface>({
  name: String,
  createdAt: { type: Date, immutable: true },
});

const User = model<UserInterface>("User", userSchema);

export { User };
