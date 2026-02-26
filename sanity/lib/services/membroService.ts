import { client } from "../sanity/client";
import {
  membrosHomeQuery,
  membrosPageQuery,
  palavraPresidentePageQuery,
} from "../queries/membro";
import { Membro } from "../types/membro";

export async function getMembrosHome(): Promise<Membro[]> {
  return client.fetch(membrosHomeQuery);
}

export async function getMembrosPage(): Promise<Membro[]> {
  return client.fetch(membrosPageQuery);
}

export async function getPalavraPresidente(): Promise<Membro> {
  return client.fetch(palavraPresidentePageQuery);
}
