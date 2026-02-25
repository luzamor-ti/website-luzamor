"use client";

import { Projeto } from "@/sanity/lib/types/projeto";
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Heading,
  Text,
} from "@/components/ui";

interface ProjectsSectionProps {
  data: Projeto[];
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <SectionHeader
        tag="Nossos projetos"
        title="Nossas iniciativas que transformam"
      />
      <Grid cols={3} gap="lg">
        {data.map((project) => (
          <Card key={project._id} padding="lg" hover={true}>
            <Heading level={4} className="mb-2">
              {project.titulo}
            </Heading>
            <Text className="mb-4">{project.descricaoCurta}</Text>
            {project.valorMeta && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <Text variant="small" className="text-gray-500">
                  Meta: R$ {project.valorMeta.toLocaleString("pt-BR")}
                </Text>
              </div>
            )}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
