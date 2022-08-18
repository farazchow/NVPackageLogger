import { Schema, Types, model } from "mongoose";

type room = {
  _id: Types.ObjectId;
  residents: [];
  number: string;
  keycode: string;
  size: string;
  status: string;
  keyAmount: number;
};

const roomSchema = new Schema<room>({
  residents: Array,
  number: String,
  keycode: String,
  size: String,
  status: String,
  keyAmount: Number,
});

const Room = model<room>("Room", roomSchema, "rooms");

export { Room };
export type { room };
