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
import { getEventsCalendarData } from "@/sanity/lib/services/eventService";
import { getPartnersPageData } from "@/sanity/lib/services/partnerService";
import { getProjectsPage } from "@/sanity/lib/services/projectService";
import { getClassrooms } from "@/sanity/lib/services/classroomService";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sala?: string }>;
}

// Tipo para os componentes de template
type TemplateComponent =
  | React.ComponentType<{ pagina: PageType }>
  | typeof CalendarioEventosTemplate
  | typeof PatrocinadorTemplate
  | typeof ProjetosTemplate;

// Mapeamento de slugs para templates e informações básicas
const pageConfig: Record<
  string,
  {
    component: TemplateComponent;
    pageType: PageTypeEnum;
    title: string;
    description?: string;
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
    description: "Confira os eventos futuros e passados da Fundação Luz & Amor",
  },
  cursos: {
    component: CursosTemplate,
    pageType: "cursos",
    title: "Cursos",
  },
};

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { sala } = await searchParams;

  // Special handling for classrooms page (before pageConfig lookup)
  if (slug === "salas-aula") {
    const classrooms = await getClassrooms();
    return <SalasAulaTemplate classrooms={classrooms} initialSlug={sala} />;
  }

  const config = pageConfig[slug];

  if (!config) {
    notFound();
  }

  // Cria um objeto Page básico com os dados fixos
  const pagina: PageType = {
    _id: slug,
    _type: "pagina",
    title: config.title,
    description: config.description,
    slug: { current: slug },
    pageType: config.pageType,
    active: true,
  };

  const TemplateComponent = config.component;

  // Special handling for projects page
  if (slug === "projetos") {
    const projects = await getProjectsPage();
    return <ProjetosTemplate pagina={pagina} projects={projects} />;
  }

  // Special handling for calendar events page
  if (slug === "calendario-eventos") {
    const { upcomingEvents, pastEvents } = await getEventsCalendarData();
    return (
      <CalendarioEventosTemplate
        pagina={pagina}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />
    );
  }

  // Special handling for partners page
  if (slug === "patrocinador") {
    const partnersData = await getPartnersPageData();
    return <PatrocinadorTemplate pagina={pagina} {...partnersData} />;
  }

  // For other templates, use the standard component
  const StandardTemplate = TemplateComponent as React.ComponentType<{
    pagina: PageType;
  }>;
  return <StandardTemplate pagina={pagina} />;
}
