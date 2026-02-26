import { Image as SanityImage } from "sanity";

export interface Supporter {
  _id: string;
  name: string;
  logo?: SanityImage;
  site?: string;
  featured?: boolean;
}
