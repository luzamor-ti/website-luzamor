import { client } from "../client";
import {
  eventsQuery,
  upcomingEventsQuery,
  featuredEventsQuery,
  eventBySlugQuery,
  allUpcomingEventsQuery,
  allPastEventsQuery,
  eventsByProjectQuery,
} from "../queries/event";
import { Event } from "../types/event";

export async function getEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(eventsQuery);
    return events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(upcomingEventsQuery);
    return events || [];
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(featuredEventsQuery);
    return events || [];
  } catch (error) {
    console.error("Error fetching featured events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const event = await client.fetch<Event>(eventBySlugQuery, { slug });
    return event || null;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
  }
}

export async function getAllUpcomingEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(allUpcomingEventsQuery);
    return events || [];
  } catch (error) {
    console.error("Error fetching all upcoming events:", error);
    return [];
  }
}

export async function getAllPastEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(allPastEventsQuery);
    return events || [];
  } catch (error) {
    console.error("Error fetching all past events:", error);
    return [];
  }
}

export async function getEventsCalendarData() {
  try {
    const [upcomingEvents, pastEvents] = await Promise.all([
      getAllUpcomingEvents(),
      getAllPastEvents(),
    ]);

    return {
      upcomingEvents,
      pastEvents,
    };
  } catch (error) {
    console.error("Error fetching events calendar data:", error);
    return {
      upcomingEvents: [],
      pastEvents: [],
    };
  }
}

export async function getEventsByProject(projectId: string): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(eventsByProjectQuery, {
      projectId,
    });
    return events || [];
  } catch (error) {
    console.error(`Error fetching events for project ${projectId}:`, error);
    return [];
  }
}
