"use client";
import { fadeInVariants } from "@/lib/animations";
import { Section } from "../ui";
import { Heading } from "@/components/ui";
import { motion } from "framer-motion";
import { Project } from "@/sanity/lib";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectGallerySection({ project }: { project: Project }) {
  if (!project.gallery || project.gallery.length === 0) return null;
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="max-w-7xl mx-auto"
      >
        <Heading level={3} className="mb-6 text-gray-800 text-center">
          Galeria de Fotos
        </Heading>
        <ProjectGallery images={project.gallery} projectTitle={project.title} />
      </motion.div>
    </Section>
  );
}
