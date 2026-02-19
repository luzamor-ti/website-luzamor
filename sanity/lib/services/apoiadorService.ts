import { client } from "../sanity/client";
import { apoiadoresDestaqueQuery } from "../queries/apoiador";
import { Apoiador } from "../types/apoiador";

export async function getApoiadoresDestaque(): Promise<Apoiador[]> {
  return client.fetch(apoiadoresDestaqueQuery);
}
