import { client } from "../sanity/client";
import { membrosHomeQuery, membrosPageQuery } from "../queries/member";
import { Member } from "../types/member";

export async function getMembersHome(): Promise<Member[]> {
  return client.fetch(membrosHomeQuery);
}

export async function getMembersPage(): Promise<Member[]> {
  return client.fetch(membrosPageQuery);
}
