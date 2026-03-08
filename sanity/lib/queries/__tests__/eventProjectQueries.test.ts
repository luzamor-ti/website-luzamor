import { describe, it, expect } from "vitest";
import {
  eventsQuery,
  upcomingEventsQuery,
  featuredEventsQuery,
  eventBySlugQuery,
  allUpcomingEventsQuery,
  allPastEventsQuery,
  eventsByProjectQuery,
} from "@/sanity/lib/queries/event";

// ─────────────────────────────────────────
// Tests for GROQ queries — project projection
// Validates that all event queries include the
// project reference field in their projections
// ─────────────────────────────────────────

describe("Event GROQ queries — project field projection", () => {
  const projectProjectionPattern =
    /projeto->\s*\{[\s\S]*?_id[\s\S]*?titulo[\s\S]*?slug/;

  it("eventsQuery includes project projection", () => {
    expect(eventsQuery).toMatch(projectProjectionPattern);
  });

  it("upcomingEventsQuery includes project projection", () => {
    expect(upcomingEventsQuery).toMatch(projectProjectionPattern);
  });

  it("featuredEventsQuery includes project projection", () => {
    expect(featuredEventsQuery).toMatch(projectProjectionPattern);
  });

  it("eventBySlugQuery includes project projection", () => {
    expect(eventBySlugQuery).toMatch(projectProjectionPattern);
  });

  it("allUpcomingEventsQuery includes project projection", () => {
    expect(allUpcomingEventsQuery).toMatch(projectProjectionPattern);
  });

  it("allPastEventsQuery includes project projection", () => {
    expect(allPastEventsQuery).toMatch(projectProjectionPattern);
  });

  it("eventsByProjectQuery includes project projection", () => {
    expect(eventsByProjectQuery).toMatch(projectProjectionPattern);
  });

  describe("eventsByProjectQuery — specific validation", () => {
    it("filters by projeto._ref matching $projectId", () => {
      expect(eventsByProjectQuery).toContain("projeto._ref == $projectId");
    });

    it("filters only active events", () => {
      expect(eventsByProjectQuery).toContain("ativo == true");
    });

    it("orders by event date descending", () => {
      expect(eventsByProjectQuery).toContain("order(dataEvento desc)");
    });
  });
});
