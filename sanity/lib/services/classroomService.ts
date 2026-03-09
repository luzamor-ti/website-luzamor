import { client } from "../client";
import { classroomsQuery } from "../queries/classroom";
import { Classroom } from "../types/classroom";

export async function getClassrooms(): Promise<Classroom[]> {
  try {
    const classrooms = await client.fetch<Classroom[]>(classroomsQuery);
    return classrooms || [];
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return [];
  }
}
