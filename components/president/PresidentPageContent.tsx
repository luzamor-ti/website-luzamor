"use client";

import { Member } from "@/sanity/lib/types/member";
import { Page } from "@/sanity/lib/types/page";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/constants/portableTextComponents";
import { motion } from "framer-motion";
import {
  fadeInVariants,
  slideUpVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  heroStaggerVariants,
} from "@/lib/animations";
import { PRESIDENT_PAGE_FALLBACKS } from "@/constants/textFallbacks";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Quote } from "lucide-react";

interface PresidentPageContentProps {
  pagina: Page;
  presidentData: Member;
}

export function PresidentPageContent({
  pagina,
  presidentData,
}: PresidentPageContentProps) {
  const photoUrl = presidentData.photo
    ? urlFor(presidentData.photo).width(600).height(800).url()
    : null;

  const heroBgUrl = presidentData.photo
    ? urlFor(presidentData.photo).width(1400).height(900).url()
    : null;

  return (
    <main className="min-h-screen">
      {/* ── HERO CINEMATOGRÁFICO ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Foto do presidente desfocada como fundo */}
        {heroBgUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroBgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "blur(28px)",
              transform: "scale(1.15)",
              opacity: 0.22,
            }}
          />
        )}

        {/* Gradiente de sobreposição */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/30 to-[#0a0a0a]/90" />

        {/* Conteúdo central */}
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={heroStaggerVariants}
        >
          {/* Tag */}
          <motion.div variants={fadeInVariants}>
            <span className="inline-block px-5 py-1.5 border border-primary text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-8">
              {PRESIDENT_PAGE_FALLBACKS.tagLabel}
            </span>
          </motion.div>

          {/* Aspas decorativas */}
          <motion.div
            variants={fadeInVariants}
            className="flex justify-center mb-4"
            style={{ color: "var(--color-primary)", opacity: 0.35 }}
          >
            <Quote size={72} strokeWidth={1} />
          </motion.div>

          {/* Título da página */}
          <motion.h1
            variants={slideUpVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
          >
            {pagina.title}
          </motion.h1>

          {/* Nome e cargo */}
          <motion.div
            variants={fadeInVariants}
            className="flex flex-col items-center gap-1.5"
          >
            <p className="text-white/50 text-xs uppercase tracking-widest">
              {PRESIDENT_PAGE_FALLBACKS.byLabel}
            </p>
            <p className="text-white text-xl font-semibold">
              {presidentData.name}
            </p>
            <p
              className="text-sm font-medium uppercase tracking-wide"
              style={{ color: "var(--color-primary)" }}
            >
              {presidentData.role}
            </p>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-widest">
              {PRESIDENT_PAGE_FALLBACKS.scrollLabel}
            </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── SEÇÃO DA MENSAGEM ────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-16 items-start">
            {/* Coluna esquerda: foto sticky */}
            <motion.div
              className="lg:sticky lg:top-28 mb-16 lg:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInFromLeftVariants}
            >
              {photoUrl && (
                <div className="relative">
                  {/* Foto */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={photoUrl}
                      alt={presidentData.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Cartão com nome sobreposto na base */}
                  <div className="absolute -bottom-7 left-4 right-4 bg-white rounded-xl shadow-xl px-5 py-4 border border-gray-100">
                    <p className="font-bold text-gray-900 text-base">
                      {presidentData.name}
                    </p>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {presidentData.role}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Coluna direita: mensagem */}
            <motion.div
              className="lg:col-span-2 pt-6 lg:pt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInFromRightVariants}
            >
              {/* Aspas de abertura */}
              <Quote
                size={48}
                strokeWidth={1.5}
                className="mb-6 opacity-30"
                style={{ color: "var(--color-primary)" }}
              />

              {/* Bio curta como teaser */}
              {presidentData.shortBio && (
                <p
                  className="text-xl md:text-2xl font-medium text-gray-700 italic leading-relaxed mb-10 pl-6"
                  style={{
                    borderLeft: "4px solid var(--color-primary)",
                  }}
                >
                  {presidentData.shortBio}
                </p>
              )}

              {/* Texto completo da mensagem */}
              {presidentData.words && (
                <div className="prose prose-lg prose-gray max-w-none text-gray-700 leading-loose">
                  <PortableText
                    value={presidentData.words}
                    components={portableTextComponents}
                  />
                </div>
              )}

              {/* Assinatura */}
              <div className="mt-14 pt-8 border-t border-gray-200 flex items-center gap-4">
                {photoUrl && (
                  <div
                    className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-gray-50 flex-shrink-0"
                    style={
                      {
                        "--tw-ring-color": "var(--color-primary)",
                      } as React.CSSProperties
                    }
                  >
                    <Image
                      src={photoUrl}
                      alt={presidentData.name}
                      width={56}
                      height={56}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 text-base">
                    {presidentData.name}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {presidentData.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
