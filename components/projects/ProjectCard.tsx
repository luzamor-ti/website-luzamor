"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/sanity/lib/types/project";
import { Card, Heading, Text } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { urlFor } from "@/sanity/lib/image";
import { Target, TrendingUp, Rocket, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(600).height(360).url()
    : null;

  const hasGoal = project.goalAmount !== undefined && project.goalAmount > 0;
  const raised = project.raisedAmount ?? 0;
  const progressPercent =
    hasGoal && project.goalAmount
      ? Math.min(100, Math.round((raised / project.goalAmount) * 100))
      : 0;

  return (
    <motion.div variants={fadeInVariants} className="h-full">
      <Link href={`/projeto/${project.slug.current}`}>
        <Card
          className="overflow-hidden h-full group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-gray-100"
          padding="sm"
        >
          {/* Image */}
          <div className="relative h-52 w-full overflow-hidden rounded-xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.coverImage?.alt || project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Target size={40} className="text-primary/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {project.futurProject && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-accent/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Rocket size={12} />
                Projeto Futuro
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <Heading
              level={4}
              className="text-gray-900 group-hover:text-primary transition-colors line-clamp-2"
            >
              {project.title}
            </Heading>

            {project.shortDescription && (
              <Text
                variant="small"
                className="text-gray-500 line-clamp-2 leading-relaxed"
              >
                {project.shortDescription}
              </Text>
            )}

            {/* Progress */}
            {(hasGoal || raised > 0) && (
              <div className="space-y-2 pt-1">
                {hasGoal && (
                  <div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-primary" />
                        <Text
                          variant="small"
                          className="text-primary font-semibold"
                        >
                          {formatCurrency(raised)}
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target size={12} className="text-gray-400" />
                        <Text variant="small" className="text-gray-400">
                          {formatCurrency(project.goalAmount!)}
                        </Text>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-1 pt-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
              Ver projeto <ArrowRight size={14} />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
