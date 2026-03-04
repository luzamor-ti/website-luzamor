"use client";

import { Event } from "@/sanity/lib/types/event";
import { Card, Heading, Text } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { MapPin, Calendar, Clock, Images } from "lucide-react";
import Link from "next/link";
import { CATEGORY_LABELS } from "@/constants/eventCategories";
import { formatEventDate } from "@/utils/eventFormatters";

interface EventCardProps {
  event: Event;
  showGalleryIcon?: boolean;
}

export function EventCard({ event, showGalleryIcon = false }: EventCardProps) {
  const { dayNumber, monthShort, weekday, timeFormatted } = formatEventDate(
    event.eventDate,
  );
  const hasGallery = event.gallery && event.gallery.length > 0;
  const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);

  return (
    <motion.div variants={fadeInVariants} className="h-full">
      <Link href={`/evento/${event.slug.current}`}>
        <Card className="overflow-hidden h-full group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-gray-100">
          {/* Image Container */}
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={event.coverImage.alt || event.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Date Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-br from-primary to-primary/90 text-white px-5 py-3 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold leading-none">
                  {dayNumber}
                </div>
                <div className="text-xs uppercase mt-1 opacity-90">
                  {monthShort}
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-secondary px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              {CATEGORY_LABELS[event.category]}
            </div>

            {/* Gallery Icon Badge */}
            {showGalleryIcon && hasGallery && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                <Images size={18} className="text-primary" />
                <span className="text-gray-700">{event.gallery?.length}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 bg-gradient-to-br from-white to-gray-50">
            <Heading
              level={3}
              className="mb-3 group-hover:text-primary transition-colors line-clamp-2"
            >
              {event.title}
            </Heading>

            {/* Description Preview */}
            {event.shortDescription && (
              <Text
                variant="small"
                className="text-gray-600 mb-5 line-clamp-2 leading-relaxed"
              >
                {event.shortDescription}
              </Text>
            )}

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar size={16} className="text-primary flex-shrink-0" />
                </div>
                <Text variant="small" className="font-medium capitalize">
                  {weekday}
                </Text>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Clock size={16} className="text-primary flex-shrink-0" />
                </div>
                <Text variant="small" className="font-medium">
                  {timeFormatted}
                </Text>
              </div>

              {event.location?.name && (
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                  </div>
                  <Text variant="small" className="line-clamp-1 font-medium">
                    {event.location.name}
                  </Text>
                </div>
              )}
            </div>

            {/* Ticket Price */}
            <div className="pt-3 border-t border-gray-200">
              {event.ticketPrice.free ? (
                <Text variant="small" className="text-green-600 font-semibold">
                  Entrada Gratuita
                </Text>
              ) : (
                <Text variant="small" className="text-gray-900 font-semibold">
                  R$ {event.ticketPrice.value?.toFixed(2)}
                </Text>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
