"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  Users,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Classroom } from "@/sanity/lib/types/classroom";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { PortableText } from "@portabletext/react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import { portableTextComponents } from "@/constants/portableTextComponents";

interface ClassroomsListProps {
  classrooms: Classroom[];
  initialSlug?: string;
}

export function ClassroomsList({
  classrooms,
  initialSlug,
}: ClassroomsListProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(
    initialSlug && classrooms.some((c) => c.slug.current === initialSlug)
      ? initialSlug
      : null,
  );
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Faz scroll para a sala indicada via parâmetro de rota após o mount
  useEffect(() => {
    if (!initialSlug) return;
    const timeout = setTimeout(() => {
      const el = itemRefs.current[initialSlug];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [initialSlug]);

  const toggle = (slug: string) => {
    setOpenSlug((prev) => {
      if (prev === slug) return null;
      // Scroll para o item ao abrir
      setTimeout(() => {
        const el = itemRefs.current[slug];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return slug;
    });
    setGalleryIndex(0);
  };

  const openLightbox = (index: number) => {
    setGalleryIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = (total: number) =>
    setGalleryIndex((i) => (i - 1 + total) % total);

  const nextImage = (total: number) => setGalleryIndex((i) => (i + 1) % total);

  return (
    <>
      <motion.div
        className="flex flex-col gap-4"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {classrooms.map((classroom) => {
          const isOpen = openSlug === classroom.slug.current;
          const mainImageUrl = buildSanityImageUrl(
            classroom.mainImage?.asset?._ref,
          );

          return (
            <motion.div
              key={classroom._id}
              variants={staggerItemVariants}
              ref={(el) => {
                itemRefs.current[classroom.slug.current] = el;
              }}
              className={`scroll-mt-28 rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-gray-200 bg-white shadow-lg"
                  : "border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300"
              }`}
            >
              {/* Faixa de acento lateral quando aberto */}
              {isOpen && <div className="h-1 w-full bg-primary" />}

              {/* CABEÇALHO DA SALA (clicável) */}
              <button
                type="button"
                onClick={() => toggle(classroom.slug.current)}
                className="cursor-pointer w-full flex items-center gap-5 px-6 py-5 md:px-8 md:py-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={isOpen}
              >
                {/* Miniatura */}
                {mainImageUrl && (
                  <div className="relative shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={mainImageUrl}
                      alt={classroom.mainImage?.alt || classroom.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Nome + recursos resumidos */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`block text-xl md:text-2xl font-bold transition-colors duration-300 ${
                      isOpen
                        ? "text-gray-900"
                        : "text-gray-800 group-hover:text-gray-900"
                    }`}
                  >
                    {classroom.name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {classroom.capacity && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                        <Users size={12} className="text-primary" />
                        {classroom.capacity} pessoas
                      </span>
                    )}
                    {classroom.resources && classroom.resources.length > 0 && (
                      <span className="hidden sm:block text-xs text-gray-400">
                        {classroom.resources.slice(0, 3).join(" · ")}
                        {classroom.resources.length > 3 && " +"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ícone accordion */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`shrink-0 p-2 rounded-full transition-colors duration-300 ${
                    isOpen
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
                  }`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* CONTEÚDO EXPANDIDO */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Divisor sutil */}
                      <div className="lg:col-span-2 h-px bg-gray-100 mb-2" />

                      {/* IMAGEM PRINCIPAL */}
                      {mainImageUrl && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
                          <Image
                            src={mainImageUrl}
                            alt={classroom.mainImage?.alt || classroom.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* INFORMAÇÕES */}
                      <div className="flex flex-col gap-5">
                        {/* Descrição */}
                        <div className="prose prose-gray prose-sm max-w-none text-gray-600">
                          <PortableText
                            value={classroom.description}
                            components={portableTextComponents}
                          />
                        </div>

                        {/* Capacidade */}
                        {classroom.capacity && (
                          <div className="flex items-center gap-2 text-gray-700 bg-primary/10 px-4 py-2.5 rounded-xl border border-primary/20 w-fit">
                            <Users size={17} className="text-primary" />
                            <span className="font-semibold text-primary">
                              Capacidade:
                            </span>
                            <span className="text-gray-600">
                              {classroom.capacity} pessoas
                            </span>
                          </div>
                        )}

                        {/* Recursos */}
                        {classroom.resources &&
                          classroom.resources.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                                Recursos disponíveis
                              </p>
                              <ul className="flex flex-wrap gap-2">
                                {classroom.resources.map((resource) => (
                                  <li
                                    key={resource}
                                    className="flex items-center gap-1.5 text-sm bg-white border border-primary/30 text-primary px-3 py-1.5 rounded-full shadow-sm"
                                  >
                                    <CheckCircle2
                                      size={13}
                                      className="text-primary"
                                    />
                                    {resource}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>

                      {/* GALERIA DE FOTOS */}
                      {classroom.gallery && classroom.gallery.length > 0 && (() => {
                        const galleryWithUrls = classroom.gallery
                          .map((photo) => ({
                            ...photo,
                            url: buildSanityImageUrl(photo.asset?._ref),
                          }))
                          .filter((item): item is typeof item & { url: string } => !!item.url);

                        if (galleryWithUrls.length === 0) return null;

                        return (
                          <div className="lg:col-span-2">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                              Galeria de fotos
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {galleryWithUrls.map((photo, filteredIndex) => (
                                <button
                                  type="button"
                                  key={filteredIndex}
                                  onClick={() => openLightbox(filteredIndex)}
                                  className="cursor-pointer relative aspect-square rounded-xl overflow-hidden group border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300"
                                >
                                  <Image
                                    src={photo.url}
                                    alt={
                                      photo.alt ||
                                      `Foto ${filteredIndex + 1} - ${classroom.name}`
                                    }
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen &&
          openSlug &&
          (() => {
            const classroom = classrooms.find(
              (c) => c.slug.current === openSlug,
            );
            const galleryWithUrls = (classroom?.gallery ?? [])
              .map((photo) => ({
                ...photo,
                url: buildSanityImageUrl(photo.asset?._ref),
              }))
              .filter((item): item is typeof item & { url: string } => !!item.url);
            const photo = galleryWithUrls[galleryIndex];
            const photoUrl = photo?.url ?? null;

            return (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={closeLightbox}
              >
                {/* Botão fechar */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-primary/80 text-white transition-colors"
                  aria-label="Fechar galeria"
                >
                  <X size={24} />
                </button>

                {/* Navegação anterior */}
                {galleryWithUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(galleryWithUrls.length);
                    }}
                    className="cursor-pointer absolute left-4 p-3 rounded-full bg-white/10 hover:bg-primary/80 text-white transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Imagem */}
                {photoUrl && (
                  <motion.div
                    key={galleryIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={photoUrl}
                      alt={photo?.alt || `Foto ${galleryIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                )}

                {/* Navegação próxima */}
                {galleryWithUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(galleryWithUrls.length);
                    }}
                    className="cursor-pointer absolute right-4 p-3 rounded-full bg-white/10 hover:bg-primary/80 text-white transition-colors"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                {/* Contador */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                  {galleryIndex + 1} / {galleryWithUrls.length}
                  {photo?.caption && (
                    <span className="ml-2 text-white/50">{photo.caption}</span>
                  )}
                </div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </>
  );
}
