import { client } from "../sanity/client";
import { configuracaoGlobalQuery } from "../queries/configuracao";
import { ConfiguracaoGlobal } from "../types/configuracao";

export async function getConfiguracaoGlobal(): Promise<ConfiguracaoGlobal | null> {
  return client.fetch(configuracaoGlobalQuery);
}
