import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug } from "@/sanity/lib/services/projectService";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import {
  ProjectHero,
  ProjectAbout,
  ProjectSidebar,
  ProjectSupporters,
  ProjectEvents,
  ProjectGallerySection,
} from "@/components/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.title} | Fundação Luz & Amor`,
    description: project.shortDescription ?? "Projeto da Fundação Luz & Amor",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const [project, globalConfig] = await Promise.all([
    getProjectBySlug(slug),
    getGlobalConfiguration(),
  ]);

  if (!project) notFound();

  return (
    <main className="min-h-screen">
      <ProjectHero project={project} />

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            <ProjectAbout project={project} />
            <ProjectEvents project={project} />
            <ProjectSupporters project={project} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProjectSidebar project={project} globalConfig={globalConfig} />
            </div>
          </div>
        </div>
      </div>

      <ProjectGallerySection project={project} />
    </main>
  );
}
