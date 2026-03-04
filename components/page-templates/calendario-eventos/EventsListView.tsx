"use client";

import { Event } from "@/sanity/lib/types/event";
import { EventListItem } from "@/components/events";
import { Text } from "@/components/ui";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CALENDAR_EVENTS_FALLBACKS } from "@/constants/textFallbacks";

interface EventsListViewProps {
  events: Event[];
  initialDisplayCount?: number;
  loadMoreCount?: number;
  showGalleryIcon?: boolean;
}

export function EventsListView({
  events,
  initialDisplayCount = 10,
  loadMoreCount = 10,
  showGalleryIcon = false,
}: EventsListViewProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const visibleEvents = events.slice(0, displayCount);
  const hasMore = displayCount < events.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + loadMoreCount, events.length));
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-20" role="status">
        <Text className="text-gray-500 text-lg">
          {CALENDAR_EVENTS_FALLBACKS.noEventsFound}
        </Text>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
      >
        {visibleEvents.map((event) => (
          <motion.div key={event._id} variants={staggerItemVariants}>
            <EventListItem event={event} showGalleryIcon={showGalleryIcon} />
          </motion.div>
        ))}
      </motion.div>

      {/* Botão Carregar Mais */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={handleLoadMore}
            className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.loadMore}
          >
            {CALENDAR_EVENTS_FALLBACKS.loadMoreButton}
            <ChevronDown
              size={24}
              className="group-hover:translate-y-1 transition-transform"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      )}

      {/* Contador de eventos exibidos */}
      <div className="text-center mt-6" role="status" aria-live="polite">
        <Text className="text-sm text-gray-500">
          {CALENDAR_EVENTS_FALLBACKS.showingCount
            .replace("{current}", visibleEvents.length.toString())
            .replace("{total}", events.length.toString())}
        </Text>
      </div>
    </div>
  );
}
