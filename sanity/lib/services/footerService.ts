import { client } from "../sanity/client";
import { Footer } from "../types/footer";
import { footerQuery } from "../queries/footer";

export async function getFooter(): Promise<Footer | null> {
  return client.fetch(footerQuery);
}
