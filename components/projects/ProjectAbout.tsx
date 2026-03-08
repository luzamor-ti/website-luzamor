"use client";

import { Project } from "@/sanity/lib/types/project";
import { Heading, Text } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/constants/portableTextComponents";

interface ProjectAboutProps {
  project: Project;
}

export function ProjectAbout({ project }: ProjectAboutProps) {
  if (!project.about && !project.shortDescription) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      <Heading level={3} className="mb-6 text-gray-800">
        Sobre o Projeto
      </Heading>

      {project.about ? (
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-primary">
          <PortableText
            value={project.about}
            components={portableTextComponents}
          />
        </div>
      ) : (
        <Text variant="large" className="text-gray-600 leading-relaxed">
          {project.shortDescription}
        </Text>
      )}
    </motion.div>
  );
}
