import { model } from "mongoose";
import { packageSchema, pckge } from "./package";

type ArchivePackageInterface = pckge;

const ArchivePackage = model<pckge>(
  "archivePackage",
  packageSchema,
  "archivePackages"
);

export { ArchivePackage };
export type { ArchivePackageInterface };
