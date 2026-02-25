export interface NavBarSubItem {
  _key: string;
  pagina: string;
  titulo: string;
}

export interface NavBarItem {
  _key: string;
  pagina: string;
  titulo: string;
  subItens?: NavBarSubItem[];
}

export interface NavBar {
  _id: string;
  itens: NavBarItem[];
  botaoPrincipal?: {
    titulo: string;
    url?: string;
  };
}
