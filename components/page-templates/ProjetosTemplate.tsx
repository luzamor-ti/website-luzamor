"use client";

import { Page } from "@/sanity/lib/types/page";
import { Project } from "@/sanity/lib/types/project";
import { Section, Heading, Text, SectionHeader } from "@/components/ui";
import { ProjectCard } from "@/components/projects";
import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { FolderOpen } from "lucide-react";

interface ProjetosTemplateProps {
  pagina: Page;
  projects: Project[];
}

export function ProjetosTemplate({ pagina, projects }: ProjetosTemplateProps) {
  const futureProjects = projects.filter((p) => p.futurProject);
  const activeProjects = projects.filter((p) => !p.futurProject);

  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Heading level={1} className="text-gray-900 mb-4">
            {pagina.title}
          </Heading>
          {pagina.description && (
            <Text variant="large" className="max-w-2xl mx-auto text-gray-600">
              {pagina.description}
            </Text>
          )}
        </div>
      </section>

      {/* Projetos em Andamento */}
      {activeProjects.length > 0 && (
        <Section>
          <SectionHeader
            tag="Projetos"
            title="Em Andamento"
            description="Iniciativas que estão transformando vidas agora"
          />
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          >
            {activeProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        </Section>
      )}

      {/* Projetos Futuros */}
      {futureProjects.length > 0 && (
        <Section className="bg-gray-50">
          <SectionHeader
            tag="Em Breve"
            title="Projetos Futuros"
            description="O que vem por aí: projetos que estamos planejando"
          />
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          >
            {futureProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        </Section>
      )}

      {/* Estado vazio */}
      {projects.length === 0 && (
        <Section>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FolderOpen size={64} className="text-gray-200 mb-6" />
            <Heading level={3} className="text-gray-400 mb-2">
              Nenhum projeto cadastrado ainda
            </Heading>
            <Text variant="muted">
              Em breve novos projetos serão publicados aqui.
            </Text>
          </div>
        </Section>
      )}
    </main>
  );
}
