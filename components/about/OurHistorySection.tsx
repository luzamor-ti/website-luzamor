"use client";

import { OurHistory, TimelineItem } from "@/sanity/lib/types/about";
import { ABOUT_PAGE_FALLBACKS } from "@/constants/textFallbacks";
import { Section, Heading, Text } from "@/components/ui";
import { motion, useScroll } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import { useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface OurHistorySectionProps {
  data: OurHistory | null;
}

type TimelineItemUnion =
  | TimelineItem
  | { year: string; tagline?: string; title?: string; description?: string };

export function OurHistorySection({ data }: OurHistorySectionProps) {
  const fallback = ABOUT_PAGE_FALLBACKS.history;
  const timeline = data?.timeline || fallback.timeline;
  const containerRef = useRef<HTMLDivElement>(null);

  // Controla o progresso da linha verde baseado no scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const getItemData = (item: TimelineItemUnion) => {
    if ("ano" in item) {
      return {
        ano: item.ano,
        tagline: item.tagline,
        titulo: item.titulo,
        descricao: item.descricao,
        imagem: item.imagem,
      };
    }
    return {
      ano: item.year,
      tagline: item.tagline,
      titulo: item.title,
      descricao: item.description,
      imagem: undefined,
    };
  };
  console.log(data, timeline);
  return (
    <Section>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div
          variants={staggerItemVariants}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          {(data?.tagline || fallback.tagline) && (
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium uppercase tracking-wide">
              {data?.tagline || fallback.tagline}
            </span>
          )}
          <Heading level={2} className="text-neutral-dark">
            {data?.titulo || fallback.title}
          </Heading>
          {(data?.descricao || fallback.description) && (
            <Text variant="large" className="text-neutral-medium">
              {data?.descricao || fallback.description}
            </Text>
          )}
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={containerRef}
          variants={staggerContainerVariants}
          className="relative max-w-7xl mx-auto"
        >
          {/* Linha vertical - apenas desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 z-0" />

          <motion.div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-primary origin-top z-10"
            style={{
              scaleY: scrollYProgress,
            }}
          />

          {/* Items da timeline */}
          <div className="relative z-20 space-y-12 md:space-y-32">
            {timeline.map((item: TimelineItemUnion, index: number) => {
              const { ano, tagline, titulo, descricao, imagem } =
                getItemData(item);
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12 md:items-start"
                >
                  {/* Layout Mobile */}
                  <div className="md:hidden space-y-3 border-l-2 border-primary pl-6 py-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-3xl font-bold text-primary block mb-3">
                        {ano}
                      </span>
                    </motion.div>

                    {imagem && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(imagem).width(600).height(400).url()}
                          alt={titulo || ano}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {tagline && (
                      <div className="mb-2">
                        <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                          {tagline}
                        </span>
                      </div>
                    )}
                    <Heading level={3} className="text-neutral-dark mb-3">
                      {titulo}
                    </Heading>
                    {descricao && (
                      <p className="text-neutral-dark/70 text-sm leading-relaxed">
                        {descricao}
                      </p>
                    )}
                  </div>

                  {/* Layout Desktop */}
                  {/* Lado esquerdo - desktop apenas */}
                  {isLeft ? (
                    <div className="hidden md:block" />
                  ) : (
                    <motion.div
                      className="hidden md:block text-right pr-8"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {imagem && (
                        <div className="mb-4 rounded-lg overflow-hidden ml-auto max-w-lg">
                          <Image
                            src={urlFor(imagem).width(600).height(400).url()}
                            alt={titulo || ano}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      {tagline && (
                        <div className="mb-3">
                          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                            {tagline}
                          </span>
                        </div>
                      )}
                      <Heading
                        level={2}
                        className="text-neutral-dark mb-4 text-right"
                      >
                        {titulo}
                      </Heading>
                      {descricao && (
                        <p className="text-neutral-dark/70 text-base leading-relaxed max-w-lg ml-auto">
                          {descricao}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Centro: Ano - desktop apenas */}
                  <div className="hidden md:flex relative flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="relative bg-[var(--color-bg)] px-4 py-2"
                    >
                      <span className="text-[64px] font-bold text-neutral-dark leading-none block whitespace-nowrap">
                        {ano}
                      </span>
                    </motion.div>
                  </div>

                  {/* Lado direito - desktop apenas */}
                  {isLeft ? (
                    <motion.div
                      className="hidden md:block text-left pl-8"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {imagem && (
                        <div className="mb-4 rounded-lg overflow-hidden max-w-lg">
                          <Image
                            src={urlFor(imagem).width(600).height(400).url()}
                            alt={titulo || ano}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      {tagline && (
                        <div className="mb-3">
                          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                            {tagline}
                          </span>
                        </div>
                      )}
                      <Heading level={2} className="text-neutral-dark mb-4">
                        {titulo}
                      </Heading>
                      {descricao && (
                        <p className="text-neutral-dark/70 text-base leading-relaxed max-w-lg">
                          {descricao}
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
