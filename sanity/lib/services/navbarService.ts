import { client } from "../sanity/client";
import { NavBar } from "../types/navbar";
import { navbarQuery } from "../queries/navbar";

export async function getNavbar(): Promise<NavBar | null> {
  return client.fetch(navbarQuery);
}
