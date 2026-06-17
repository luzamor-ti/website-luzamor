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

// ──────────────────────────────────────────────
// Hierarquia de exibição dos tipos de cargo
// ──────────────────────────────────────────────
const ROLE_TYPE_ORDER: Record<string, number> = {
  presidente: 1,
  "vice-presidente": 2,
  diretor: 3,
  secretario: 4,
  tesoureiro: 5,
  conselheiro: 6,
  outro: 7,
};

const ROLE_TYPE_LABELS: Record<string, string> = {
  presidente: "Presidência",
  "vice-presidente": "Vice-Presidência",
  diretor: "Diretoria Executiva",
  secretario: "Secretaria",
  tesoureiro: "Tesouraria",
  conselheiro: "Conselho",
  outro: "Outros Membros",
};

interface GroupedMembers {
  type: string;
  label: string;
  members: Member[];
}

function groupByRoleType(members: Member[]): GroupedMembers[] {
  const map = new Map<string, Member[]>();

  for (const m of members) {
    const key = m.roleType || "outro";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }

  return Array.from(map.entries())
    .map(([type, members]) => ({
      type,
      label: ROLE_TYPE_LABELS[type] || type,
      members,
    }))
    .sort(
      (a, b) =>
        (ROLE_TYPE_ORDER[a.type] ?? 99) - (ROLE_TYPE_ORDER[b.type] ?? 99),
    );
}

interface OurTeamSectionProps {
  data: OurTeam | null;
  members: Member[];
}

export function OurTeamSection({ data, members }: OurTeamSectionProps) {
  const fallback = ABOUT_PAGE_FALLBACKS.team;
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const groups = groupByRoleType(members);

  const hasBio = (member: Member) => {
    return !!(member.fullBio || member.words);
  };

  const hasAlt = (value: unknown): value is { alt?: string } => {
    return (
      typeof value === "object" &&
      value !== null &&
      "alt" in (value as Record<string, unknown>)
    );
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

      {/* Group image (show once above the grid) */}
      {data?.imagemGrupo && (
        <div className="max-w-6xl mx-auto mt-6 rounded-2xl overflow-hidden">
          <div className="relative aspect-[16/8] w-full">
            {(() => {
              const altText = hasAlt(data.imagemGrupo)
                ? data.imagemGrupo.alt
                : undefined;

              return (
                <Image
                  src={urlFor(data.imagemGrupo).width(1600).height(850).url()}
                  alt={altText || "Foto em grupo da equipe"}
                  fill
                  className="object-cover"
                />
              );
            })()}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-14 px-4 text-center">
        <Text
          variant="small"
          className="uppercase tracking-[0.3em] text-primary font-semibold"
        >
          {fallback.gridTag}
        </Text>
        <Heading level={3} className="mt-3 text-neutral-dark">
          {fallback.gridTitle}
        </Heading>
      </div>

      <AnimatePresence mode="wait">
        {!selectedMember ? (
          // Grid de Membros agrupado por cargo
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {groups.length === 0 ? (
              <p className="text-center text-gray-400 py-20">
                Nenhum integrante da diretoria cadastrado ainda.
              </p>
            ) : (
              <div className="space-y-16">
                {groups.map((group) => (
                  <div key={group.type} className="flex flex-col">
                    {/* Cabeçalho do grupo */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-4 mb-8"
                    >
                      <div
                        className="w-1 h-8 rounded-full flex-shrink-0"
                        style={{ background: "var(--color-primary)" }}
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {group.label}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {group.members.length}{" "}
                          {group.members.length === 1 ? "membro" : "membros"}
                        </p>
                      </div>
                      <div className="flex-1 h-px bg-gray-100 ml-2" />
                    </motion.div>

                    {/* Masonry horizontal por grupo - na mesma linha */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                      {group.members.map((member, index) => {
                        const memberHasBio = hasBio(member);

                        return (
                          <motion.div
                            key={member._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            onClick={() =>
                              memberHasBio && setSelectedMember(member)
                            }
                            className={`group relative rounded-2xl overflow-hidden break-inside-avoid mb-6 ${memberHasBio ? "cursor-pointer" : "cursor-default"}`}
                          >
                            {/* Imagem de fundo */}
                            {member.photo ? (
                              <div className="relative w-full">
                                <Image
                                  src={urlFor(member.photo).width(500).url()}
                                  alt={member.name}
                                  width={500}
                                  height={600}
                                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            ) : (
                              <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary/40 to-primary/60 flex items-center justify-center">
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
                                <div className="mt-2 text-xs font-semibold flex items-center gap-1">
                                  <span
                                    style={{
                                      color: "var(--color-primary)",
                                    }}
                                  >
                                    Ver mais
                                  </span>
                                  <svg
                                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{
                                      color: "var(--color-primary)",
                                      strokeWidth: 3,
                                    }}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              <span className="font-medium">Voltar para a diretoria</span>
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
                {selectedMember.role &&
                  selectedMember.role.trim().toLowerCase() === "presidente" && (
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
