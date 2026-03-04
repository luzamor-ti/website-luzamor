"use client";

import { Event } from "@/sanity/lib/types/event";
import { Heading, Text } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Calendar, Clock, MapPin, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CALENDAR_EVENTS_FALLBACKS } from "@/constants/textFallbacks";
import { EventCategoryBadge } from "./EventCategoryBadge";

interface EventListItemProps {
  event: Event;
  showGalleryIcon?: boolean;
}

export function EventListItem({
  event,
  showGalleryIcon = false,
}: EventListItemProps) {
  const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);
  const eventDate = new Date(event.eventDate);
  const dayNumber = format(eventDate, "dd", { locale: ptBR });
  const monthShort = format(eventDate, "MMM", { locale: ptBR }).toUpperCase();
  const weekday = format(eventDate, "EEEE", { locale: ptBR });
  const timeFormatted = eventDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article>
      <Link
        href={`/evento/${event.slug.current}`}
        className="flex flex-col sm:flex-row gap-0 sm:gap-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
      >
        {/* Imagem + Data Badge - Full width mobile, fixed width desktop */}
        <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={event.coverImage.alt || event.title}
              width={256}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 256px"
              quality={75}
            />
          )}

          {/* Date Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white rounded-lg sm:rounded-xl shadow-lg px-3 py-2 sm:px-4 sm:py-3 text-center">
            <time dateTime={event.eventDate}>
              <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">
                {dayNumber}
              </div>
              <div className="text-xs font-semibold text-gray-600 mt-1">
                {monthShort}
              </div>
            </time>
          </div>

          {/* Gallery Icon */}
          {showGalleryIcon && event.gallery && event.gallery.length > 0 && (
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1.5 sm:gap-2">
              <ImageIcon
                size={14}
                className="text-primary sm:w-4 sm:h-4"
                aria-hidden="true"
              />
              <Text className="text-xs sm:text-sm font-semibold text-gray-700">
                {event.gallery.length}
              </Text>
            </div>
          )}
        </div>

        {/* Conteúdo - Padding responsivo */}
        <div className="flex-1 p-4 sm:py-6 sm:pr-6 flex flex-col justify-between">
          {/* Topo */}
          <div>
            {/* Categoria Badge */}
            <div className="mb-2 sm:mb-3">
              <EventCategoryBadge category={event.category} size="sm" />
            </div>

            {/* Título */}
            <Heading
              level={3}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2"
            >
              {event.title}
            </Heading>

            {/* Descrição - Esconder no mobile para economizar espaço */}
            {event.shortDescription && (
              <Text className="hidden sm:block text-sm sm:text-base text-gray-600 line-clamp-2 mb-3 sm:mb-4">
                {event.shortDescription}
              </Text>
            )}
          </div>

          {/* Informações - Wrap melhorado para mobile */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar
                size={14}
                className="text-primary sm:w-4 sm:h-4"
                aria-hidden="true"
              />
              <Text className="text-xs sm:text-sm font-medium capitalize">
                {weekday}
              </Text>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock
                size={14}
                className="text-primary sm:w-4 sm:h-4"
                aria-hidden="true"
              />
              <Text className="text-xs sm:text-sm font-medium">
                {timeFormatted}
              </Text>
            </div>

            {event.location?.name && (
              <div className="flex items-center gap-1.5 sm:gap-2 max-w-[200px] sm:max-w-none">
                <MapPin
                  size={14}
                  className="text-primary flex-shrink-0 sm:w-4 sm:h-4"
                  aria-hidden="true"
                />
                <Text className="text-xs sm:text-sm font-medium line-clamp-1">
                  {event.location.name}
                </Text>
              </div>
            )}

            {/* Entrada Gratuita */}
            {event.ticketPrice.free && (
              <span className="ml-auto bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                {CALENDAR_EVENTS_FALLBACKS.freeEntry}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
