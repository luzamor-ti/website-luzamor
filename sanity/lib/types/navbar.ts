export interface NavBarItem {
  _id: string;
  tituloPersonalizado?: string;
  slug: string;
}
export interface NavBar {
  _id: string;
  itens: NavBarItem[];
  botaoPrincipal?: {
    titulo: string;
    url?: string;
  };
}
