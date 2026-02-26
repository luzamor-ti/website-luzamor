import { client } from "../client";
import {
  eventsQuery,
  upcomingEventsQuery,
  featuredEventsQuery,
  eventBySlugQuery,
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
