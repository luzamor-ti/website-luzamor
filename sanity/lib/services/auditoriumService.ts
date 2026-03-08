import { client } from "../client";
import { auditoriumQuery } from "../queries/auditorium";
import { Auditorium } from "../types/auditorium";

export async function getAuditorium(): Promise<Auditorium | null> {
  try {
    return await client.fetch<Auditorium>(auditoriumQuery);
  } catch (error) {
    console.error("Error fetching auditorium:", error);
    return null;
  }
}
