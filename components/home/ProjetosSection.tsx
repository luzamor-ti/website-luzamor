"use client";

import { motion } from "framer-motion";
import { Projeto } from "@/sanity/lib/types/projeto";
import {
  staggerContainerVariants,
  staggerItemVariants,
  hoverLiftVariants,
} from "@/lib/animations";

interface ProjetosSectionProps {
  data: Projeto[];
}

export function ProjetosSection({ data }: ProjetosSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12"
          variants={staggerItemVariants}
        >
          Nossas iniciativas que transformam
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
        >
          {data.map((projeto) => (
            <motion.div
              key={projeto._id}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              variants={staggerItemVariants}
              whileHover="hover"
              initial="initial"
              animate="initial"
            >
              <motion.div variants={hoverLiftVariants}>
                <h3 className="text-xl font-bold mb-2">{projeto.titulo}</h3>
                <p className="text-gray-600 mb-4">{projeto.descricaoCurta}</p>
                {projeto.valorMeta && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-500">
                      Meta: R$ {projeto.valorMeta.toLocaleString("pt-BR")}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
