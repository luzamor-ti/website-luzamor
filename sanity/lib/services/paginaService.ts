import { client } from "../sanity/client";
import { paginaBySlugQuery } from "../queries/pagina";
import { Pagina } from "../types/pagina";

export async function getPaginaBySlug(slug: string): Promise<Pagina | null> {
  return client.fetch(paginaBySlugQuery, { slug });
}
