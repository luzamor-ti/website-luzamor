"use client";

import { Event } from "@/sanity/lib/types/event";
import { Page } from "@/sanity/lib/types/page";
import { Section, SectionHeader } from "@/components/ui";
import {
  FeaturedEventsCarousel,
  EventsTabNavigation,
  EventsListView,
  EventsCalendarView,
  type EventsTab,
  type EventsView,
} from "./calendario-eventos";
import { useState } from "react";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { CALENDAR_EVENTS_FALLBACKS } from "@/constants/textFallbacks";

interface CalendarioEventosTemplateProps {
  pagina: Page;
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export function CalendarioEventosTemplate({
  pagina,
  upcomingEvents,
  pastEvents,
}: CalendarioEventosTemplateProps) {
  // Pega os próximos 3 eventos para o carrossel featured
  const featuredEvents = upcomingEvents.slice(0, 3);

  // Estados para tabs e visualização
  const [activeTab, setActiveTab] = useState<EventsTab>("upcoming");
  const [activeView, setActiveView] = useState<EventsView>("list");

  // Eventos a exibir baseado na tab ativa (TODOS os próximos eventos)
  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <Section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16">
        <SectionHeader
          tag={CALENDAR_EVENTS_FALLBACKS.agendaTag}
          title={pagina.title}
          description={pagina.description}
          align="left"
          variant="light"
        />
      </Section>

      {/* FEATURED EVENTS CAROUSEL - PRÓXIMOS 3 EVENTOS EM DESTAQUE */}
      {featuredEvents.length > 0 && (
        <Section
          className="pb-12 sm:pb-16 md:pb-20 pt-0"
          aria-label="Eventos em destaque"
        >
          <FeaturedEventsCarousel
            events={featuredEvents}
            autoplayDelay={7000}
          />
        </Section>
      )}

      {/* EVENTS SECTION COM TABS E VISUALIZAÇÃO */}
      <Section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-gray-50 to-transparent">
        {/* Tab Navigation e View Toggle - Esconder quando visualização é calendário */}
        {activeView === "list" && (
          <EventsTabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeView={activeView}
            onViewChange={setActiveView}
          />
        )}

        {/* View Toggle sozinho quando visualização é calendário */}
        {activeView === "calendar" && (
          <div className="flex justify-center sm:justify-end mb-6 sm:mb-8">
            <div
              className="flex items-center gap-2"
              role="toolbar"
              aria-label="Alternar visualização"
            >
              <button
                onClick={() => setActiveView("list")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200 min-h-[44px]"
                aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.listView}
                aria-pressed={false}
              >
                <List size={18} aria-hidden="true" />
                <span className="hidden sm:inline">
                  {CALENDAR_EVENTS_FALLBACKS.viewList}
                </span>
              </button>
              <button
                onClick={() => setActiveView("calendar")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer bg-primary text-white shadow-sm min-h-[44px]"
                aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.calendarView}
                aria-pressed={true}
              >
                <CalendarIcon size={18} aria-hidden="true" />
                <span className="hidden sm:inline">
                  {CALENDAR_EVENTS_FALLBACKS.viewCalendar}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo baseado na visualização selecionada */}
        {activeView === "list" ? (
          <EventsListView
            key={activeTab} // Força remontagem quando muda de tab
            events={displayEvents}
            initialDisplayCount={10}
            loadMoreCount={10}
            showGalleryIcon={activeTab === "past"}
          />
        ) : (
          <EventsCalendarView
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
          />
        )}
      </Section>
    </main>
  );
}
