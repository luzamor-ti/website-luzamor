import { PortableTextBlock } from "next-sanity";
import { Member } from "./member";

export interface Course {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
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
  enrollment: {
    active: boolean;
    messageText?: string;
    whatsapp?: string;
    buttonText?: string;
  };
  active: boolean;
  order?: number;
}
