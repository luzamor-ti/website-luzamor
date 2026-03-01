"use client";

import { AboutHero } from "@/sanity/lib/types/about";
import { ABOUT_PAGE_FALLBACKS } from "@/constants/textFallbacks";
import { Heading, Text } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface AboutHeroSectionProps {
  data: AboutHero | null;
}

export function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const fallback = ABOUT_PAGE_FALLBACKS.hero;
  const backgroundImage = data?.imagemFundo
    ? urlFor(data.imagemFundo).width(1920).height(800).url()
    : null;

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Imagem de fundo */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt={data?.titulo || fallback.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark to-neutral-dark/80" />
      )}

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="max-w-3xl space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Tag */}
          {(data?.tag || fallback.tag) && (
            <motion.div variants={fadeInVariants}>
              <span className="inline-block px-4 py-2 border-2 border-primary text-primary rounded-full text-sm font-medium uppercase tracking-wide">
                {data?.tag || fallback.tag}
              </span>
            </motion.div>
          )}

          {/* Título */}
          <motion.div variants={slideUpVariants}>
            <Heading
              level={1}
              className="text-white text-5xl md:text-6xl lg:text-7xl"
            >
              {data?.titulo || fallback.title}
            </Heading>
          </motion.div>

          {/* Subtítulo */}
          {(data?.subtitulo || fallback.subtitle) && (
            <motion.div variants={slideUpVariants}>
              <Text
                variant="large"
                className="text-white/90 max-w-2xl text-lg md:text-xl"
              >
                {data?.subtitulo || fallback.subtitle}
              </Text>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
