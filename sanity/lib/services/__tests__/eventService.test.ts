import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getEvents,
  getUpcomingEvents,
  getFeaturedEvents,
  getEventBySlug,
  getAllUpcomingEvents,
  getAllPastEvents,
  getEventsCalendarData,
} from "@/sanity/lib/services/eventService";
import {
  createMockEvents,
  createMockEvent,
} from "@/components/events/__tests__/eventMocks";

// ─────────────────────────────────────────
// Mock do client Sanity
// ─────────────────────────────────────────

vi.mock("@/sanity/lib/client", () => ({
  client: { fetch: vi.fn() },
}));

import { client } from "@/sanity/lib/client";

const mockFetch = vi.mocked(client.fetch);

beforeEach(() => {
  vi.clearAllMocks();
});

// ─────────────────────────────────────────
// getEvents
// ─────────────────────────────────────────

describe("getEvents", () => {
  it("retorna lista de eventos quando fetch tem sucesso", async () => {
    const events = createMockEvents(3);
    mockFetch.mockResolvedValueOnce(events);

    const result = await getEvents();
    expect(result).toEqual(events);
    expect(result).toHaveLength(3);
  });

  it("retorna array vazio quando fetch retorna null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await getEvents();
    expect(result).toEqual([]);
  });

  it("retorna array vazio em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    const result = await getEvents();
    expect(result).toEqual([]);
  });
});

// ─────────────────────────────────────────
// getUpcomingEvents
// ─────────────────────────────────────────

describe("getUpcomingEvents", () => {
  it("retorna eventos próximos quando fetch tem sucesso", async () => {
    const events = createMockEvents(2);
    mockFetch.mockResolvedValueOnce(events);

    const result = await getUpcomingEvents();
    expect(result).toEqual(events);
    expect(result).toHaveLength(2);
  });

  it("retorna array vazio quando fetch retorna null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await getUpcomingEvents();
    expect(result).toEqual([]);
  });

  it("retorna array vazio em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Timeout"));
    const result = await getUpcomingEvents();
    expect(result).toEqual([]);
  });
});

// ─────────────────────────────────────────
// getFeaturedEvents
// ─────────────────────────────────────────

describe("getFeaturedEvents", () => {
  it("retorna eventos em destaque quando fetch tem sucesso", async () => {
    const events = createMockEvents(1);
    mockFetch.mockResolvedValueOnce(events);

    const result = await getFeaturedEvents();
    expect(result).toEqual(events);
  });

  it("retorna array vazio quando fetch retorna null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await getFeaturedEvents();
    expect(result).toEqual([]);
  });

  it("retorna array vazio em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Server error"));
    const result = await getFeaturedEvents();
    expect(result).toEqual([]);
  });
});

// ─────────────────────────────────────────
// getEventBySlug
// ─────────────────────────────────────────

describe("getEventBySlug", () => {
  it("retorna evento quando slug é encontrado", async () => {
    const event = createMockEvent();
    mockFetch.mockResolvedValueOnce(event);

    const result = await getEventBySlug("workshop-artesanato");
    expect(result).toEqual(event);
  });

  it("retorna null quando evento não é encontrado", async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await getEventBySlug("slug-inexistente");
    expect(result).toBeNull();
  });

  it("retorna null em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Not found"));
    const result = await getEventBySlug("qualquer-slug");
    expect(result).toBeNull();
  });
});

// ─────────────────────────────────────────
// getAllUpcomingEvents
// ─────────────────────────────────────────

describe("getAllUpcomingEvents", () => {
  it("retorna todos os próximos eventos quando fetch tem sucesso", async () => {
    const events = createMockEvents(5);
    mockFetch.mockResolvedValueOnce(events);

    const result = await getAllUpcomingEvents();
    expect(result).toHaveLength(5);
  });

  it("retorna array vazio quando fetch retorna null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await getAllUpcomingEvents();
    expect(result).toEqual([]);
  });

  it("retorna array vazio em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Fetch failed"));
    const result = await getAllUpcomingEvents();
    expect(result).toEqual([]);
  });
});

// ─────────────────────────────────────────
// getAllPastEvents
// ─────────────────────────────────────────

describe("getAllPastEvents", () => {
  it("retorna eventos passados quando fetch tem sucesso", async () => {
    const events = createMockEvents(4);
    mockFetch.mockResolvedValueOnce(events);

    const result = await getAllPastEvents();
    expect(result).toHaveLength(4);
  });

  it("retorna array vazio quando fetch retorna null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await getAllPastEvents();
    expect(result).toEqual([]);
  });

  it("retorna array vazio em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Database error"));
    const result = await getAllPastEvents();
    expect(result).toEqual([]);
  });
});

// ─────────────────────────────────────────
// getEventsCalendarData
// ─────────────────────────────────────────

describe("getEventsCalendarData", () => {
  it("retorna dados do calendário com próximos e passados", async () => {
    const upcoming = createMockEvents(3);
    const past = createMockEvents(2);

    // getAllUpcomingEvents e getAllPastEvents fazem fetch separados em Promise.all
    mockFetch.mockResolvedValueOnce(upcoming).mockResolvedValueOnce(past);

    const result = await getEventsCalendarData();

    expect(result.upcomingEvents).toEqual(upcoming);
    expect(result.pastEvents).toEqual(past);
  });

  it("retorna arrays vazios quando ambos fetch retornam null", async () => {
    mockFetch.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

    const result = await getEventsCalendarData();

    expect(result.upcomingEvents).toEqual([]);
    expect(result.pastEvents).toEqual([]);
  });

  it("retorna estrutura com arrays vazios em caso de erro", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Calendar fetch failed"));

    const result = await getEventsCalendarData();

    expect(result).toEqual({ upcomingEvents: [], pastEvents: [] });
  });
});
