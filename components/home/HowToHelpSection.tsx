"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  Card,
  Grid,
  Tag,
  Heading,
  Text,
  Link,
  Icon,
} from "@/components/ui";
import {
  Handshake,
  DollarSign,
  GraduationCap,
  Heart,
  ArrowRight,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Mapeamento de ícones disponíveis
const iconMap: Record<string, LucideIcon> = {
  Handshake,
  DollarSign,
  GraduationCap,
  Heart,
};

interface HowToHelpSectionProps {
  data: HomeSection | null;
}

const HowToHelpSection = ({ data }: HowToHelpSectionProps) => {
  const section = data || null;
  const fallback = TEXT_FALLBACKS.howToHelp;

  // Merge cards do CMS com ícones do fallback
  const cards = (section?.cards || fallback.cards).map((card, index) => ({
    ...card,
    icon: card.icon
      ? iconMap[card.icon] || Heart
      : iconMap[Object.keys(iconMap)[index] || "Heart"],
  }));

  return (
    <Section className="bg-gray-50">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        variants={staggerItemVariants}
      >
        <div>
          <Tag className="mb-4">{section?.tag || fallback.tag}</Tag>
          <Heading level={2}>{section?.title || fallback.title}</Heading>
        </div>
        <Text className="text-gray-600 max-w-xs md:text-right">
          {section?.description || fallback.description}
        </Text>
      </motion.div>
      <Grid cols={4} gap="md">
        {cards.map((card, index) => (
          <Card key={index} className="text-center" padding="lg">
            <div className="mb-6 flex justify-center">
              <Icon icon={card.icon} size={48} className="text-primary" />
            </div>
            <Heading level={5} className="mb-3">
              {card.title}
            </Heading>
            <Text className="text-gray-600">{card.description}</Text>
          </Card>
        ))}
      </Grid>
      <motion.div className="text-center mt-12" variants={staggerItemVariants}>
        <Link
          href={section?.linkUrl || "#"}
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          {section?.linkText || fallback.linkText}
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </Section>
  );
};

export default HowToHelpSection;
