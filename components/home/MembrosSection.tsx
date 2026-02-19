"use client";

import { motion } from "framer-motion";
import { Membro } from "@/sanity/lib/types/membro";
import {
  staggerContainerVariants,
  staggerItemVariants,
  scaleInVariants,
} from "@/lib/animations";

interface MembrosSectionProps {
  data: Membro[];
}

export function MembrosSection({ data }: MembrosSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="py-20 px-4 bg-gray-50"
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
          Nossa Equipe
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerContainerVariants}
        >
          {data.map((membro) => (
            <motion.div
              key={membro._id}
              className="text-center"
              variants={scaleInVariants}
            >
              <div className="mb-4">
                <motion.h3
                  className="text-lg font-bold"
                  variants={staggerItemVariants}
                >
                  {membro.nome}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600"
                  variants={staggerItemVariants}
                >
                  {membro.cargo}
                </motion.p>
                {membro.bioCurta && (
                  <motion.p
                    className="text-sm text-gray-500 mt-2"
                    variants={staggerItemVariants}
                  >
                    {membro.bioCurta}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
