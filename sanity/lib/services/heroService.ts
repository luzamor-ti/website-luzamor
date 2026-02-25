import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "../queries/hero";
import { Hero } from "../types/hero";

export async function getHeroData() {
  const { data } = await sanityFetch({
    query: HERO_QUERY,
  });
  return data as Hero | null;
}
