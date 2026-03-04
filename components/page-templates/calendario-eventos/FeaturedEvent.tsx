"use client";

import { Event } from "@/sanity/lib/types/event";
import { Heading, Text } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import {
  Clock,
  ArrowRight,
  Music,
  BookOpen,
  Users,
  Heart,
  PartyPopper,
  Trophy,
  Palette,
  BookMarked,
  Circle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EVENT_DETAIL_FALLBACKS } from "@/constants/textFallbacks";
import { motion } from "framer-motion";
import { useState } from "react";

interface FeaturedEventProps {
  event: Event;
}

const CATEGORY_LABELS: Record<string, string> = {
  cultural: "Cultural",
  educacional: "Educacional",
  social: "Social",
  arrecadacao: "Arrecadação",
  celebracao: "Celebração",
  esportivo: "Esportivo",
  arte: "Arte",
  musical: "Musical",
  literario: "Literário",
  outro: "Outro",
};

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  cultural: Users,
  educacional: BookOpen,
  social: Heart,
  arrecadacao: Heart,
  celebracao: PartyPopper,
  esportivo: Trophy,
  arte: Palette,
  musical: Music,
  literario: BookMarked,
  outro: Circle,
};

const CATEGORY_COLORS: Record<string, string> = {
  cultural: "bg-purple-100 text-purple-700",
  educacional: "bg-blue-100 text-blue-700",
  social: "bg-green-100 text-green-700",
  arrecadacao: "bg-yellow-100 text-yellow-700",
  celebracao: "bg-pink-100 text-pink-700",
  esportivo: "bg-red-100 text-red-700",
  arte: "bg-indigo-100 text-indigo-700",
  musical: "bg-violet-100 text-violet-700",
  literario: "bg-cyan-100 text-cyan-700",
  outro: "bg-gray-100 text-gray-700",
};

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);
  const eventDate = new Date(event.eventDate);
  const dayNumber = format(eventDate, "dd", { locale: ptBR });
  const monthShort = format(eventDate, "MMM", { locale: ptBR }).toUpperCase();
  const year = format(eventDate, "yyyy", { locale: ptBR });
  const timeFormatted = eventDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const CategoryIcon = CATEGORY_ICONS[event.category] || Circle;
  const categoryColor =
    CATEGORY_COLORS[event.category] || CATEGORY_COLORS.outro;

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!event.cta.enabled) return;

    switch (event.cta.type) {
      case "whatsapp":
        if (event.cta.whatsapp) {
          const message =
            event.cta.whatsappMessage ||
            EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
              "{eventName}",
              event.title,
            );
          window.open(
            `https://wa.me/${event.cta.whatsapp}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        } else {
          // Fallback para WhatsApp global
          const message = EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
            "{eventName}",
            event.title,
          );
          window.open(
            `https://wa.me/${EVENT_DETAIL_FALLBACKS.globalWhatsapp}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        }
        break;
      case "email":
        if (event.cta.email) {
          const mailtoLink = `mailto:${event.cta.email}?subject=${encodeURIComponent(`Interesse em: ${event.title}`)}`;
          window.location.href = mailtoLink;
        }
        break;
      case "link":
        if (event.cta.link) {
          window.open(event.cta.link, "_blank");
        }
        break;
    }
  };

  return (
    <article className="group">
      <Link
        href={`/evento/${event.slug.current}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100">
          {/* Grid Layout: Vertical no mobile, horizontal no desktop */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {/* Image Section - Full width mobile, 40% desktop */}
            <div className="md:col-span-2 relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={event.coverImage.alt || event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 40vw"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  quality={85}
                />
              )}
            </div>

            {/* Content Section - Full width mobile, 60% desktop */}
            <div className="md:col-span-3 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50/50 to-white">
              {/* Date Badge - Responsivo */}
              <div className="mb-4 sm:mb-6">
                <time dateTime={event.eventDate} className="flex flex-col">
                  <div className="text-primary inline-flex items-baseline gap-1 sm:gap-2">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none">
                      {dayNumber}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                      {monthShort}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-500 font-medium mt-1">
                    {year}
                  </span>
                </time>
              </div>

              {/* Category Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide inline-flex items-center gap-1.5 sm:gap-2 ${categoryColor}`}
                >
                  <CategoryIcon size={14} className="sm:w-4 sm:h-4" />
                  {CATEGORY_LABELS[event.category]}
                </span>
              </div>

              {/* Event Title */}
              <Heading
                level={2}
                className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2"
              >
                {event.title}
              </Heading>

              {/* Event Description */}
              {event.shortDescription && (
                <Text className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
                  {event.shortDescription}
                </Text>
              )}

              {/* Time Info */}
              <div className="flex items-center gap-2 mb-6 sm:mb-8 text-gray-700">
                <Clock
                  size={18}
                  className="text-primary sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                <Text className="text-sm sm:text-base font-semibold">
                  {timeFormatted}
                </Text>
              </div>

              {/* CTA Button - Executa ação do CTA */}
              {event.cta.enabled && (
                <button
                  onClick={handleCTA}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base w-full sm:w-fit min-h-[44px] relative overflow-hidden cursor-pointer"
                >
                  {/* Background hover animation */}
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "0%" : "-100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />

                  <motion.span
                    className="relative z-10"
                    animate={{
                      color: isHovered ? "#ffffff" : undefined,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {event.cta.buttonText || "Garantir meu lugar"}
                  </motion.span>

                  <motion.div
                    className="relative z-10"
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      color: isHovered ? "#ffffff" : undefined,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <ArrowRight
                      size={18}
                      className="sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  </motion.div>
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
