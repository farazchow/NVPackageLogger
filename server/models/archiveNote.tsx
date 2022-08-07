import { Schema, model } from "mongoose";

interface ArchiveNoteInterface {
    note: String;
    deskworker: String;
    createdAt: Date;
    loggedAt: Date;
}

const archiveNoteSchema = new Schema<ArchiveNoteInterface>({
    note: String,
    deskworker: String,
    createdAt: { type: Date, immutable: true },
    loggedAt: { type: Date, immutable: true },
});

const ArchiveNote = model<ArchiveNoteInterface>(
    "archiveNote", 
    archiveNoteSchema, 
    "archiveNotes"
    );

export { ArchiveNote };
export type { ArchiveNoteInterface };
