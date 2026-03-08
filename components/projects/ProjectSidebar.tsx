"use client";

import Image from "next/image";
import { Project, ProjectOrganization } from "@/sanity/lib/types/project";
import { GlobalConfiguration } from "@/sanity/lib/types/configuration";
import { Button, Text } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { urlFor } from "@/sanity/lib/image";
import {
  CalendarDays,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
} from "lucide-react";
import { CounterAnimation } from "../animations/CounterAnimation";
import { ctaWhatsappGlobal } from "@/utils/ctaWhatsappGlobal";
import { formatDate } from "@/utils/dateFormatters";

interface ProjectSidebarProps {
  project: Project;
  globalConfig?: GlobalConfiguration | null;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function OrgBlock({
  org,
  label,
  icon: Icon,
}: {
  org: ProjectOrganization;
  label: string;
  icon: React.ElementType;
}) {
  const imgUrl = org.imagem ? urlFor(org.imagem).url() : null;

  return (
    <div className="pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-primary" />
        <Text
          variant="small"
          className="text-xs uppercase tracking-wide font-semibold text-gray-500"
        >
          {label}
        </Text>
      </div>
      <div className="flex items-center gap-3">
        {imgUrl && (
          <div className="relative h-10 w-24 flex-shrink-0">
            <Image
              src={imgUrl}
              alt={org.titulo || label}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
        )}
        {org.titulo && (
          <Text className="text-gray-700 font-medium">{org.titulo}</Text>
        )}
      </div>
    </div>
  );
}

export function ProjectSidebar({ project, globalConfig }: ProjectSidebarProps) {
  const hasGoal = project.goalAmount !== undefined && project.goalAmount > 0;
  const raised = project.raisedAmount ?? 0;
  const progressPercent =
    hasGoal && project.goalAmount
      ? Math.min(100, Math.round((raised / project.goalAmount) * 100))
      : 0;

  const ctaHref =
    ctaWhatsappGlobal(project.title, globalConfig?.contact?.whatsapp || "")
      ?.href || "Quero ajudar este projeto";
  // Realização: usa config global se não tiver cadastrado
  const realizacaoTitulo =
    project.realizacao?.titulo ||
    globalConfig?.heroTitle ||
    "Fundação Luz & Amor";
  const realizacaoImagem = project.realizacao?.imagem || globalConfig?.logo;
  const { dateFormatted: initialDate, weekday: initialWeekday } = project
    .deadline?.inicio
    ? formatDate(project.deadline.inicio)
    : { dateFormatted: "", weekday: "" };

  const { dateFormatted: finalDate, weekday: finalWeekday } = project.deadline
    ?.fim
    ? formatDate(project.deadline.fim)
    : { dateFormatted: "", weekday: "" };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Informações do Projeto
      </h2>

      {/* Valores */}
      {(hasGoal || raised > 0) && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20 space-y-4">
          {raised > 0 && (
            <div className="flex items-start gap-3">
              <TrendingUp
                size={20}
                className="text-primary mt-0.5 flex-shrink-0"
              />
              <div>
                <Text
                  variant="small"
                  className="text-xs uppercase tracking-wide font-semibold text-gray-500"
                >
                  Arrecadado
                </Text>
                <Text className="text-2xl font-extrabold text-primary">
                  {formatCurrency(raised)}
                </Text>
              </div>
            </div>
          )}

          {hasGoal && (
            <div className="flex items-start gap-3">
              <Target
                size={20}
                className="text-secondary mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <Text
                  variant="small"
                  className="text-xs uppercase tracking-wide font-semibold text-gray-500"
                >
                  Meta
                </Text>
                <Text className="text-lg font-bold text-gray-800">
                  {formatCurrency(project.goalAmount!)}
                </Text>
                {/* Progress bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-primary h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <Text variant="small" className="text-gray-500 mt-1">
                    <CounterAnimation
                      value={String(progressPercent)}
                      duration={2.5}
                    />
                    % do objetivo
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Button
        href={ctaHref || "#"}
        external
        variant="primary"
        size="md"
        fullWidth
        className="font-semibold "
        disabled={!ctaHref}
      >
        {ctaHref ? "Quero ajudar este projeto" : "Contato Indisponível"}
      </Button>
      <div className="border-t border-gray-200 mb-5" />

      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays size={18} className="text-primary" />
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
              Período
            </span>
          </div>
          {project.deadline?.inicio && (
            <>
              <p className="text-sm text-gray-900 font-medium mb-1">Início:</p>
              <p className="text-sm text-gray-600 mb-4">
                {`${initialWeekday}, ${initialDate}`}
              </p>
            </>
          )}
          <p className="text-sm text-gray-900 font-medium mb-1">Término:</p>
          <p className="text-sm text-gray-600">
            {project.deadline?.fim
              ? `${finalWeekday}, ${finalDate}`
              : "Sem data de término"}
          </p>
          <p className="text-sm text-gray-600"></p>
        </div>
      </div>

      {/* Realização */}
      <OrgBlock
        org={{ titulo: realizacaoTitulo, imagem: realizacaoImagem }}
        label="Realização"
        icon={Award}
      />

      {/* Incentivado Por */}
      {project.incentivadoPor?.titulo && (
        <OrgBlock
          org={project.incentivadoPor}
          label="Incentivado Por"
          icon={Lightbulb}
        />
      )}
    </motion.div>
  );
}
