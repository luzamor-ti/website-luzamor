"use client";

import Image from "next/image";
import { Project } from "@/sanity/lib/types/project";
import { SectionHeader } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { urlFor } from "@/sanity/lib/image";
import { Rocket } from "lucide-react";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(1600).height(700).url()
    : null;

  return (
    <section className="relative min-h-[95vh] md:min-h-[90vh] flex items-end">
      {imageUrl ? (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src={imageUrl}
            alt={project.coverImage?.alt || project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-16 pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="flex flex-wrap gap-3 mb-6"
        >
          {project.futurProject && (
            <span className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              <Rocket size={14} />
              Projeto Futuro
            </span>
          )}
        </motion.div>
        <SectionHeader
          tag="Projeto"
          title={project.title}
          description={project.shortDescription}
          align="left"
          variant="dark"
        />
      </div>
    </section>
  );
}
