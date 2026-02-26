"use client";

import { Event } from "@/sanity/lib/types/event";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, SectionFooter } from "@/components/ui";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Ticket, MapPin, ArrowRight, Clock } from "lucide-react";

interface EventsSectionProps {
  data: Event[];
  section: HomeSection | null;
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

export function EventsSection({ data, section }: EventsSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.events;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(".", ""),
      year: date.getFullYear(),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleCTA = (event: Event) => {
    if (!event.cta.enabled) return;

    switch (event.cta.type) {
      case "whatsapp":
        if (event.cta.whatsapp) {
          const message =
            event.cta.whatsappMessage ||
            `Olá! Gostaria de saber mais sobre o evento ${event.title}`;
          window.open(
            `https://wa.me/${event.cta.whatsapp}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        }
        break;
      case "email":
        if (event.cta.email) {
          const mailtoLink = `mailto:${event.cta.email}?subject=${encodeURIComponent(`Interesse em: ${event.title}`)}`;
          const anchor = document.createElement("a");
          anchor.href = mailtoLink;
          anchor.click();
        }
        break;
      case "link":
        if (event.cta.link) {
          window.open(event.cta.link, "_blank");
        }
        break;
    }
  };

  // Pegar os 3 próximos eventos
  const upcomingEvents = data.slice(0, 3);

  // Cores vibrantes para categorias de eventos
  const getCategoryColor = (category: string) => {
    const colors: Record<
      string,
      { bg: string; text: string; gradient: string }
    > = {
      cultural: {
        bg: "bg-purple-500",
        text: "text-purple-100",
        gradient: "from-purple-500 to-purple-700",
      },
      educacional: {
        bg: "bg-blue-500",
        text: "text-blue-100",
        gradient: "from-blue-500 to-blue-700",
      },
      social: {
        bg: "bg-green-500",
        text: "text-green-100",
        gradient: "from-green-500 to-green-700",
      },
      arrecadacao: {
        bg: "bg-yellow-500",
        text: "text-yellow-100",
        gradient: "from-yellow-500 to-yellow-700",
      },
      celebracao: {
        bg: "bg-pink-500",
        text: "text-pink-100",
        gradient: "from-pink-500 to-pink-700",
      },
      esportivo: {
        bg: "bg-red-500",
        text: "text-red-100",
        gradient: "from-red-500 to-red-700",
      },
      arte: {
        bg: "bg-indigo-500",
        text: "text-indigo-100",
        gradient: "from-indigo-500 to-indigo-700",
      },
      musical: {
        bg: "bg-violet-500",
        text: "text-violet-100",
        gradient: "from-violet-500 to-violet-700",
      },
      literario: {
        bg: "bg-cyan-500",
        text: "text-cyan-100",
        gradient: "from-cyan-500 to-cyan-700",
      },
      outro: {
        bg: "bg-gray-500",
        text: "text-gray-100",
        gradient: "from-gray-500 to-gray-700",
      },
    };
    return colors[category] || colors.outro;
  };

  return (
    <Section>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          description={section?.description || fallback.description}
          layout="split"
          variant="light"
        />

        {/* Grid de Eventos */}
        {upcomingEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {upcomingEvents.map((event, index) => {
              const date = formatDate(event.eventDate);
              const categoryColor = getCategoryColor(event.category);

              return (
                <motion.div
                  key={event._id}
                  className="group relative cursor-pointer perspective-1000"
                  variants={staggerItemVariants}
                  initial={{ opacity: 0, y: 40, rotateX: -15 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -12,
                    rotateY: 2,
                    rotateX: -2,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => event.cta.enabled && handleCTA(event)}
                  role="article"
                  aria-label={`Evento: ${event.title}`}
                  tabIndex={event.cta.enabled ? 0 : -1}
                  onKeyDown={(e) => {
                    if (
                      event.cta.enabled &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleCTA(event);
                    }
                  }}
                >
                  {/* Card principal */}
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl group-hover:shadow-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
                    {/* Imagem de destaque com overlay de gradiente */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={buildSanityImageUrl(event.coverImage.asset._ref)}
                        alt={
                          event.coverImage.alt ||
                          `Imagem do evento ${event.title}`
                        }
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay gradiente sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Data em destaque - canto superior esquerdo */}
                      <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-[70px]">
                        <div className="text-3xl font-bold text-gray-900 leading-none">
                          {date.day}
                        </div>
                        <div className="text-xs font-semibold text-gray-600 uppercase mt-1">
                          {date.month}
                        </div>
                      </div>

                      {/* Badge de categoria - canto superior direito */}
                      <div
                        className={`absolute top-4 right-4 ${categoryColor.bg} ${categoryColor.text} px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg`}
                      >
                        {CATEGORY_LABELS[event.category] || event.category}
                      </div>

                      {/* Efeito de brilho animado */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                      </div>
                    </div>

                    {/* Conteúdo do card */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Título */}
                      <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h4>

                      {/* Informações do evento */}
                      <div className="space-y-2.5 mb-4 flex-1">
                        {/* Horário */}
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{date.time}</span>
                        </div>

                        {/* Localização (se disponível) */}
                        {event.location?.name && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="line-clamp-1">
                              {event.location.name}
                            </span>
                          </div>
                        )}

                        {/* Ingresso */}
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4 text-primary flex-shrink-0" />
                          <span
                            className={`text-sm font-semibold ${event.ticketPrice.free ? "text-green-600" : "text-gray-900"}`}
                          >
                            {event.ticketPrice.free
                              ? "Gratuito"
                              : `R$ ${event.ticketPrice.value?.toFixed(2)}`}
                          </span>
                        </div>
                      </div>

                      {/* Botão de ação */}
                      {event.cta.enabled && (
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto pt-4 border-t border-gray-100">
                          <span className="uppercase tracking-wide">
                            {event.cta.buttonText || "Ver detalhes"}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Borda animada */}
                    <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 ring-primary ring-opacity-0 group-hover:ring-opacity-30 transition-all duration-500 pointer-events-none" />
                  </div>

                  {/* Reflexo sob o card */}
                  <div className="absolute -bottom-2 left-4 right-4 h-8 bg-gradient-to-br from-primary/20 to-emerald-400/20 opacity-0 group-hover:opacity-40 blur-xl rounded-full transition-opacity duration-500 -z-10" />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <SectionFooter
          text={
            section?.buttonText ||
            fallback.description_footer ||
            fallback.buttonText ||
            ""
          }
          linkText={
            section?.linkText || fallback.linkText || "Ver todos os eventos"
          }
          linkHref="/eventos"
          showLink={data.length > 3}
        />
      </motion.div>
    </Section>
  );
}
