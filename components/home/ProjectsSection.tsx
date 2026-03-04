"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/sanity/lib/types/project";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  Heading,
  Text,
  SectionHeader,
  SectionFooter,
} from "@/components/ui";
import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface ProjectsSectionProps {
  data: Project[];
  section: HomeSection | null;
}

// Componente para cada card de projeto
function ProjectCard({
  project,
  isActive,
  cardRef,
}: {
  project: Project;
  isActive: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div
      ref={cardRef}
      className={`bg-white border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
        isActive
          ? "border-primary shadow-lg"
          : "border-secondary/20 hover:border-accent/40"
      }`}
    >
      {/* Imagem - visível apenas em mobile */}
      {project.coverImage && (
        <div className="relative h-64 lg:hidden">
          <Image
            src={urlFor(project.coverImage).width(800).height(600).url()}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Conteúdo do card */}
      <div className="p-8">
        {/* Categoria/Badge */}
        {project.category && (
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-accent to-primary text-white rounded-full text-sm font-medium mb-4 shadow-md">
            {project.category}
          </div>
        )}

        {/* Título */}
        <Heading level={3} className="text-gray-900 mb-3">
          {project.title}
        </Heading>

        {/* Descrição */}
        {project.shortDescription && (
          <Text className="text-gray-600 mb-6 leading-relaxed">
            {project.shortDescription}
          </Text>
        )}

        {/* Valores */}
        {(project.raisedAmount !== undefined || project.goalAmount) && (
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
            <div>
              <Text variant="small" className="text-gray-500 mb-1">
                Arrecadado
              </Text>
              <Text className="font-semibold text-gray-900">
                {project.raisedAmount !== undefined
                  ? formatCurrency(project.raisedAmount)
                  : "R$ 0,00"}
              </Text>
            </div>
            {project.goalAmount && (
              <div className="text-right">
                <Text variant="small" className="text-gray-500 mb-1">
                  Meta
                </Text>
                <Text className="font-semibold text-gray-900">
                  {formatCurrency(project.goalAmount)}
                </Text>
              </div>
            )}
          </div>
        )}

        {/* Botão */}
        <Link
          href={`/projetos/${project.slug.current}`}
          className="group inline-flex items-center gap-2 text-gray-900 font-medium hover:text-primary transition-colors duration-300"
        >
          <span>Quero ajudar este projeto</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export function ProjectsSection({ data, section }: ProjectsSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardHeight, setCardHeight] = useState(500);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let newActiveIndex = activeImageIndex; // Mantém o index atual por padrão
      let foundActiveCard = false;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const cardTop = rect.top + window.scrollY;
          const cardBottom = cardTop + rect.height;

          if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
            newActiveIndex = index;
            foundActiveCard = true;
          }
        }
      });

      // Se nenhum card está na viewport, mas estamos abaixo do último card,
      // mantenha o último index
      if (!foundActiveCard && cardRefs.current.length > 0) {
        const lastCard = cardRefs.current[cardRefs.current.length - 1];
        if (lastCard) {
          const rect = lastCard.getBoundingClientRect();
          const cardBottom = rect.top + window.scrollY + rect.height;

          // Se já passou do último card, mantém o último index
          if (scrollPosition > cardBottom) {
            newActiveIndex = cardRefs.current.length - 1;
          }
        }
      }

      setActiveImageIndex(newActiveIndex);

      // Atualizar altura da imagem para corresponder ao card ativo
      if (cardRefs.current[newActiveIndex]) {
        const activeCard = cardRefs.current[newActiveIndex];
        if (activeCard) {
          setCardHeight(activeCard.offsetHeight);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Chamar após um pequeno delay para garantir que os cards foram renderizados
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [data.length, activeImageIndex]);

  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.projects;
  const linkText =
    section?.linkText || fallback.linkText || "Ver todos os projetos";
  const linkUrl = section?.linkUrl || "/projetos";

  const activeProject = data[activeImageIndex];

  return (
    <Section>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          description={section?.description || fallback.description}
          variant="light"
          layout="split"
        />

        {/* Layout com imagem à esquerda e cards à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Container da imagem sticky - visível apenas em desktop */}
          <div className="hidden lg:block lg:sticky lg:top-32">
            <div
              className="relative rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 ease-out"
              style={{
                height: `${cardHeight}px`,
              }}
            >
              {activeProject?.coverImage && (
                <Image
                  key={activeImageIndex}
                  src={urlFor(activeProject.coverImage)
                    .width(800)
                    .height(1000)
                    .url()}
                  alt={activeProject.title}
                  fill
                  className="object-cover transition-opacity duration-500"
                  style={{
                    animation: "fadeIn 0.5s ease-in-out",
                  }}
                />
              )}
            </div>
          </div>

          {/* Coluna da direita - Cards de projetos */}
          <div className="space-y-6 lg:space-y-8">
            {data.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                isActive={index === activeImageIndex}
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <SectionFooter
        text={""}
        linkText={linkText}
        linkHref={linkUrl}
      ></SectionFooter>
    </Section>
  );
}
