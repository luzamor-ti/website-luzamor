"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
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
import { ArrowRight } from "lucide-react";

const InitiativesSection = () => {
  const initiatives = [
    {
      title: "Terra Celta",
      subtitle: "8 de fev. de 2026",
    },
    {
      title: "Coral Infantil",
      subtitle: "com Maria Ísis",
    },
    {
      title: "Violino",
      subtitle: "com Maria Ísis",
    },
  ];

  return (
    <Section className="bg-gray-900 text-white">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        variants={staggerItemVariants}
      >
        <div>
          <Tag className="mb-4">Nosso trabalho</Tag>
          <Heading level={2} className="text-white">
            Nossas iniciativas que transformam
          </Heading>
        </div>
        <Text variant="muted" className="text-gray-400 max-w-xs md:text-right">
          Temos cursos e eventos para todas as idades e gostos, confira.
        </Text>
      </motion.div>
      <Grid cols={3} gap="lg">
        {initiatives.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800 border-gray-700 overflow-hidden"
            padding="sm"
          >
            <div className="bg-gradient-to-br from-gray-700 to-gray-600 h-56"></div>
            <div className="p-6">
              <Heading level={3} className="text-white mb-2">
                {item.title}
              </Heading>
              <Text variant="muted" className="text-gray-400 mb-6">
                {item.subtitle}
              </Text>
              <Button variant="primary" fullWidth>
                Saiba mais <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </Grid>
      <motion.div className="text-center mt-12" variants={staggerItemVariants}>
        <Link
          href="#"
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          Ver todos os trabalhos
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </Section>
  );
};

export default InitiativesSection;
