import { client } from "../client";
import {
  coursesQuery,
  courseBySlugQuery,
  relatedcoursesQuery,
} from "../queries/course";
import { Course } from "../types/course";

export async function getCourses(): Promise<Course[]> {
  try {
    const courses = await client.fetch<Course[]>(coursesQuery);
    return courses || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const course = await client.fetch<Course>(courseBySlugQuery, { slug });
    return course || null;
  } catch (error) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    return null;
  }
}

export async function getRelatedCourses(
  id: string,
  limit?: number,
): Promise<Course[]> {
  try {
    const courses = await client.fetch<Course[]>(relatedcoursesQuery);
    console.log("Cursos obtidos para related courses:", courses); // Log para verificar os cursos obtidos
    const filteredCourses = courses.filter((course) => course._id !== id);
    console.log("Cursos relacionados filtrados:", filteredCourses); // Log para verificar os cursos relacionados após filtro
    return limit ? filteredCourses.slice(0, limit) : filteredCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}
