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
  teacherType: "membro" | "externo";
  enrollment: {
    active: boolean;
    messageText?: string;
    whatsapp?: string;
    buttonText?: string;
  };
  active: boolean;
  teacherMember?: Member;
  shortDescription?: string;
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
  classroom?: {
    slug: string;
    name: string;
  };
  order?: number;
}
