import { Schema, model } from "mongoose";

interface NotesInterface {
    note: String;
    deskworker: String;
    createdAt: Date;
}

const notesSchema = new Schema<NotesInterface>({
    note: String,
    deskworker: String,
    createdAt: { type: Date, immutable: true },
});

const Notes = model<NotesInterface>("note", notesSchema, "notes");

export { Notes };
export type { NotesInterface };
