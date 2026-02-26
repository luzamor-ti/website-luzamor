import { PortableTextBlock } from "next-sanity";

export interface Faq {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  order?: number;
}
