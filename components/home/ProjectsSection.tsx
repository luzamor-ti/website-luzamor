"use client";

import { Project } from "@/sanity/lib/types/project";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Heading,
  Text,
} from "@/components/ui";

interface ProjectsSectionProps {
  data: Project[];
  section: HomeSection | null;
}

export function ProjectsSection({ data, section }: ProjectsSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.projects;

  return (
    <Section className="bg-white">
      <SectionHeader
        tag={section?.tag || fallback.tag}
        title={section?.title || fallback.title}
      />
      <Grid cols={3} gap="lg">
        {data.map((project) => (
          <Card key={project._id} padding="lg" hover={true}>
            <Heading level={4} className="mb-2">
              {project.title}
            </Heading>
            <Text className="mb-4">{project.shortDescription}</Text>
            {project.targetAmount && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <Text variant="small" className="text-gray-500">
                  Meta: R$ {project.targetAmount.toLocaleString("pt-BR")}
                </Text>
              </div>
            )}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
