import { PortableTextBlock } from "next-sanity";
import { Member } from "./member";

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
  requireScheduling?: boolean;
  shortDescription?: string;
  minAge?: number;
  monthlyOptions?: {
    title: string;
    free: boolean;
    price?: number;
    details?: string;
  }[];
  teachers?: {
    teacherType: "membro" | "externo";
    teacherMember?: Member;
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
  }[];
  classroom?: {
    slug: string;
    name: string;
  };
  order?: number;
}
