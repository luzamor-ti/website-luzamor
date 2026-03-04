"use client";

import { Event } from "@/sanity/lib/types/event";
import { Heading, Text } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Clock, ArrowRight, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_COLORS_FEATURED,
} from "@/constants/eventCategories";
import { formatEventDate } from "@/utils/eventFormatters";
import { handleEventCTAClick } from "@/utils/eventCta";

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);
  const { dayNumber, monthShort, year, timeFormatted } = formatEventDate(
    event.eventDate,
  );

  const CategoryIcon = CATEGORY_ICONS[event.category] || Circle;
  const categoryColor =
    CATEGORY_COLORS_FEATURED[event.category] || CATEGORY_COLORS_FEATURED.outro;

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEventCTAClick(event);
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
