import { describe, it, expect } from "vitest";
import { Event } from "@/sanity/lib/types/event";
import {
  createMockEvent,
  mockEventWithProject,
  mockEventWithoutProject,
  mockProject,
} from "@/components/events/__tests__/eventMocks";

// ─────────────────────────────────────────
// Type-level validation for Event ↔ Project relationship
// ─────────────────────────────────────────

describe("Event ↔ Project relationship — Type validation", () => {
  describe("Event.project field", () => {
    it("accepts a project object with _id, title, and slug", () => {
      const event: Event = createMockEvent({
        project: {
          _id: "project-1",
          title: "Projeto Esperança",
          slug: "projeto-esperanca",
        },
      });

      expect(event.project).toBeDefined();
      expect(event.project!._id).toBe("project-1");
      expect(event.project!.title).toBe("Projeto Esperança");
      expect(event.project!.slug).toBe("projeto-esperanca");
    });

    it("accepts null when event has no project", () => {
      const event: Event = createMockEvent({ project: null });

      expect(event.project).toBeNull();
    });

    it("accepts undefined when project field is omitted", () => {
      const event: Event = createMockEvent();

      expect(event.project).toBeUndefined();
    });

    it("correctly types project as optional", () => {
      const eventWithProject = mockEventWithProject;
      const eventWithoutProject = mockEventWithoutProject;

      // With project
      expect(eventWithProject.project).toEqual(mockProject);

      // Without project (null)
      expect(eventWithoutProject.project).toBeNull();
    });
  });

  describe("Project reference structure", () => {
    it("project contains only _id, title, and slug (denormalized)", () => {
      const event = mockEventWithProject;
      const projectKeys = Object.keys(event.project!);

      expect(projectKeys).toContain("_id");
      expect(projectKeys).toContain("title");
      expect(projectKeys).toContain("slug");
      expect(projectKeys).toHaveLength(3);
    });

    it("project slug is a plain string (not object)", () => {
      const event = mockEventWithProject;

      expect(typeof event.project!.slug).toBe("string");
    });
  });

  describe("One-to-many relationship (Project → Events)", () => {
    it("multiple events can reference the same project", () => {
      const sharedProject = {
        _id: "project-shared",
        title: "Projeto Compartilhado",
        slug: "projeto-compartilhado",
      };

      const event1: Event = createMockEvent({
        _id: "event-a",
        project: sharedProject,
      });
      const event2: Event = createMockEvent({
        _id: "event-b",
        project: sharedProject,
      });
      const event3: Event = createMockEvent({
        _id: "event-c",
        project: sharedProject,
      });

      expect(event1.project!._id).toBe(sharedProject._id);
      expect(event2.project!._id).toBe(sharedProject._id);
      expect(event3.project!._id).toBe(sharedProject._id);
    });

    it("events can belong to different projects", () => {
      const projectA = { _id: "proj-a", title: "Projeto A", slug: "proj-a" };
      const projectB = { _id: "proj-b", title: "Projeto B", slug: "proj-b" };

      const event1: Event = createMockEvent({
        _id: "event-1",
        project: projectA,
      });
      const event2: Event = createMockEvent({
        _id: "event-2",
        project: projectB,
      });

      expect(event1.project!._id).not.toBe(event2.project!._id);
    });

    it("a list of events can be filtered by project ID", () => {
      const targetProjectId = "project-target";
      const targetProject = {
        _id: targetProjectId,
        title: "Target",
        slug: "target",
      };

      const events: Event[] = [
        createMockEvent({ _id: "e1", project: targetProject }),
        createMockEvent({ _id: "e2", project: null }),
        createMockEvent({
          _id: "e3",
          project: { _id: "other", title: "Other", slug: "other" },
        }),
        createMockEvent({ _id: "e4", project: targetProject }),
      ];

      const projectEvents = events.filter(
        (e) => e.project?._id === targetProjectId,
      );

      expect(projectEvents).toHaveLength(2);
      expect(projectEvents[0]._id).toBe("e1");
      expect(projectEvents[1]._id).toBe("e4");
    });
  });

  describe("Optional relationship constraint", () => {
    it("event is fully valid without a project", () => {
      const event: Event = createMockEvent({ project: undefined });

      // Core fields still present
      expect(event._id).toBeDefined();
      expect(event.title).toBeDefined();
      expect(event.slug).toBeDefined();
      expect(event.category).toBeDefined();
      expect(event.eventDate).toBeDefined();
      expect(event.active).toBe(true);
    });

    it("event is fully valid with a project", () => {
      const event = mockEventWithProject;

      // Core fields still present
      expect(event._id).toBeDefined();
      expect(event.title).toBeDefined();
      expect(event.slug).toBeDefined();
      expect(event.category).toBeDefined();
      expect(event.eventDate).toBeDefined();
      expect(event.active).toBe(true);

      // Plus project
      expect(event.project).toBeDefined();
      expect(event.project!._id).toBeTruthy();
    });

    it("mixed list of events with and without projects is valid", () => {
      const events: Event[] = [
        createMockEvent({ _id: "e1", project: mockProject }),
        createMockEvent({ _id: "e2", project: null }),
        createMockEvent({ _id: "e3" }), // undefined project
      ];

      const withProject = events.filter((e) => e.project != null);
      const withoutProject = events.filter((e) => e.project == null);

      expect(withProject).toHaveLength(1);
      expect(withoutProject).toHaveLength(2);
    });
  });
});
