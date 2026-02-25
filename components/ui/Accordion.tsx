"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";

interface AccordionItemType {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemType[];
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Componente Accordion reutilizável
 * Ideal para FAQs, seções expansíveis, etc.
 */
export function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  item: AccordionItemType;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
      variants={staggerItemVariants}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 text-left font-semibold hover:bg-gray-50 transition flex justify-between items-center gap-4"
      >
        <span className="flex-1">{item.title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl text-gray-400 flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="p-4 bg-gray-50"
            >
              {item.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
