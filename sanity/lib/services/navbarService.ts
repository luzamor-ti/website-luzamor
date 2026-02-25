import { sanityFetch } from "../live";
import { NavBar } from "../types/navbar";
import { NAVBAR_QUERY } from "../queries/navbar";

export async function getNavbar(): Promise<NavBar | null> {
  const { data } = await sanityFetch({
    query: NAVBAR_QUERY,
  });
  return data;
}
