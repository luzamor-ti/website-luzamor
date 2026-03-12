"use client";

import { Button, LinkButton } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import { Calendar, MapPin, Ticket, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { routesPath } from "@/constants/routesPath";
import { formatDate } from "@/utils/dateFormatters";
import { buildEventCTA, getCTAButtonText } from "@/utils/eventCta";

interface EventInfoProps {
  event: Event;
  globalWhatsapp?: string;
}

export function EventInfo({ event, globalWhatsapp }: EventInfoProps) {
  const { dateFormatted, timeFormatted, weekday } = formatDate(event.eventDate);

  // CTA Logic
  const ctaButtonText = getCTAButtonText(event);
  const { href: ctaHref } = buildEventCTA(event, globalWhatsapp);

  // Location Logic
  const hasSpecificLocation =
    !!event.location?.mapLink || !!event.location?.address;
  const locationHref = hasSpecificLocation
    ? (event.location?.mapLink ??
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location?.address ?? "")}`)
    : routesPath.auditorium;

  const isFree = event.ticketPrice?.free;
  const ticketValue = event.ticketPrice?.value;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      {/* Header */}
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Informações do Evento
      </h2>

      {/* Valor do Ingresso */}
      {event.ticketPrice && (
        <div className="bg-primary/5 rounded-lg p-4 mb-5 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Ticket size={18} className="text-primary" />
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
              Valor do Ingresso
            </span>
          </div>
          {isFree ? (
            <p className="text-2xl font-bold text-primary">Gratuito</p>
          ) : (
            <p className="text-2xl font-bold text-primary">
              R$ {ticketValue?.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      )}

      {/* Botão CTA */}
      <Button
        href={ctaHref}
        external
        variant="primary"
        size="md"
        fullWidth
        className="font-semibold mb-6"
      >
        {ctaButtonText}
      </Button>

      {/* Divisor */}
      <div className="border-t border-gray-200 mb-5" />

      {/* Informações do Evento */}
      <div className="space-y-5">
        {/* Data e Horário */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-primary" />
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
              Data e Horário
            </span>
          </div>
          <p className="text-sm text-gray-900 font-medium">
            {weekday}, {dateFormatted}
          </p>
          <p className="text-sm text-gray-600">às {timeFormatted}</p>
        </div>

        {/* Localização */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-primary" />
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
              Localização
            </span>
          </div>
          {event.location?.name && (
            <p className="text-sm text-gray-900 font-medium mb-1">
              {event.location.name}
            </p>
          )}
          {event.location?.address && (
            <p className="text-sm text-gray-600 mb-3">
              {event.location.address}
            </p>
          )}
          <LinkButton href={locationHref}>
            {hasSpecificLocation ? "Ver no Mapa" : "Ver Auditório"}
          </LinkButton>
        </div>

        {/* Projeto Relacionado */}
        {event.project && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen size={18} className="text-primary" />
              <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
                Projeto
              </span>
            </div>
            <LinkButton href={`${routesPath.projects}/${event.project.slug}`}>
              {event.project.title}
            </LinkButton>
          </div>
        )}
      </div>
    </motion.div>
  );
}
