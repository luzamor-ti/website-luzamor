import { client } from "../sanity/client";
import { projetosHomeQuery, projetosPageQuery, projetoBySlugQuery } from "../queries/projeto";
import { Projeto } from "../types/projeto";

export async function getProjetosHome(): Promise<Projeto[]> {
  return client.fetch(projetosHomeQuery);
}

export async function getProjetosPage(): Promise<Projeto[]> {
  return client.fetch(projetosPageQuery);
}

export async function getProjetoBySlug(slug: string): Promise<Projeto | null> {
  return client.fetch(projetoBySlugQuery, { slug });
}
