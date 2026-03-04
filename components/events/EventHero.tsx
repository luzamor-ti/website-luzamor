"use client";

import Image from "next/image";
import { Section, Heading, Text } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Event } from "@/sanity/lib/types/event";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";
import { EventCategoryBadge } from "./EventCategoryBadge";

interface EventHeroProps {
  event: Event;
}

export function EventHero({ event }: EventHeroProps) {
  const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);
  const eventDate = new Date(event.eventDate);
  const dateFormatted = format(eventDate, "dd 'de' MMMM, yyyy", {
    locale: ptBR,
  });
  const timeFormatted = format(eventDate, "HH:mm", { locale: ptBR });
  const weekday = format(eventDate, "EEEE", { locale: ptBR });

  const isPast = eventDate < new Date();
  const isFree = event.ticketPrice.free;
  const ticketValue = event.ticketPrice.value;

  return (
    <Section isFluid className="relative overflow-hidden !p-0">
      {/* Hero com Imagem de Fundo */}
      <div className="relative min-h-[95vh] md:min-h-[90vh] flex items-end">
        {/* Background Image com Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/70 to-gray-900/95">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={event.coverImage.alt || event.title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          )}
        </div>

        {/* Gradient Overlay para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Conteúdo */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 pt-32 md:pt-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="max-w-4xl"
          >
            {/* Badge de Categoria */}
            <div className="mb-4 md:mb-6">
              <EventCategoryBadge
                category={event.category}
                variant="solid"
                size="lg"
              />
            </div>

            {/* Título */}
            <Heading
              level={1}
              className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
            >
              {event.title}
            </Heading>

            {/* Descrição Curta */}
            {event.shortDescription && (
              <Text className="text-white mb-6 md:mb-8 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
                {event.shortDescription}
              </Text>
            )}

            {/* Grid de Informações */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              {/* Data */}
              <motion.div
                variants={slideUpVariants}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2.5 flex items-center gap-2 hover:bg-white/20 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center">
                  <Calendar size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <Text className="text-[10px] text-white/70 mb-0.5 uppercase tracking-wide font-medium">
                    Data
                  </Text>
                  <Text className="text-xs font-bold text-white truncate capitalize leading-tight">
                    {weekday}
                  </Text>
                  <Text className="text-[10px] text-white/80 truncate leading-tight">
                    {dateFormatted}
                  </Text>
                </div>
              </motion.div>

              {/* Horário */}
              <motion.div
                variants={slideUpVariants}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2.5 flex items-center gap-2 hover:bg-white/20 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center">
                  <Clock size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <Text className="text-[10px] text-white/70 mb-0.5 uppercase tracking-wide font-medium">
                    Horário
                  </Text>
                  <Text className="text-lg font-bold text-white leading-tight">
                    {timeFormatted}
                  </Text>
                </div>
              </motion.div>

              {/* Local */}
              {event.location?.name && (
                <motion.div
                  variants={slideUpVariants}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2.5 flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text className="text-[10px] text-white/70 mb-0.5 uppercase tracking-wide font-medium">
                      Local
                    </Text>
                    <Text className="text-xs font-bold text-white truncate leading-tight">
                      {event.location.name}
                    </Text>
                    {event.location.address && (
                      <Text className="text-[10px] text-white/80 truncate leading-tight">
                        {event.location.address}
                      </Text>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Valor de Entrada */}
              <motion.div
                variants={slideUpVariants}
                className={`backdrop-blur-md border rounded-lg px-3 py-2.5 flex items-center gap-2 transition-all ${
                  isFree
                    ? "bg-green-500/20 border-green-400/50 hover:bg-green-500/30"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
                    isFree ? "bg-green-500/40" : "bg-primary/20"
                  }`}
                >
                  <Ticket size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <Text className="text-[10px] text-white/70 mb-0.5 uppercase tracking-wide font-medium">
                    Entrada
                  </Text>
                  {isFree ? (
                    <Text className="text-sm font-bold text-white leading-tight">
                      Gratuita
                    </Text>
                  ) : (
                    <Text className="text-sm font-bold text-white leading-tight">
                      {ticketValue
                        ? `R$ ${ticketValue.toFixed(2).replace(".", ",")}`
                        : "A definir"}
                    </Text>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Indicador de Evento Passado */}
            {isPast && (
              <motion.div
                variants={fadeInVariants}
                className="mt-4 inline-block bg-yellow-500/30 border border-yellow-400/60 backdrop-blur-md rounded-lg px-3 py-1.5"
              >
                <Text className="text-white text-xs font-bold">
                  ⚠️ Este evento já aconteceu
                </Text>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
