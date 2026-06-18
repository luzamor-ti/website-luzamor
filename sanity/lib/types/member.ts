import type { PortableTextBlock } from "next-sanity";
import type { Image as SanityImage } from "sanity";

export interface Member {
  _id: string;
  name: string;
  role: string;
  roleType?: string;
  isDiretoria?: boolean;
  alt?: string;
  photo?: SanityImage;
  shortBio?: string;
  fullBio?: PortableTextBlock[];
  words?: PortableTextBlock[];
  order?: number;
}
