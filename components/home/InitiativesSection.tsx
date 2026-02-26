"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerItemVariants } from "@/lib/animations";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  Button,
  Card,
  Grid,
  Tag,
  Heading,
  Text,
  Link,
} from "@/components/ui";

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
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        variants={staggerItemVariants}
      >
        <div>
          <Tag className="mb-4">{section?.tag || fallback.tag}</Tag>
          <Heading level={2} className="text-white">
            {section?.title || fallback.title}
          </Heading>
        </div>
        <Text variant="muted" className="text-gray-400 max-w-xs md:text-right">
          {section?.description || fallback.description}
        </Text>
      </motion.div>
      <Grid cols={3} gap="lg">
        {section.cards.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800 border-gray-700 overflow-hidden"
            padding="sm"
          >
            {item.image?.asset?.url ? (
              <Image
                src={item.image.asset.url}
                alt={item.title}
                width={400}
                height={224}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-700 to-gray-600 h-56"></div>
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
    </Section>
  );
};

export default InitiativesSection;
