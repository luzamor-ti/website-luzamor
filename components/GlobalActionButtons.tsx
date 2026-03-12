"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Gift } from "lucide-react";
import { routesPath } from "@/constants/routesPath";
import { getWhatsappContactUrl } from "@/utils/ctaWhatsappGlobal";

interface GlobalActionButtonsProps {
  whatsappNumber?: string;
}

export function GlobalActionButtons({
  whatsappNumber,
}: GlobalActionButtonsProps) {
  const whatsappUrl = whatsappNumber
    ? getWhatsappContactUrl(whatsappNumber)
    : "#";

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {/* Quero Apoiar Button - Circular with text */}
      <Link href={routesPath.sponsor}>
        <motion.button
          className="h-[64px] w-[64px] flex flex-col items-center justify-center bg-accent hover:bg-accent-hover hover:scale-110 rounded-full shadow-lg transition-colors transition-transform duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Quero apoiar"
        >
          <Gift size={24} className="text-white mb-0.5" />
          <span className="text-white text-wrap text-[9px] font-bold text-center leading-tight">
            QUERO APOIAR
          </span>
        </motion.button>
      </Link>

      {/* WhatsApp Button - Circular with icon only */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <motion.button
          className="h-[64px] w-[64px] cursor-pointer flex items-center justify-center bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contato via WhatsApp"
        >
          <Image
            src="/icons/whatsapp.svg"
            alt="WhatsApp"
            width={32}
            height={32}
          />
        </motion.button>
      </a>
    </motion.div>
  );
}
