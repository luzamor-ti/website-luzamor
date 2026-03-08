"use client";

import { Member } from "@/sanity/lib/types/member";
import { motion, AnimatePresence } from "framer-motion";
import {
  slideInFromLeftVariants,
  slideInFromRightVariants,
} from "@/lib/animations";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/constants/portableTextComponents";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ArrowLeft, Quote } from "lucide-react";
import { type CSSProperties, useRef, useState } from "react";
import { routesPath } from "@/constants/routesPath";
import { LinkButton } from "../ui";

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

interface BoardGroup {
  type: string;
  label: string;
  members: Member[];
}

function groupByRoleType(members: Member[]): BoardGroup[] {
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

// ──────────────────────────────────────────────
// Card individual de membro
// ──────────────────────────────────────────────
function MemberCard({
  member,
  index,
  isHighlight,
  onClick,
}: {
  member: Member;
  index: number;
  isHighlight: boolean;
  onClick: () => void;
}) {
  const photoUrl = member.photo
    ? urlFor(member.photo)
        .width(isHighlight ? 600 : 400)
        .height(isHighlight ? 800 : 600)
        .url()
    : null;
  const hasBio = !!(member.shortBio || member.fullBio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onClick={hasBio ? onClick : undefined}
      onKeyDown={
        hasBio
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={hasBio ? "button" : undefined}
      tabIndex={hasBio ? 0 : undefined}
      aria-label={hasBio ? `Ver perfil de ${member.name}` : undefined}
      className={`group relative rounded-2xl overflow-hidden bg-gray-100 shadow-md
        ${hasBio ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl" : "cursor-default"}
        transition-all duration-300
        ${isHighlight ? "aspect-[3/4]" : "aspect-[3/4]"}
      `}
    >
      {/* Foto */}
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={member.alt || member.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
          }}
        >
          <span className="text-7xl text-white/30 font-bold">
            {member.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badge de tipo de cargo no topo (apenas highlight) */}
      {isHighlight && member.roleType && (
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white"
            style={{ background: "var(--color-primary)" }}
          >
            {ROLE_TYPE_LABELS[member.roleType] || member.roleType}
          </span>
        </div>
      )}

      {/* Informações na base */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="font-bold text-lg leading-tight">{member.name}</p>
        {member.role && (
          <p className="text-white/70 text-sm mt-0.5">{member.role}</p>
        )}
        {hasBio && (
          <div
            className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-primary)" }}
          >
            <span>Ver perfil</span>
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
}

// ──────────────────────────────────────────────
// Visão de detalhe de membro
// ──────────────────────────────────────────────
function MemberDetail({
  member,
  onBack,
}: {
  member: Member;
  onBack: () => void;
}) {
  const photoUrl = member.photo
    ? urlFor(member.photo).width(500).height(670).url()
    : null;
  const normalizedRole = member.role?.trim().toLowerCase();
  const isPresident =
    member.roleType === "presidente" ||
    (normalizedRole ? normalizedRole.startsWith("presidente") : false);

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="space-y-8"
    >
      {/* Botão Voltar */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors group cursor-pointer"
        whileHover={{ x: -4 }}
        style={{ "--tw-text-opacity": "1" } as CSSProperties}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Voltar para a diretoria</span>
      </motion.button>

      {/* Conteúdo */}
      <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
        {/* Foto */}
        <motion.div
          variants={slideInFromLeftVariants}
          initial="hidden"
          animate="visible"
          className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
        >
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={member.alt || member.name}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary)/40 0%, var(--color-primary)/60 100%)",
              }}
            >
              <span className="text-9xl text-white/30 font-bold">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Textos */}
        <motion.div
          variants={slideInFromRightVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-7"
        >
          {/* Tag de cargo */}
          {member.roleType && (
            <span
              className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: "var(--color-primary)" }}
            >
              {ROLE_TYPE_LABELS[member.roleType] || member.roleType}
            </span>
          )}

          {/* Nome e cargo específico */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {member.name}
            </h2>
            {member.role && (
              <p
                className="text-lg font-semibold mt-1"
                style={{ color: "var(--color-primary)" }}
              >
                {member.role}
              </p>
            )}
          </div>

          {/* Aspas + Bio curta */}
          {member.shortBio && (
            <div
              className="p-6 bg-gray-50 rounded-xl border-l-4"
              style={{ borderColor: "var(--color-primary)" }}
            >
              <Quote
                size={20}
                className="mb-2 opacity-40"
                style={{ color: "var(--color-primary)" }}
              />
              <p className="text-gray-700 italic text-lg leading-relaxed">
                {member.shortBio}
              </p>
            </div>
          )}

          {/* Bio completa */}
          {member.fullBio && (
            <div className="prose prose-lg prose-gray max-w-none text-gray-700">
              <PortableText
                value={member.fullBio}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* Link para Palavra do Presidente */}
          {isPresident && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4 border-t border-gray-200"
            >
              <LinkButton href={routesPath.presidentWord}>
                Leia a Palavra do Presidente
              </LinkButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────
interface BoardSectionProps {
  members: Member[];
}

export function BoardSection({ members }: BoardSectionProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const groups = groupByRoleType(members);

  function handleSelectMember(member: Member) {
    setSelectedMember(member);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <section className="py-20 md:py-28">
      <div ref={detailRef} className="max-w-6xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!selectedMember ? (
            <motion.div
              key="board-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {groups.length === 0 ? (
                <p className="text-center text-gray-400 py-20">
                  Nenhum membro da diretoria cadastrado ainda.
                </p>
              ) : (
                <div className="space-y-20">
                  {groups.map((group) => {
                    const isPresidency =
                      group.type === "presidente" ||
                      group.type === "vice-presidente";

                    return (
                      <div key={group.type}>
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
                              {group.members.length === 1
                                ? "membro"
                                : "membros"}
                            </p>
                          </div>
                          <div className="flex-1 h-px bg-gray-100 ml-2" />
                        </motion.div>

                        {/* Grid do grupo */}
                        {isPresidency ? (
                          // Presidência: cards maiores e centralizados
                          <div
                            className={`grid gap-8 ${
                              group.members.length === 1
                                ? "grid-cols-1 max-w-xs mx-auto"
                                : "grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto"
                            }`}
                          >
                            {group.members.map((member, i) => (
                              <MemberCard
                                key={member._id}
                                member={member}
                                index={i}
                                isHighlight
                                onClick={() => handleSelectMember(member)}
                              />
                            ))}
                          </div>
                        ) : (
                          // Demais: grid 2-3 colunas
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {group.members.map((member, i) => (
                              <MemberCard
                                key={member._id}
                                member={member}
                                index={i}
                                isHighlight={false}
                                onClick={() => handleSelectMember(member)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            <MemberDetail
              member={selectedMember}
              onBack={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
