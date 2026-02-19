export interface Projeto {
  _id: string;
  titulo: string;
  slug: string;
  imagemCapa: any;
  descricaoCurta?: string;
  conteudo?: any;
  valorMeta?: number;
  valorArrecadado?: number;
}
