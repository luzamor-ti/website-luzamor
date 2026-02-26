"use client";

import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, Grid, Heading, Text, SectionHeader } from "@/components/ui";
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
    <Section>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          description={section?.description || fallback.description}
          layout="split"
          variant="light"
        />

        {/* Grid de cards com imagens */}
        <Grid cols={3} gap="lg">
          {impacts?.map((item, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden h-[400px] group cursor-pointer"
              variants={staggerItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              role="article"
              aria-label={`Impacto: ${item.title}`}
            >
              {/* Imagem de fundo */}
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(800).height(800).url()}
                  alt={`Imagem representativa de ${item.title}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
              )}

              {/* Overlay escuro com toque de cor */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-primary/20 group-hover:from-black/70 transition-all duration-300" />

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
      </motion.div>
    </Section>
  );
};

export default ImpactSection;
