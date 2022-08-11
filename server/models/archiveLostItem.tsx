import { Schema, model } from "mongoose";

interface ArchiveLostItemInterface{
    description: String;
    deskworker: String;
    createdAt: Date;
    loggedAt: Date;
}

const archiveLostItemSchema = new Schema<ArchiveLostItemInterface>({
    description: String,
    deskworker: String,
    createdAt: { type: Date, immutable: true },
    loggedAt: { type: Date, immutable: true },
});

const ArchiveLostItem = model<ArchiveLostItemInterface>(
    "archiveLostItem", 
    archiveLostItemSchema, 
    "archiveLostItems"
    );

export { ArchiveLostItem };
export type { ArchiveLostItemInterface };