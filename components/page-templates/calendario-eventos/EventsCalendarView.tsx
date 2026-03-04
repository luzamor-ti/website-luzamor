"use client";

import { Event } from "@/sanity/lib/types/event";
import { Heading, Text } from "@/components/ui";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { CALENDAR_EVENTS_FALLBACKS } from "@/constants/textFallbacks";

interface EventsCalendarViewProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export function EventsCalendarView({
  upcomingEvents,
  pastEvents,
}: EventsCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: ptBR });
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const allEvents = [...upcomingEvents, ...pastEvents];

  const getEventsForDay = (day: Date) => {
    return allEvents.filter((event) =>
      isSameDay(new Date(event.eventDate), day),
    );
  };

  const isUpcomingEvent = (event: Event) => {
    return upcomingEvents.some((e) => e._id === event._id);
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <section
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
      aria-label="Calendário de eventos"
    >
      {/* Header do calendário */}
      <header className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
        <button
          onClick={handlePrevMonth}
          className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.previousMonth}
        >
          <ChevronLeft
            size={20}
            className="text-gray-600 sm:w-6 sm:h-6"
            aria-hidden="true"
          />
        </button>

        <Heading
          level={3}
          className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 capitalize text-center px-2"
        >
          {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </Heading>

        <button
          onClick={handleNextMonth}
          className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.nextMonth}
        >
          <ChevronRight
            size={20}
            className="text-gray-600 sm:w-6 sm:h-6"
            aria-hidden="true"
          />
        </button>
      </header>

      {/* Grid do calendário - Responsivo */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Dias da semana */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-1 sm:py-2"
          >
            {day}
          </div>
        ))}

        {/* Dias do mês */}
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={index}
              className={`min-h-[60px] sm:min-h-[80px] md:min-h-[100px] p-1 sm:p-1.5 md:p-2 border rounded-md sm:rounded-lg transition-colors ${
                isCurrentMonth
                  ? "bg-white border-gray-200"
                  : "bg-gray-50 border-gray-100"
              } ${isToday ? "ring-1 sm:ring-2 ring-primary" : ""}`}
            >
              {/* Número do dia */}
              <div
                className={`text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 ${
                  isCurrentMonth ? "text-gray-900" : "text-gray-400"
                } ${isToday ? "text-primary" : ""}`}
              >
                {format(day, "d")}
              </div>

              {/* Eventos do dia - Limite 2 no mobile, 3 no desktop */}
              <div className="space-y-0.5 sm:space-y-1">
                {dayEvents.slice(0, 2).map((event) => {
                  const eventTime = new Date(
                    event.eventDate,
                  ).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <Link
                      key={event._id}
                      href={`/evento/${event.slug.current}`}
                      className={`block text-[10px] sm:text-xs p-1 sm:p-1.5 rounded transition-colors font-medium min-h-[24px] sm:min-h-auto ${
                        isUpcomingEvent(event)
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      title={`${event.title} - ${eventTime}`}
                    >
                      <div className="flex items-center justify-between gap-0.5 sm:gap-1">
                        <span className="truncate flex-1 leading-tight">
                          {event.title}
                        </span>
                        <span className="text-[9px] sm:text-[10px] opacity-90 font-bold whitespace-nowrap leading-tight">
                          {eventTime}
                        </span>
                      </div>
                    </Link>
                  );
                })}{" "}
                {dayEvents.length > 2 && (
                  <Text className="text-[10px] sm:text-xs text-gray-500 text-center leading-tight">
                    {CALENDAR_EVENTS_FALLBACKS.andMore.replace(
                      "{count}",
                      (dayEvents.length - 2).toString(),
                    )}
                  </Text>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda - Responsiva */}
      <footer className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded"
            aria-hidden="true"
          />
          <Text className="text-gray-600">
            {CALENDAR_EVENTS_FALLBACKS.legendUpcoming}
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"
            aria-hidden="true"
          />
          <Text className="text-gray-600">
            {CALENDAR_EVENTS_FALLBACKS.legendPast}
          </Text>
        </div>
      </footer>
    </section>
  );
}
