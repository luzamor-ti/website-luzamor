import { Image } from "sanity";

export interface ConfiguracaoGlobal {
  _id: string;
  tituloHero?: string;
  subtituloHero?: string;
  logo?: Image;
  tema: {
    corPrimaria?: string;
    corSecundaria?: string;
    corDestaque?: string;
    corFundo?: string;
    corTexto?: string;
  };
}
