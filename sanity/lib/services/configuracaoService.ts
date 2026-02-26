import { client } from "../sanity/client";
import { configuracaoGlobalQuery } from "../queries/configuracao";
import { GlobalConfiguration } from "../types/configuration";

export async function getGlobalConfiguration(): Promise<GlobalConfiguration | null> {
  return client.fetch(configuracaoGlobalQuery);
}
