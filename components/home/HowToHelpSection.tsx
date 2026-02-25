"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
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

const HowToHelpSection = () => {
  const cards: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[] = [
    {
      icon: Handshake,
      title: "Seja parceiro pessoa jurídica",
      description:
        "Seja um apoiador e ajude-nos a fazer cada vez mais e melhor.",
    },
    {
      icon: DollarSign,
      title: "Faça uma doação",
      description:
        "Contribua financeiramente e ajude a manter nossos projetos ativos.",
    },
    {
      icon: GraduationCap,
      title: "Venha fazer nossos cursos",
      description:
        "Desenvolva novas habilidades com profissionais extremamente competentes.",
    },
    {
      icon: Heart,
      title: "Seja parceiro pessoa física",
      description:
        "Ajude diretamente como pessoa física e contribua para melhorias.",
    },
  ];

  return (
    <Section className="bg-gray-50">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        variants={staggerItemVariants}
      >
        <div>
          <Tag className="mb-4">Como você pode nos ajudar</Tag>
          <Heading level={2}>Unidos, nós transformamos</Heading>
        </div>
        <Text className="text-gray-600 max-w-xs md:text-right">
          Fomentando a cultura e melhorando a qualidade de vida da nossa cidade.
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
          href="#"
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          Junte-se à nossa missão
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </Section>
  );
};

export default HowToHelpSection;
