export interface NavbarItem {
  tituloPersonalizado: string;
  slug: string;
}

export interface NavbarProps {
  itens: NavbarItem[];
  logo?: { asset: { _ref: string }; [key: string]: unknown };
  botaoPrincipal?: {
    titulo: string;
    slug: string;
  };
}
