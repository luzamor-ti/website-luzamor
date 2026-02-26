import { client } from "../client";
import { coursesQuery, courseBySlugQuery } from "../queries/course";
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
