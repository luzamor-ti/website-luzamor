import { client } from "../sanity/client";
import { contatoQuery, contatosQuery } from "../queries/contato";
import { Contato } from "../types/contato";

export async function getContato(): Promise<Contato | null> {
  return client.fetch(contatoQuery);
}

export async function getContatos(): Promise<Contato[]> {
  return client.fetch(contatosQuery);
}
