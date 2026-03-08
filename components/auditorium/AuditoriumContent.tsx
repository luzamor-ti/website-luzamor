"use client";

import { Auditorium } from "@/sanity/lib/types/auditorium";
import { Page } from "@/sanity/lib/types/page";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInVariants,
  slideUpVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
} from "@/lib/animations";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/constants/portableTextComponents";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import Image from "next/image";
import {
  Users,
  Maximize2,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowDown,
  Camera,
} from "lucide-react";
import { useState, useCallback } from "react";
import { ctaWhatsappGlobal } from "@/utils/ctaWhatsappGlobal";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import { Button } from "../ui";

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function buildWhatsappHref(number: string, text: string) {
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

// ─────────────────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────────────────
interface LightboxProps {
  images: Auditorium["gallery"];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  if (!images || images.length === 0) return null;
  const img = images[index];
  const url = buildSanityImageUrl(img.asset._ref);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Fechar */}
      <button
        className="absolute top-5 right-5 p-2 text-white/70 hover:text-white transition-colors z-10 cursor-pointer"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X size={28} />
      </button>

      {/* Contador */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
        {index + 1} / {images.length}
      </span>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Imagem */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[80vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={url}
          alt={img.alt || "Foto do auditório"}
          width={1200}
          height={800}
          className="w-full h-full object-contain rounded-xl"
          style={{ maxHeight: "80vh" }}
        />
        {img.caption && (
          <p className="mt-3 text-center text-white/60 text-sm">
            {img.caption}
          </p>
        )}
      </motion.div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Próxima foto"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────
interface AuditoriumContentProps {
  pagina: Page;
  data: Auditorium | null;
  globalConfiguration: Awaited<ReturnType<typeof getGlobalConfiguration>>;
}

const FALLBACK_TITLE = "Nosso Auditório";
const FALLBACK_SUBTITLE =
  "Um espaço versátil e sofisticado para seus eventos, apresentações e celebrações.";
const FALLBACK_CTA = "Reservar o Auditório";

export function AuditoriumContent({
  pagina,
  data,
  globalConfiguration,
}: AuditoriumContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const heroImageUrl = data?.heroImage?.asset?._ref
    ? buildSanityImageUrl(data.heroImage.asset._ref)
    : null;

  const title = data?.title || pagina.title || FALLBACK_TITLE;
  const subtitle = data?.subtitle || pagina.description || FALLBACK_SUBTITLE;
  const ctaText = data?.ctaText || FALLBACK_CTA;
  const gallery = data?.gallery ?? [];
  const resources = data?.resources ?? [];

  const whatsappHref = data?.ctaWhatsapp
    ? buildWhatsappHref(
        data.ctaWhatsapp,
        `Olá! Gostaria de solicitar informações sobre a reserva do auditório.`,
      )
    : null;

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length],
  );
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i + 1) % gallery.length),
    [gallery.length],
  );

  const hrefCTA =
    whatsappHref ||
    ctaWhatsappGlobal("auditório", globalConfiguration?.contact?.whatsapp ?? "")
      .href;

  return (
    <main className="min-h-screen">
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Imagem de fundo */}
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={data?.heroImage?.alt || title}
            fill
            priority
            className="object-cover"
            style={{ opacity: 0.45 }}
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Conteúdo */}
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
          }}
        >
          {/* Tag */}
          <motion.div variants={fadeInVariants} className="mb-6">
            <span
              className="inline-block px-5 py-1.5 border rounded-full text-xs font-bold uppercase tracking-widest text-white"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
            >
              Espaço para Eventos
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            variants={slideUpVariants}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            {title}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={slideUpVariants}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-10"
          >
            {subtitle}
          </motion.p>

          {/* Badges de capacidade/área */}
          {(data?.capacity || data?.area) && (
            <motion.div
              variants={fadeInVariants}
              className="flex flex-wrap items-center justify-center gap-4 mb-10"
            >
              {data.capacity && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <Users size={16} className="text-white/70" />
                  <span className="text-white text-sm font-medium">
                    Até {data.capacity} pessoas
                  </span>
                </div>
              )}
              {data.area && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <Maximize2 size={16} className="text-white/70" />
                  <span className="text-white text-sm font-medium">
                    {data.area} m²
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            variants={fadeInVariants}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              href={hrefCTA}
              rel="noopener noreferrer"
              size="lg"
              showArrow
            >
              <MessageCircle size={20} />
              {ctaText}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="text-xs uppercase tracking-widest">
            Conheça o espaço
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── DESCRIÇÃO + RECURSOS ──────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-start">
            {/* Lado esquerdo: texto */}
            <motion.div
              variants={slideInFromLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-6"
                style={{ background: "var(--color-primary)" }}
              >
                Sobre o Espaço
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
                Um ambiente pensado para{" "}
                <span style={{ color: "var(--color-primary)" }}>
                  grandes momentos
                </span>
              </h2>

              {data?.description ? (
                <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-loose">
                  <PortableText
                    value={data.description}
                    components={portableTextComponents}
                  />
                </div>
              ) : (
                <p className="text-gray-500 text-lg leading-loose">
                  Entre em contato para saber mais sobre a disponibilidade do
                  espaço.
                </p>
              )}
            </motion.div>

            {/* Lado direito: recursos */}
            <motion.div
              variants={slideInFromRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 lg:mt-0"
            >
              {/* Cards de capacidade/área */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {data?.capacity && (
                  <div
                    className="p-6 rounded-2xl text-center border"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-primary) 6%, white)",
                      borderColor:
                        "color-mix(in srgb, var(--color-primary) 20%, transparent)",
                    }}
                  >
                    <Users
                      size={28}
                      className="mx-auto mb-3"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <p className="text-3xl font-bold text-gray-900">
                      {data.capacity}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                      pessoas
                    </p>
                  </div>
                )}
                {data?.area && (
                  <div
                    className="p-6 rounded-2xl text-center border"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-primary) 6%, white)",
                      borderColor:
                        "color-mix(in srgb, var(--color-primary) 20%, transparent)",
                    }}
                  >
                    <Maximize2
                      size={28}
                      className="mx-auto mb-3"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <p className="text-3xl font-bold text-gray-900">
                      {data.area}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                      m²
                    </p>
                  </div>
                )}
              </div>

              {/* Lista de recursos */}
              {resources.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    Recursos Disponíveis
                  </h3>
                  <ul className="space-y-3">
                    {resources.map((r, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle2
                          size={18}
                          style={{ color: "var(--color-primary)" }}
                          className="flex-shrink-0"
                        />
                        <span className="text-sm font-medium">{r}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA secundário */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <Button href={hrefCTA} rel="noopener noreferrer" showArrow>
                  <MessageCircle size={20} />
                  {ctaText}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALERIA ───────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <Camera size={28} style={{ color: "var(--color-primary)" }} />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Galeria de Fotos
                </h2>
                <p className="text-gray-400 text-sm mt-0.5">
                  Clique para ampliar
                </p>
              </div>
            </motion.div>

            {/* Grid masonry-like */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {gallery.map((img, i) => {
                const url = buildSanityImageUrl(img.asset._ref);
                // Alternância de tamanho para efeito visual
                const isLarge = i === 0 || (i > 0 && i % 5 === 3);
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.07 }}
                    onClick={() => openLightbox(i)}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer bg-gray-200 ${
                      isLarge ? "md:col-span-2 aspect-video" : "aspect-[4/3]"
                    }`}
                    aria-label={img.alt || `Foto ${i + 1} do auditório`}
                  >
                    <Image
                      src={url}
                      alt={img.alt || `Foto ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay ao hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2
                        size={28}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs">{img.caption}</p>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={gallery}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
