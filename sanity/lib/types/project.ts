import { Image as SanityImage } from "sanity";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  coverImage?: SanityImage;
  image?: SanityImage; // Alias for compatibility
  goalAmount?: number;
  raisedAmount?: number;
  targetAmount?: number; // Alias for compatibility
  category?: string;
  featured?: boolean;
  active: boolean;
}
