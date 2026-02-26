"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { Section, SectionHeader, Button, Text } from "@/components/ui";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";

interface IntroSectionProps {
  data: HomeSection | null;
}

const IntroSection = ({ data }: IntroSectionProps) => {
  const section = data || null;
  const fallback = TEXT_FALLBACKS.intro;

  return (
    <Section className="bg-white">
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
            href={section?.buttonUrl || "/sobre-nos"}
            variant="outline"
            showArrow
          >
            {section?.buttonText || fallback.buttonText}
          </Button>
        </motion.div>
        <motion.div variants={staggerItemVariants}>
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 rounded-2xl shadow-lg"></div>
        </motion.div>
      </div>
    </Section>
  );
};

export default IntroSection;
