import { describe, expect, it } from "vitest";
import { projectPath } from "../../src/i18n/routes";
import { compareProjects, indexProjects, type ProjectLike } from "../../src/lib/portfolio";

const project = (id: string, data: Partial<ProjectLike["data"]> = {}): ProjectLike => ({
  id,
  data: { kind: "lab", order: 0, year: 2026, ...data },
});

describe("projectPath", () => {
  it("builds project paths under the translated section", () => {
    expect(projectPath("es", "mi-pwa")).toBe("/es/portafolio/mi-pwa/");
    expect(projectPath("en", "my-pwa")).toBe("/en/portfolio/my-pwa/");
  });
});

describe("indexProjects", () => {
  it("pairs translations with different slugs through translationKey", () => {
    const [es, en] = indexProjects([
      project("es/mi-pwa", { translationKey: "pwa" }),
      project("en/my-pwa", { translationKey: "pwa" }),
    ]);
    const expected = { es: "/es/portafolio/mi-pwa/", en: "/en/portfolio/my-pwa/" };
    expect(es.alternates).toEqual(expected);
    expect(en.alternates).toEqual(expected);
    expect(es.project.id).toBe("es/mi-pwa");
  });

  it("fails on two projects of the same language with the same key", () => {
    expect(() =>
      indexProjects([project("es/uno", { translationKey: "x" }), project("es/dos", { translationKey: "x" })]),
    ).toThrow(/\[portfolio\].*translationKey "x"/);
  });
});

describe("compareProjects", () => {
  it("puts featured first, then manual order, then newest year", () => {
    const sorted = [
      project("es/lab-old", { year: 2023 }),
      project("es/lab-new", { year: 2025 }),
      project("es/lab-pinned", { order: -1, year: 2020 }),
      project("es/featured-b", { kind: "featured", order: 2 }),
      project("es/featured-a", { kind: "featured", order: 1 }),
    ]
      .sort(compareProjects)
      .map((entry) => entry.id);
    expect(sorted).toEqual(["es/featured-a", "es/featured-b", "es/lab-pinned", "es/lab-new", "es/lab-old"]);
  });
});
