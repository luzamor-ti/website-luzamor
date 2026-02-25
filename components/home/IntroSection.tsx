"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { Section, SectionHeader, Button, Text } from "@/components/ui";
import { ArrowRight } from "lucide-react";

const IntroSection = () => {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div variants={staggerItemVariants}>
          <SectionHeader
            tag="Conheça a nossa fundação"
            title="Uma fundação que pulsa Maringá"
          />
          <Text variant="large" className="mb-8 leading-relaxed">
            Somos uma instituição dedicada à preservação da memória, promoção da
            cultura e fomento à educação. Conectamos pessoas com conhecimento e
            experiências que transformam comunidades.
          </Text>
          <Button href="#" variant="outline">
            Saiba mais sobre nós
            <ArrowRight size={20} />
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
