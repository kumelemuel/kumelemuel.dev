import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/config";
import { compareProjects, indexProjects } from "../lib/portfolio";

/** See src/lib/portfolio.ts for the folder layout and how translations are paired. */
export type Project = CollectionEntry<"portfolio">;

export async function getLocalizedProjects() {
  return indexProjects(await getCollection("portfolio"));
}

/** Projects of one language, featured first (see compareProjects), with their slug. */
export async function getProjectsByLang(lang: Lang) {
  return (await getLocalizedProjects())
    .filter((entry) => entry.lang === lang)
    .sort((a, b) => compareProjects(a.project, b.project));
}

/** getStaticPaths of the project page of one language (/es/portafolio/<slug>/, /en/portfolio/<slug>/). */
export async function getProjectStaticPaths(lang: Lang) {
  return (await getLocalizedProjects())
    .filter((entry) => entry.lang === lang)
    .map(({ project, slug, alternates }) => ({ params: { slug }, props: { project, alternates } }));
}
