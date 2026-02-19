import { client } from "../sanity/client";
import { trabalhosQuery } from "../queries/trabalho";
import { Trabalho } from "../types/trabalho";

export async function getTrabalhos(): Promise<Trabalho[]> {
  return client.fetch(trabalhosQuery);
}
