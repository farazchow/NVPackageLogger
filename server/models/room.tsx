import { Schema, model } from "mongoose";

interface RoomInterface {
  residents: [];
  number: string;
  keycode: string;
  size: string;
  status: string;
  keyAmount: number;
}

const roomSchema = new Schema<RoomInterface>({
  residents: Array,
  number: String,
  keycode: String,
  size: String,
  status: String,
  keyAmount: Number,
});

const Room = model<RoomInterface>("Room", roomSchema);

export { Room };
export type { RoomInterface };
