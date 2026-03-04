"use client";

import { Calendar as CalendarIcon, List } from "lucide-react";
import { CALENDAR_EVENTS_FALLBACKS } from "@/constants/textFallbacks";

export type EventsTab = "upcoming" | "past";
export type EventsView = "list" | "calendar";

interface EventsTabNavigationProps {
  activeTab: EventsTab;
  onTabChange: (tab: EventsTab) => void;
  activeView: EventsView;
  onViewChange: (view: EventsView) => void;
}

export function EventsTabNavigation({
  activeTab,
  onTabChange,
  activeView,
  onViewChange,
}: EventsTabNavigationProps) {
  return (
    <nav
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gray-200"
      aria-label="Navegação de eventos"
    >
      {/* Tab Navigation: Próximos Eventos | Eventos Passados - RESPONSIVO */}
      <div
        className="w-full sm:w-auto flex items-center gap-1.5 sm:gap-2 bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-lg border border-gray-200"
        role="tablist"
      >
        <button
          onClick={() => onTabChange("upcoming")}
          className={`flex-1 sm:flex-none px-4 sm:px-8 md:px-12 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "upcoming"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
          role="tab"
          aria-selected={activeTab === "upcoming"}
          aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.upcomingTab}
        >
          {CALENDAR_EVENTS_FALLBACKS.tabUpcoming}
        </button>
        <div className="h-6 sm:h-8 w-px bg-gray-200" aria-hidden="true" />
        <button
          onClick={() => onTabChange("past")}
          className={`flex-1 sm:flex-none px-4 sm:px-8 md:px-12 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "past"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
          role="tab"
          aria-selected={activeTab === "past"}
          aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.pastTab}
        >
          {CALENDAR_EVENTS_FALLBACKS.tabPast}
        </button>
      </div>

      {/* View Toggle: Lista | Calendário - Touch-friendly */}
      <div
        className="flex items-center gap-2 justify-center sm:justify-start"
        role="toolbar"
        aria-label="Alternar visualização"
      >
        <button
          onClick={() => onViewChange("list")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer min-h-[44px] ${
            activeView === "list"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.listView}
          aria-pressed={activeView === "list"}
        >
          <List size={18} aria-hidden="true" />
          <span className="hidden sm:inline">
            {CALENDAR_EVENTS_FALLBACKS.viewList}
          </span>
        </button>
        <button
          onClick={() => onViewChange("calendar")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer min-h-[44px] ${
            activeView === "calendar"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label={CALENDAR_EVENTS_FALLBACKS.ariaLabels.calendarView}
          aria-pressed={activeView === "calendar"}
        >
          <CalendarIcon size={18} aria-hidden="true" />
          <span className="hidden sm:inline">
            {CALENDAR_EVENTS_FALLBACKS.viewCalendar}
          </span>
        </button>
      </div>
    </nav>
  );
}
