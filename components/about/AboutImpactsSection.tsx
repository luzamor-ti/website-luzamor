"use client";

import { ImpactsSection, ImpactItem } from "@/sanity/lib/types/about";
import { ABOUT_PAGE_FALLBACKS } from "@/constants/textFallbacks";
import { Section, Grid, Heading, Text } from "@/components/ui";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface AboutImpactsSectionProps {
  data: ImpactsSection | null;
}

type ImpactItemUnion =
  | ImpactItem
  | { number: string; title: string; description?: string; icon?: string };

const portableTextComponents = {
  marks: {
    highlight: ({ children }: { children: React.ReactNode }) => (
      <span className="text-primary font-semibold">{children}</span>
    ),
  },
};

export function AboutImpactsSection({ data }: AboutImpactsSectionProps) {
  const fallback = ABOUT_PAGE_FALLBACKS.impacts;
  const impacts = data?.items || fallback.items;

  const getItemData = (item: ImpactItemUnion) => {
    if ("numero" in item) {
      return {
        numero: item.numero,
        titulo: item.titulo,
        descricao: item.descricao,
        icone: item.icone,
      };
    }
    return {
      numero: item.number,
      titulo: item.title,
      descricao: item.description,
      icone: item.icon || "Circle",
    };
  };

  return (
    <Section className="bg-neutral-light">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16"
      >
        {/* Texto Introdutório */}
        {(data?.textoIntrodutorio || fallback.introText) && (
          <motion.div
            variants={staggerItemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            {data?.textoIntrodutorio ? (
              <h3 className="text-[32px] font-medium leading-relaxed text-neutral-dark">
                <PortableText
                  value={data.textoIntrodutorio}
                  components={portableTextComponents}
                />
              </h3>
            ) : (
              <h3 className="text-[32px] font-medium leading-relaxed text-neutral-dark">
                {fallback.introText}
              </h3>
            )}
          </motion.div>
        )}

        {/* Grid de Impactos + Imagem */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Grid de 4 impactos */}
          <div className="order-2 lg:order-1 flex">
            <Grid cols={2} gap="md" className="w-full">
              {impacts.map((item: ImpactItemUnion, index: number) => {
                const { numero, titulo, descricao, icone } = getItemData(item);

                return (
                  <motion.div
                    key={index}
                    variants={staggerItemVariants}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Ícone */}
                    <div className="mb-4">
                      <DynamicIcon
                        name={icone}
                        className="w-10 h-10 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Número */}
                    <Heading level={2} className="text-primary mb-2 font-bold">
                      <CounterAnimation value={numero} duration={2.5} />
                    </Heading>

                    {/* Título */}
                    <Heading level={5} className="text-neutral-dark mb-2">
                      {titulo}
                    </Heading>

                    {/* Descrição */}
                    {descricao && (
                      <Text variant="small" className="text-neutral-medium">
                        {descricao}
                      </Text>
                    )}
                  </motion.div>
                );
              })}
            </Grid>
          </div>

          {/* Imagem Ilustrativa */}
          <motion.div
            variants={staggerItemVariants}
            className="order-1 lg:order-2 relative min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden"
          >
            {data?.imagem ? (
              <Image
                src={urlFor(data.imagem).width(800).height(800).url()}
                alt="Ilustração de nosso impacto"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
            )}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
