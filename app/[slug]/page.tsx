import { notFound } from "next/navigation";
import {
  ProjetosTemplate,
  SobreNosTemplate,
  ContatoTemplate,
  SalasAulaTemplate,
  AuditorioTemplate,
  DiretoriaTemplate,
  PalabraPresidenteTemplate,
  PatrocinadorTemplate,
  CalendarioEventosTemplate,
  CursosTemplate,
} from "@/components/page-templates";
import { Pagina, TipoPagina } from "@/sanity/lib/types/pagina";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mapeamento de slugs para templates e informações básicas
const pageConfig: Record<
  string,
  {
    component: React.ComponentType<{ pagina: Pagina }>;
    tipoPagina: TipoPagina;
    titulo: string;
  }
> = {
  projetos: {
    component: ProjetosTemplate,
    tipoPagina: "projetos",
    titulo: "Projetos",
  },
  "sobre-nos": {
    component: SobreNosTemplate,
    tipoPagina: "sobre-nos",
    titulo: "Sobre Nós",
  },
  "salas-aula": {
    component: SalasAulaTemplate,
    tipoPagina: "salas-aula",
    titulo: "Salas de Aula",
  },
  contato: {
    component: ContatoTemplate,
    tipoPagina: "contato",
    titulo: "Contato",
  },
  auditorio: {
    component: AuditorioTemplate,
    tipoPagina: "auditorio",
    titulo: "Auditório",
  },
  diretoria: {
    component: DiretoriaTemplate,
    tipoPagina: "diretoria",
    titulo: "Diretoria",
  },
  "palavra-presidente": {
    component: PalabraPresidenteTemplate,
    tipoPagina: "palavra-presidente",
    titulo: "Palavra do Presidente",
  },
  patrocinador: {
    component: PatrocinadorTemplate,
    tipoPagina: "patrocinador",
    titulo: "Patrocinador",
  },
  "calendario-eventos": {
    component: CalendarioEventosTemplate,
    tipoPagina: "calendario-eventos",
    titulo: "Calendário de Eventos",
  },
  cursos: {
    component: CursosTemplate,
    tipoPagina: "cursos",
    titulo: "Cursos",
  },
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const config = pageConfig[slug];

  if (!config) {
    notFound();
  }

  // Cria um objeto Pagina básico com os dados fixos
  const pagina: Pagina = {
    _id: slug,
    _type: "pagina",
    titulo: config.titulo,
    slug: { current: slug },
    tipoPagina: config.tipoPagina,
    ativo: true,
  };

  const TemplateComponent = config.component;

  return <TemplateComponent pagina={pagina} />;
}
