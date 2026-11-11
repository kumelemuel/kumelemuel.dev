import { projectPath } from "../i18n/routes";
import { indexLocalized, type IndexedEntry } from "./localized";

/**
 * Portfolio projects live in `src/data/portfolio/<lang>/<slug>.md`; translations are paired
 * through `translationKey` (see src/lib/localized.ts). Pure, so it can be unit tested.
 */
export interface ProjectLike {
  id: string;
  data: { translationKey?: string; kind: "featured" | "lab"; order: number; year: number };
}

export interface IndexedProject<T extends ProjectLike> extends Omit<IndexedEntry<T>, "entry"> {
  project: T;
}

export function indexProjects<T extends ProjectLike>(projects: readonly T[]): IndexedProject<T>[] {
  return indexLocalized(projects, projectPath, "portfolio").map(({ entry, ...rest }) => ({
    project: entry,
    ...rest,
  }));
}

/** Featured first, then by manual `order`, then newest year first. */
export const compareProjects = (a: ProjectLike, b: ProjectLike) =>
  Number(a.data.kind === "lab") - Number(b.data.kind === "lab") ||
  a.data.order - b.data.order ||
  b.data.year - a.data.year;
