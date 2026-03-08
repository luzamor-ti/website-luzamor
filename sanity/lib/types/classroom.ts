import { PortableTextBlock } from "next-sanity";

export interface ClassroomGalleryImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface Classroom {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  description: PortableTextBlock[];
  gallery?: ClassroomGalleryImage[];
  capacity?: number;
  resources?: string[];
  active: boolean;
  order?: number;
}
