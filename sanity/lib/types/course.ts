import { PortableTextBlock } from "next-sanity";
import { Image as SanityImage } from "sanity";
import { Member } from "./member";

export interface CourseTeacher {
  type: "membro" | "externo";
  memberData?: Member;
  externalData?: {
    name: string;
    photo?: SanityImage;
  };
}

export interface CoursePricingTier {
  tier: "individual" | "group" | "free_individual" | "free_group";
  value: number;
  description: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  coverPhoto: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  description: PortableTextBlock[];
  schedule: string;
  enrollment: {
    active: boolean;
    messageText?: string;
    whatsapp?: string;
    buttonText?: string;
  };
  active: boolean;
  shortDescription?: string;
  teachers: CourseTeacher[];
  pricing: CoursePricingTier[];
  minAge?: number;
  classroom?: {
    slug: string;
    name: string;
  };
  order?: number;

  // Deprecated fields (kept for backward compatibility during migration)
  teacherType?: "membro" | "externo";
  teacherMember?: Member;
  price?: number;
  externalTeacher?: {
    name: string;
    photo?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
      alt?: string;
    };
  };
}
