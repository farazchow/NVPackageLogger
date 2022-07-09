import { Schema, model } from "mongoose";

interface DevUser {
  name: String;
  createdAt: Date;
  happinessLevel: String;
}

const userSchema = new Schema<DevUser>({
  name: String,
  createdAt: { type: Date, immutable: true },
  happinessLevel: String,
});

const User = model<DevUser>("User", userSchema);

export { User };
export type { DevUser };
