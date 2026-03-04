"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerItemVariants } from "@/lib/animations";
import { Section, SectionHeader, Button, Text } from "@/components/ui";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { routesPath } from "@/constants/routesPath";

interface IntroSectionProps {
  data: HomeSection | null;
}

const IntroSection = ({ data }: IntroSectionProps) => {
  const section = data || null;
  const fallback = TEXT_FALLBACKS.intro;
  const imageUrl = section?.image?.asset?.url;

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div variants={staggerItemVariants}>
          <SectionHeader
            tag={section?.tag || fallback.tag}
            title={section?.title || fallback.title}
          />
          <Text variant="large" className="mb-8 leading-relaxed">
            {section?.description || fallback.description}
          </Text>
          <Button
            href={section?.buttonUrl || routesPath.about}
            variant="outline"
            showArrow
          >
            {section?.buttonText || fallback.buttonText}
          </Button>
        </motion.div>
        <motion.div variants={staggerItemVariants}>
          <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={section?.image?.alt || section?.title || "Imagem da seção"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <>
                {/* Padrão decorativo quando não há imagem */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-4 left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default IntroSection;
