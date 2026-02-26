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
import {
  type Page as PageType,
  type PageType as PageTypeEnum,
} from "@/sanity/lib/types/page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mapeamento de slugs para templates e informações básicas
const pageConfig: Record<
  string,
  {
    component: React.ComponentType<{ pagina: PageType }>;
    pageType: PageTypeEnum;
    title: string;
  }
> = {
  projetos: {
    component: ProjetosTemplate,
    pageType: "projetos",
    title: "Projetos",
  },
  "sobre-nos": {
    component: SobreNosTemplate,
    pageType: "sobre-nos",
    title: "Sobre Nós",
  },
  "salas-aula": {
    component: SalasAulaTemplate,
    pageType: "salas-aula",
    title: "Salas de Aula",
  },
  contato: {
    component: ContatoTemplate,
    pageType: "contato",
    title: "Contato",
  },
  auditorio: {
    component: AuditorioTemplate,
    pageType: "auditorio",
    title: "Auditório",
  },
  diretoria: {
    component: DiretoriaTemplate,
    pageType: "diretoria",
    title: "Diretoria",
  },
  "palavra-presidente": {
    component: PalabraPresidenteTemplate,
    pageType: "palavra-presidente",
    title: "Palavra do Presidente",
  },
  patrocinador: {
    component: PatrocinadorTemplate,
    pageType: "patrocinador",
    title: "Patrocinador",
  },
  "calendario-eventos": {
    component: CalendarioEventosTemplate,
    pageType: "calendario-eventos",
    title: "Calendário de Eventos",
  },
  cursos: {
    component: CursosTemplate,
    pageType: "cursos",
    title: "Cursos",
  },
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const config = pageConfig[slug];

  if (!config) {
    notFound();
  }

  // Cria um objeto Page básico com os dados fixos
  const pagina: PageType = {
    _id: slug,
    _type: "pagina",
    title: config.title,
    slug: { current: slug },
    pageType: config.pageType,
    active: true,
  };

  const TemplateComponent = config.component;

  return <TemplateComponent pagina={pagina} />;
}
