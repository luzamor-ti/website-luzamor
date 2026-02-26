import { Image as SanityImage } from "sanity";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  image?: SanityImage;
  goalAmount?: number;
  targetAmount?: number; // Alias for compatibility
  active: boolean;
}
