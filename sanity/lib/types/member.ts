import { Image as SanityImage } from "sanity";

export interface Member {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImage;
  shortBio?: string;
  fullBio?: string;
}
