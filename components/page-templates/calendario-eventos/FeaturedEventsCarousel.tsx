"use client";

import { Event } from "@/sanity/lib/types/event";
import { FeaturedEvent } from "./FeaturedEvent";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CALENDAR_EVENTS_FALLBACKS } from "@/constants/textFallbacks";

interface FeaturedEventsCarouselProps {
  events: Event[];
  autoplayDelay?: number; // em milissegundos
}

export function FeaturedEventsCarousel({
  events,
  autoplayDelay = 5000,
}: FeaturedEventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 para próximo, -1 para anterior

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  // Autoplay
  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [events.length, autoplayDelay, handleNext]);

  // Se não houver eventos, não renderiza nada
  if (events.length === 0) return null;

  // Se houver apenas 1 evento, renderiza sem carrossel
  if (events.length === 1) {
    return <FeaturedEvent event={events[0]} />;
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      {/* Carrossel Container */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <FeaturedEvent event={events[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons - Responsivos */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-10 group cursor-pointer min-h-[40px] min-w-[40px] sm:min-h-[48px] sm:min-w-[48px] flex items-center justify-center"
        aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.previousEvent}
      >
        <ChevronLeft
          size={20}
          className="text-gray-700 group-hover:text-primary transition-colors sm:w-6 sm:h-6"
          aria-hidden="true"
        />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-10 group cursor-pointer min-h-[40px] min-w-[40px] sm:min-h-[48px] sm:min-w-[48px] flex items-center justify-center"
        aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.nextEvent}
      >
        <ChevronRight
          size={20}
          className="text-gray-700 group-hover:text-primary transition-colors sm:w-6 sm:h-6"
          aria-hidden="true"
        />
      </button>

      {/* Indicators (Dots) - Responsivos */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 px-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="p-2 cursor-pointer group"
            aria-label={`Ir para evento ${index + 1}`}
            aria-current={index === currentIndex}
          >
            <div
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-10 sm:w-12 h-2.5 sm:h-3 bg-primary"
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 group-hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
