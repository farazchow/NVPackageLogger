import { Schema, model } from "mongoose";

interface NotesInterface {
  note: string;
  __value__: string;
  deskworker: string;
  createdAt: Date;
}

const notesSchema = new Schema<NotesInterface>({
  note: String,
  __value__: String,
  deskworker: String,
  createdAt: { type: Date, immutable: true },
});

export const emptyNotes = "";

const Notes = model<NotesInterface>("note", notesSchema, "notes");

export { Notes };
export type { NotesInterface };
