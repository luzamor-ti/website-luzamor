import { client } from "../sanity/client";
import { apoiadoresDestaqueQuery } from "../queries/supporter";
import { Supporter } from "../types/supporter";

export async function getFeaturedSupporters(): Promise<Supporter[]> {
  return client.fetch(apoiadoresDestaqueQuery);
}
