"use client";

import { Heading, Text } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

interface EventInfoProps {
  event: Event;
}

export function EventInfo({ event }: EventInfoProps) {
  const eventDate = new Date(event.eventDate);
  const dateFormatted = format(eventDate, "dd 'de' MMMM, yyyy", {
    locale: ptBR,
  });
  const timeFormatted = format(eventDate, "HH:mm", { locale: ptBR });
  const weekday = format(eventDate, "EEEE", { locale: ptBR });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100"
    >
      <Heading level={3} className="mb-6">
        Informações do Evento
      </Heading>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Calendar size={20} className="text-primary" />
          </div>
          <div>
            <Text
              variant="small"
              className="text-gray-500 uppercase font-semibold"
            >
              Data
            </Text>
            <Text className="font-medium capitalize">{weekday}</Text>
            <Text className="font-medium">{dateFormatted}</Text>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Clock size={20} className="text-primary" />
          </div>
          <div>
            <Text
              variant="small"
              className="text-gray-500 uppercase font-semibold"
            >
              Horário
            </Text>
            <Text className="font-medium">{timeFormatted}</Text>
          </div>
        </div>

        {event.location && (
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <MapPin size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <Text
                variant="small"
                className="text-gray-500 uppercase font-semibold"
              >
                Local
              </Text>
              <Text className="font-medium">{event.location.name}</Text>
              {event.location.address && (
                <Text variant="small" className="text-gray-600 mt-1">
                  {event.location.address}
                </Text>
              )}
              {event.location.mapLink && (
                <a
                  href={event.location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline mt-2 text-sm font-medium"
                >
                  Ver no mapa <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {event.ticketPrice && (
          <div className="flex items-start gap-3 pt-4 border-t border-gray-200">
            <div className="bg-secondary/10 p-3 rounded-lg">
              <DollarSign size={20} className="text-secondary" />
            </div>
            <div>
              <Text
                variant="small"
                className="text-gray-500 uppercase font-semibold"
              >
                Ingresso
              </Text>
              {event.ticketPrice.free ? (
                <Text className="font-bold text-secondary text-lg">
                  Gratuito
                </Text>
              ) : (
                <Text className="font-medium">
                  R$ {event.ticketPrice.value?.toFixed(2)}
                </Text>
              )}
              {event.ticketPrice.additionalInfo && (
                <Text variant="small" className="text-gray-600 mt-1">
                  {event.ticketPrice.additionalInfo}
                </Text>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
