"use client";

import Image from "next/image";
import { Project } from "@/sanity/lib/types/project";
import { LinkButton } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { urlFor } from "@/sanity/lib/image";

interface ProjectSupportersProps {
  project: Project;
}

export function ProjectSupporters({ project }: ProjectSupportersProps) {
  if (!project.supporters || project.supporters.length === 0) return null;

  const supporters = project.supporters;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
      className="space-y-6"
    >
      <h3
        id="event-supporters-heading"
        className="text-xl md:text-2xl font-semibold text-gray-800"
      >
        Patrocinadores e Apoiadores
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supporters.map((supporter) => {
          const logoUrl = supporter.logo
            ? urlFor(supporter.logo as Parameters<typeof urlFor>[0])
                .width(200)
                .fit("max")
                .url()
            : null;

          const content = (
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={logoUrl}
                    alt={supporter.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-lg">
                    {supporter.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-sm font-semibold text-gray-800">
                {supporter.name}
              </span>
            </div>
          );

          return supporter.site ? (
            <LinkButton
              key={supporter._id}
              href={supporter.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar site: ${supporter.name}`}
              className="!justify-between"
            >
              {content}
            </LinkButton>
          ) : (
            <div key={supporter._id}>{content}</div>
          );
        })}
      </div>
    </motion.div>
  );
}
