"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Faq } from "@/sanity/lib/types/faq";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface FaqSectionProps {
  data: Faq[];
}

export function FaqSection({ data }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

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
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12"
          variants={staggerItemVariants}
        >
          Perguntas Frequentes
        </motion.h2>
        <motion.div className="space-y-4" variants={staggerContainerVariants}>
          {data.map((item) => (
            <motion.div
              key={item._id}
              className="border rounded-lg overflow-hidden"
              variants={staggerItemVariants}
            >
              <motion.button
                onClick={() => setOpenId(openId === item._id ? null : item._id)}
                className="w-full p-4 text-left font-bold hover:bg-gray-100 transition flex justify-between items-center"
                whileHover={{ backgroundColor: "#f3f4f6" }}
              >
                {item.pergunta}
                <motion.span
                  animate={{ rotate: openId === item._id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm"
                >
                  +
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {openId === item._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 border-t"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="text-gray-700"
                    >
                      {item.resposta}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
