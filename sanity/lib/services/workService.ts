import { client } from "../sanity/client";
import { trabalhosQuery } from "../queries/work";
import { Work } from "../types/work";

export async function getWorks(): Promise<Work[]> {
  return client.fetch(trabalhosQuery);
}
