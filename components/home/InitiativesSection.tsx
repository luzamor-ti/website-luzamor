"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  staggerItemVariants,
  staggerContainerVariants,
} from "@/lib/animations";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  Button,
  Card,
  Grid,
  Heading,
  Text,
  Link,
  SectionHeader,
} from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";

interface InitiativesSectionProps {
  data: HomeSection | null;
}

const InitiativesSection = ({ data }: InitiativesSectionProps) => {
  const section = data || null;
  const fallback = TEXT_FALLBACKS.initiatives;

  // Se não houver cards no CMS, não renderiza a seção
  if (!section?.cards || section.cards.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-900 text-white">
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
          variant="dark"
        />
        <Grid cols={3} gap="lg">
          {section.cards.map((item, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-2 border-gray-700 hover:border-primary overflow-hidden transition-all duration-300"
              padding="sm"
            >
              {item.image?.asset?._ref ? (
                <Image
                  src={buildSanityImageUrl(item.image.asset._ref)}
                  alt={item.title}
                  width={400}
                  height={224}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="bg-gray-700 h-56"></div>
              )}
              <div className="p-6">
                <Heading level={3} className="text-white mb-2">
                  {item.title}
                </Heading>
                {item.subtitle && (
                  <Text variant="muted" className="text-gray-400 mb-6">
                    {item.subtitle}
                  </Text>
                )}
                {item.url && (
                  <Button href={item.url} variant="primary" fullWidth showArrow>
                    {section.buttonText || fallback.buttonText}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </Grid>
        {section.linkUrl && (
          <motion.div
            className="text-center mt-12"
            variants={staggerItemVariants}
          >
            <Link
              href={section.linkUrl}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              {section.linkText || fallback.linkText}
            </Link>
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
};

export default InitiativesSection;
