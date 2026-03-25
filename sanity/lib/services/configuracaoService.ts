import { client } from "../sanity/client";
import { configuracaoGlobalQuery } from "../queries/configuracao";
import { GlobalConfiguration } from "../types/configuration";

export async function getGlobalConfiguration(): Promise<GlobalConfiguration | null> {
  return client.fetch(configuracaoGlobalQuery);
}

/**
 * Fetches the global configuration bypassing the CDN cache.
 * Use this when you need the most up-to-date data, e.g. for maintenance checks.
 */
export async function getFreshGlobalConfiguration(): Promise<GlobalConfiguration | null> {
  const noCdnClient = client.withConfig({ useCdn: false });
  return noCdnClient.fetch(configuracaoGlobalQuery);
}
