import { client } from "../sanity/client";
import {
  projetosHomeQuery,
  projetosPageQuery,
  projetoBySlugQuery,
} from "../queries/project";
import { Project } from "../types/project";

export async function getProjectsHome(): Promise<Project[]> {
  return client.fetch(projetosHomeQuery);
}

export async function getProjectsPage(): Promise<Project[]> {
  return client.fetch(projetosPageQuery);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(projetoBySlugQuery, { slug });
}
