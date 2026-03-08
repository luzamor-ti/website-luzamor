export interface EventDateFormatted {
  /** Data completa formatada: "01 de Janeiro, 2024" */
  dateFormatted: string;
  /** Hora formatada: "14:30" */
  timeFormatted: string;
  /** Dia do mês: "01" */
  dayNumber: string;
  /** Mês abreviado: "JAN" */
  monthShort: string;
  /** Dia da semana: "segunda-feira" */
  weekday: string;
  /** Ano: "2024" */
  year: string;
}
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getEventsByProject,
  getEventBySlug,
  getEvents,
} from "@/sanity/lib/services/eventService";
import { eventsByProjectQuery } from "@/sanity/lib/queries/event";

// ─────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────

vi.mock("@/sanity/lib/client", () => ({
  client: {
    fetch: vi.fn(),
  },
}));

import { client } from "@/sanity/lib/client";

// ─────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────

const mockProjectRef = {
  _id: "project-1",
  title: "Projeto Esperança",
  slug: "projeto-esperanca",
};

const mockEventsWithProject = [
  {
    _id: "event-1",
    title: "Workshop de Artesanato",
    slug: { current: "workshop-artesanato" },
    project: mockProjectRef,
    active: true,
  },
  {
    _id: "event-2",
    title: "Palestra Educacional",
    slug: { current: "palestra-educacional" },
    project: mockProjectRef,
    active: true,
  },
];

const mockEventWithProjectDetail = {
  _id: "event-1",
  title: "Workshop de Artesanato",
  slug: { current: "workshop-artesanato" },
  project: mockProjectRef,
  active: true,
};

const mockEventWithoutProject = {
  _id: "event-3",
  title: "Evento Independente",
  slug: { current: "evento-independente" },
  project: null,
  active: true,
};

// ─────────────────────────────────────────
// Tests
// ─────────────────────────────────────────

describe("eventService — Event ↔ Project relationship", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getEventsByProject", () => {
    it("returns events for a given project ID", async () => {
      vi.mocked(client.fetch).mockResolvedValueOnce(
        mockEventsWithProject as never,
      );

      const result = await getEventsByProject("project-1");

      expect(client.fetch).toHaveBeenCalledWith(eventsByProjectQuery, {
        projectId: "project-1",
      });
      expect(result).toHaveLength(2);
      expect(result[0].project).toEqual(mockProjectRef);
      expect(result[1].project).toEqual(mockProjectRef);
    });

    it("returns empty array when project has no events", async () => {
      vi.mocked(client.fetch).mockResolvedValueOnce([] as never);

      const result = await getEventsByProject("project-no-events");

      expect(result).toEqual([]);
    });

    it("returns empty array when fetch returns null", async () => {
      vi.mocked(client.fetch).mockResolvedValueOnce(null as never);

      const result = await getEventsByProject("project-1");

      expect(result).toEqual([]);
    });

    it("returns empty array on fetch error", async () => {
      vi.mocked(client.fetch).mockRejectedValueOnce(new Error("Network error"));

      const result = await getEventsByProject("project-1");

      expect(result).toEqual([]);
    });
  });

  describe("getEventBySlug — project field", () => {
    it("returns event with project when linked", async () => {
      vi.mocked(client.fetch).mockResolvedValueOnce(
        mockEventWithProjectDetail as never,
      );

      const result = await getEventBySlug("workshop-artesanato");

      expect(result).not.toBeNull();
      expect(result!.project).toEqual(mockProjectRef);
    });

    it("returns event with project null when not linked", async () => {
      vi.mocked(client.fetch).mockResolvedValueOnce(
        mockEventWithoutProject as never,
      );

      const result = await getEventBySlug("evento-independente");

      expect(result).not.toBeNull();
      expect(result!.project).toBeNull();
    });
  });

  describe("getEvents — project field in list", () => {
    it("returns events with mixed project states", async () => {
      const mixedEvents = [
        { ...mockEventWithProjectDetail },
        { ...mockEventWithoutProject },
      ];
      vi.mocked(client.fetch).mockResolvedValueOnce(mixedEvents as never);

      const result = await getEvents();

      expect(result).toHaveLength(2);
      expect(result[0].project).toEqual(mockProjectRef);
      expect(result[1].project).toBeNull();
    });
  });
});
