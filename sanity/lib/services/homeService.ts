import { getProjetosHome } from "./projetoService";
import { getMembrosHome } from "./membroService";
import { getApoiadoresDestaque } from "./apoiadorService";
import { getFaqResumo } from "./faqService";
import { getContatos } from "./contatoService";
import { getConfiguracaoGlobal } from "./configuracaoService";

import { Projeto } from "../types/projeto";
import { Membro } from "../types/membro";
import { Apoiador } from "../types/apoiador";
import { Faq } from "../types/faq";
import { Contato } from "../types/contato";
import { ConfiguracaoGlobal } from "../types/configuracao";

export interface HomeData {
  projetos: Projeto[];
  membros: Membro[];
  apoiadores: Apoiador[];
  faq: Faq[];
  contatos: Contato[];
  configuracao: ConfiguracaoGlobal | null;
}

export async function getHomeData(): Promise<HomeData> {
  const [projetos, membros, apoiadores, faq, contatos, configuracao] =
    await Promise.all([
      getProjetosHome(),
      getMembrosHome(),
      getApoiadoresDestaque(),
      getFaqResumo(),
      getContatos(),
      getConfiguracaoGlobal(),
    ]);

  return {
    projetos,
    membros,
    apoiadores,
    faq,
    contatos,
    configuracao,
  };
}
