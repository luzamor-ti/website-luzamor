"use client";

import { OurTeam } from "@/sanity/lib/types/about";
import { Member } from "@/sanity/lib/types/member";
import { ABOUT_PAGE_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, Heading, Text, Button } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { routesPath } from "@/constants/routesPath";

interface OurTeamSectionProps {
  data: OurTeam | null;
  members: Member[];
}

export function OurTeamSection({ data, members }: OurTeamSectionProps) {
  const fallback = ABOUT_PAGE_FALLBACKS.team;
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const hasBio = (member: Member) => {
    return !!(member.fullBio || member.words);
  };

  // Garante que description seja string, não PortableText
  const getDescription = () => {
    const desc = data?.descricao;
    if (!desc) return fallback.description;

    // Se for string, retorna direto
    if (typeof desc === "string") return desc;

    // Se for array (PortableText), extrai o texto
    if (Array.isArray(desc)) {
      return desc
        .map((block) => {
          if (block._type === "block" && block.children) {
            return block.children.map((child) => child.text).join("");
          }
          return "";
        })
        .join("\n");
    }

    return fallback.description;
  };

  return (
    <Section className="bg-neutral-light">
      {/* Header - sempre visível */}
      <SectionHeader
        tag={data?.tag || fallback.tag}
        title={data?.titulo || fallback.title}
        description={getDescription()}
        layout="split"
        variant="light"
      />

      <AnimatePresence mode="wait">
        {!selectedMember ? (
          // Grid de Membros
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            {/* Mosaico Horizontal de Membros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {members && members.length > 0 ? (
                members.map((member, index) => {
                  // Padrão de layout alternado por linha
                  // Cada 2 membros formam uma linha
                  const rowIndex = Math.floor(index / 2);
                  const positionInRow = index % 2;

                  // Linha ímpar (0, 2, 4...): primeiro span-2, segundo span-1
                  // Linha par (1, 3, 5...): primeiro span-1, segundo span-2
                  let colSpan;
                  if (rowIndex % 2 === 0) {
                    // Linha ímpar
                    colSpan =
                      positionInRow === 0 ? "md:col-span-2" : "md:col-span-1";
                  } else {
                    // Linha par
                    colSpan =
                      positionInRow === 0 ? "md:col-span-1" : "md:col-span-2";
                  }

                  const memberHasBio = hasBio(member);

                  return (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      onClick={() => memberHasBio && setSelectedMember(member)}
                      className={`group relative rounded-2xl overflow-hidden ${colSpan} ${memberHasBio ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {/* Imagem de fundo */}
                      {member.photo ? (
                        <Image
                          src={urlFor(member.photo)
                            .width(800)
                            .height(800)
                            .url()}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/60 flex items-center justify-center">
                          <span className="text-8xl text-white/40 font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Overlay escuro */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Nome e Cargo - canto inferior esquerdo */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <Heading level={4} className="text-white mb-1">
                          {member.name}
                        </Heading>
                        {member.role && (
                          <Text variant="small" className="text-white/80">
                            {member.role}
                          </Text>
                        )}

                        {/* Indicador de que tem bio */}
                        {memberHasBio && (
                          <div className="mt-2 text-xs text-primary font-medium flex items-center gap-1">
                            <span>Ver mais</span>
                            <svg
                              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <Text className="text-neutral-medium">
                    Nenhum membro cadastrado ainda.
                  </Text>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // Detalhes do Membro Selecionado
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-12 space-y-8"
          >
            {/* Botão Voltar */}
            <motion.button
              onClick={() => setSelectedMember(null)}
              className="flex items-center gap-2 text-neutral-dark hover:text-primary transition-colors group cursor-pointer"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-medium">Voltar para o time</span>
            </motion.button>

            {/* Conteúdo do Membro */}
            <div className="grid md:grid-cols-[350px_1fr] gap-12 items-start">
              {/* Foto */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-light shadow-2xl"
              >
                {selectedMember.photo ? (
                  <Image
                    src={urlFor(selectedMember.photo)
                      .width(500)
                      .height(667)
                      .url()}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <span className="text-9xl text-primary/40 font-bold">
                      {selectedMember.name.charAt(0)}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Informações */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col space-y-8"
              >
                <div>
                  <Heading level={2} className="text-neutral-dark mb-3">
                    {selectedMember.name}
                  </Heading>
                  {selectedMember.role && (
                    <Text
                      variant="large"
                      className="text-primary font-semibold text-xl"
                    >
                      {selectedMember.role}
                    </Text>
                  )}
                </div>

                {/* Bio Curta */}
                {selectedMember.shortBio && (
                  <div className="p-6 bg-white rounded-xl border-l-4 border-primary">
                    <Text className="text-neutral-dark italic text-lg leading-relaxed">
                      {selectedMember.shortBio}
                    </Text>
                  </div>
                )}

                {/* Bio Completa */}
                {selectedMember.fullBio && (
                  <div className="prose prose-lg max-w-none text-neutral-dark">
                    <PortableText value={selectedMember.fullBio} />
                  </div>
                )}

                {/* Link para Palavra do Presidente */}
                {selectedMember.role === "Presidente" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-neutral-light"
                  >
                    <Button
                      href={routesPath.presidentWord}
                      variant="primary"
                      size="lg"
                      showArrow
                      className="w-full md:w-auto"
                    >
                      Leia a Palavra do Presidente
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
