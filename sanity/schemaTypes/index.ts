import { type SchemaTypeDefinition } from "sanity";
import { configuracaoGlobal } from "./configuracaoGlobal";
import { navbar } from "./navbar";
import { rodape } from "./rodape";
import { projeto } from "./projeto";
import { trabalho } from "./trabalho";
import { membro } from "./membro";
import { apoiador } from "./apoiador";
import { faq } from "./faq";
import hero from "./hero";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    configuracaoGlobal,
    navbar,
    rodape,
    hero,
    projeto,
    trabalho,
    membro,
    apoiador,
    faq,
  ],
};
