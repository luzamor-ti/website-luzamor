"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/constants/portableTextComponents";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Heading, Text } from "@/components/ui";
import { Course } from "@/sanity/lib/types/course";
import { useEffect, useCallback } from "react";

// ──────────────────────────────────────────────
// Tipo normalizado do professor (membro ou externo)
// ──────────────────────────────────────────────
export interface NormalizedProfessor {
  name: string;
  role?: string;
  shortBio?: string;
  fullBio?: PortableTextBlock[];
  photoUrl: string | null;
}

/**
 * Normaliza dados do professor a partir do tipo union do Course.
 * Funciona tanto para membros quanto para professores externos.
 */
export function normalizeProfessor(
  teacher: NonNullable<Course["teachers"]>[number],
): NormalizedProfessor | null {
  if (teacher.teacherType === "membro" && teacher.teacherMember) {
    const m = teacher.teacherMember;
    return {
      name: m.name,
      role: m.role,
      shortBio: m.shortBio,
      fullBio: m.fullBio,
      photoUrl: buildSanityImageUrl(m.photo?.asset?._ref) || null,
    };
  }

  if (teacher.teacherType === "externo" && teacher.externalTeacher) {
    const e = teacher.externalTeacher;
    return {
      name: e.name,
      photoUrl: buildSanityImageUrl(e.photo?.asset?._ref) || null,
    };
  }

  return null;
}

// ──────────────────────────────────────────────
// Props do modal
// ──────────────────────────────────────────────
interface ProfessorModalProps {
  professor: NormalizedProfessor | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfessorModal({
  professor,
  isOpen,
  onClose,
}: ProfessorModalProps) {
  // Fecha com tecla Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && professor && (
        <motion.div
          key="professor-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes de ${professor.name}`}
        >
          <motion.div
            key="professor-modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-14 items-start">
              {/* Coluna da foto */}
              <div className="relative w-full md:w-[320px] aspect-[3/4] shrink-0">
                {professor.photoUrl ? (
                  <Image
                    src={professor.photoUrl}
                    alt={professor.name}
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl shadow-xl">
                    <span className="text-9xl text-primary/40 font-bold">
                      {professor.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Coluna de informações */}
              <div className="flex-1 flex flex-col pt-2">
                <div>
                  <Heading level={1} className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                    {professor.name}
                  </Heading>
                  {professor.role && (
                    <Text
                      variant="large"
                      className="text-[#00b341] font-bold text-xl mb-8"
                    >
                      {professor.role}
                    </Text>
                  )}
                </div>

                {/* Bio Curta — estilo citação */}
                {professor.shortBio && (
                  <div className="border-l-[3px] border-[#00b341] pl-6 py-2 mb-8">
                    <Text className="text-gray-600 italic text-lg leading-relaxed font-medium">
                      {professor.shortBio}
                    </Text>
                  </div>
                )}

                {/* Bio Completa — PortableText */}
                {professor.fullBio && professor.fullBio.length > 0 && (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText
                      value={professor.fullBio}
                      components={portableTextComponents}
                    />
                  </div>
                )}

                {/* Caso não tenha bio nenhuma */}
                {!professor.shortBio &&
                  (!professor.fullBio || professor.fullBio.length === 0) && (
                    <Text className="text-gray-400 italic">
                      Informações adicionais em breve.
                    </Text>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
