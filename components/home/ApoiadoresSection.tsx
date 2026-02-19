"use client";

import { motion } from "framer-motion";
import { Apoiador } from "@/sanity/lib/types/apoiador";
import {
  staggerContainerVariants,
  staggerItemVariants,
  hoverLiftVariants,
} from "@/lib/animations";

interface ApoiadorSectionProps {
  data: Apoiador[];
}

export function ApoiadoresSection({ data }: ApoiadorSectionProps) {
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
          Nossos Apoiadores
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
        >
          {data.map((apoiador) => (
            <motion.div
              key={apoiador._id}
              className="border rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
              variants={staggerItemVariants}
              whileHover="hover"
              initial="initial"
              animate="initial"
            >
              <motion.div variants={hoverLiftVariants}>
                <h3 className="font-bold mb-2">{apoiador.nome}</h3>
                {apoiador.site && (
                  <a
                    href={apoiador.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Visitar site
                  </a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
