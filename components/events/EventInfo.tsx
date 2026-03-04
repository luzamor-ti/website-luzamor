"use client";

import { Button, Heading, Text } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import { Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { routesPath } from "@/constants/routesPath";
import { formatEventDate } from "@/utils/eventFormatters";
import { buildEventCTA, getCTAButtonText } from "@/utils/eventCta";

interface EventInfoProps {
  event: Event;
}

export function EventInfo({ event }: EventInfoProps) {
  const { dateFormatted, timeFormatted, weekday } = formatEventDate(
    event.eventDate,
  );

  // CTA Logic
  const ctaButtonText = getCTAButtonText(event);
  const { href: ctaHref } = buildEventCTA(event);

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
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6"
    >
      <Heading level={3} className="mb-4">
        Informações do Evento
      </Heading>

      {/* Valor do Ingresso - DESTAQUE */}
      {event.ticketPrice && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Ticket size={24} className="text-primary" />
            <Text
              variant="small"
              className="text-gray-600 uppercase font-bold tracking-wide"
            >
              Valor do Ingresso
            </Text>
          </div>
          {isFree ? (
            <Text className="text-3xl font-extrabold text-primary">
              Gratuito
            </Text>
          ) : (
            <Text className="text-3xl font-extrabold text-primary">
              R$ {ticketValue?.toFixed(2).replace(".", ",")}
            </Text>
          )}
        </div>
      )}

      {/* Botão CTA - DESTAQUE */}
      <Button
        href={ctaHref}
        external
        variant="primary"
        size="lg"
        fullWidth
        className="font-bold"
      >
        {ctaButtonText}
      </Button>

      {/* Data e Horário */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-primary" />
            <Text
              variant="small"
              className="text-gray-500 uppercase font-semibold"
            >
              Data e Horário
            </Text>
          </div>
          <Text className="italic text-gray-700">
            {weekday}, {dateFormatted} às {timeFormatted}
          </Text>
        </div>
      </div>

      {/* Localização */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} className="text-primary" />
          <Text
            variant="small"
            className="text-gray-500 uppercase font-semibold"
          >
            Localização
          </Text>
        </div>
        {event.location?.name && (
          <Text className="text-gray-700 font-medium mb-2">
            {event.location.name}
          </Text>
        )}
        {event.location?.address && (
          <Text variant="small" className="text-gray-600 mb-3">
            {event.location.address}
          </Text>
        )}
        <Button
          href={locationHref}
          external={hasSpecificLocation}
          variant="outline-secondary"
          size="sm"
          fullWidth
        >
          <MapPin size={14} />
          {hasSpecificLocation ? "Ver no Mapa" : "Ver Auditório"}
          {hasSpecificLocation && <ExternalLink size={12} />}
        </Button>
      </div>
    </motion.div>
  );
}
