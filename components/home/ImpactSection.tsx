"use client";

import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, Grid, Heading, Text } from "@/components/ui";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ImpactSectionProps {
  data: HomeSection | null;
}

const ImpactSection = ({ data }: ImpactSectionProps) => {
  const section = data || null;
  const fallback = TEXT_FALLBACKS.impact;

  const impacts = section?.cards || fallback.cards;

  return (
    <Section className="bg-gray-50">
      {/* Header customizado com título à esquerda e descrição à direita */}
      <motion.div
        className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="flex flex-col items-start"
          variants={staggerItemVariants}
        >
          {(section?.tag || fallback.tag) && (
            <div className="flex items-center gap-2 mb-4">
              <div
                className="bg-primary rounded-full flex-shrink-0"
                style={{ width: "16px", height: "16px" }}
              />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                {section?.tag || fallback.tag}
              </span>
            </div>
          )}
          <Heading level={2} className="text-gray-900 max-w-xl">
            {section?.title || fallback.title}
          </Heading>
        </motion.div>

        {(section?.description || fallback.description) && (
          <motion.div className="max-w-md" variants={staggerItemVariants}>
            <Text className="text-gray-600 leading-relaxed">
              {section?.description || fallback.description}
            </Text>
          </motion.div>
        )}
      </motion.div>

      {/* Grid de cards com imagens */}
      <Grid cols={3} gap="lg">
        {impacts.map((item, index) => (
          <motion.div
            key={index}
            className="relative rounded-2xl overflow-hidden h-[400px] group cursor-pointer"
            variants={staggerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Imagem de fundo */}
            {item.image ? (
              <Image
                src={urlFor(item.image).width(800).height(800).url()}
                alt={item.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
            )}

            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Conteúdo */}
            <div className="relative h-full flex flex-col justify-end p-8 text-white">
              {item.number && (
                <Heading
                  level={1}
                  className="text-primary mb-4 font-bold text-5xl"
                >
                  <CounterAnimation value={item.number} duration={2.5} />
                </Heading>
              )}
              <Heading level={4} className="text-white mb-3 font-semibold">
                {item.title}
              </Heading>
              <Text className="text-gray-200 leading-relaxed">
                {item.description}
              </Text>
            </div>
          </motion.div>
        ))}
      </Grid>
    </Section>
  );
};

export default ImpactSection;
