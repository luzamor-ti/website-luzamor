"use client";

import { motion } from "framer-motion";
import { ConfiguracaoGlobal } from "@/sanity/lib/types/configuracao";
import { slideUpVariants, staggerContainerVariants } from "@/lib/animations";

interface HeroSectionProps {
  data: ConfiguracaoGlobal | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center p-10"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-center"
        variants={slideUpVariants}
      >
        {data?.tituloHero || "Transformando cultura em experiências reais"}
      </motion.h1>
      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-600 text-center max-w-2xl"
        variants={slideUpVariants}
      >
        {data?.subtituloHero ||
          "Uma fundação dedicada à preservação da memória, promoção da cultura e fomento à educação."}
      </motion.p>
    </motion.section>
  );
}
