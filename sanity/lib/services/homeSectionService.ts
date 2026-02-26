import { client } from "@/sanity/lib/client";
import { secaoHomeQuery, todasSecoesHomeQuery } from "../queries/homeSection";
import type { HomeSection, SectionName } from "../types/homeSection";

export async function getHomeSection(
  name: SectionName,
): Promise<HomeSection | null> {
  try {
    const section = await client.fetch(secaoHomeQuery, { nome: name });
    return section;
  } catch (error) {
    console.error(`Error fetching section ${name}:`, error);
    return null;
  }
}

export async function getAllHomeSections(): Promise<HomeSection[]> {
  try {
    const sections = await client.fetch(todasSecoesHomeQuery);
    return sections;
  } catch (error) {
    console.error("Error fetching home sections:", error);
    return [];
  }
}

export async function getHomeSectionsByNames(
  names: SectionName[],
): Promise<Record<SectionName, HomeSection | null>> {
  try {
    const promises = names.map((name) => getHomeSection(name));
    const results = await Promise.all(promises);

    const sectionsByName = {} as Record<SectionName, HomeSection | null>;
    names.forEach((name, index) => {
      sectionsByName[name] = results[index];
    });

    return sectionsByName;
  } catch (error) {
    console.error("Error fetching multiple sections:", error);
    const sectionsByName = {} as Record<SectionName, HomeSection | null>;
    names.forEach((name) => {
      sectionsByName[name] = null;
    });
    return sectionsByName;
  }
}
