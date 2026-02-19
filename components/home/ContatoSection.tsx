"use client";

import { motion } from "framer-motion";
import { Contato } from "@/sanity/lib/types/contato";
import {
  staggerContainerVariants,
  staggerItemVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
} from "@/lib/animations";

interface ContatoSectionProps {
  data: Contato[];
}

export function ContatoSection({ data }: ContatoSectionProps) {
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
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12"
          variants={staggerItemVariants}
        >
          Contato
        </motion.h2>
        <motion.div className="space-y-6" variants={staggerContainerVariants}>
          {data.map((contato, index) => (
            <motion.div
              key={contato._id}
              className="border rounded-lg p-6 bg-white"
              variants={
                index % 2 === 0
                  ? slideInFromLeftVariants
                  : slideInFromRightVariants
              }
            >
              {contato.email && (
                <motion.div className="mb-3" variants={staggerItemVariants}>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${contato.email}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {contato.email}
                  </a>
                </motion.div>
              )}
              {contato.telefone && (
                <motion.div className="mb-3" variants={staggerItemVariants}>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <a
                    href={`tel:${contato.telefone}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {contato.telefone}
                  </a>
                </motion.div>
              )}
              {contato.endereco && (
                <motion.div variants={staggerItemVariants}>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-medium">{contato.endereco}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
