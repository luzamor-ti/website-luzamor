"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MaintenancePageProps {
  message: string;
  primaryColor: string;
}

export function MaintenancePage({
  message,
  primaryColor,
}: MaintenancePageProps) {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}18 0%, #ffffff 100%)`,
      }}
    >
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          {/* Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="mb-8 flex justify-center"
          >
            <Image
              src="/illustrations/under-construction.svg"
              alt="Manutenção do site"
              width={500}
              height={400}
              priority
              className="w-full max-w-sm h-auto drop-shadow-md"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            Manutenção do Site
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed"
          >
            {message}
          </motion.p>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-gray-600"
          >
            Obrigado pela sua paciência. Estamos trabalhando para melhorar sua
            experiência.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
