// Sanity clients and utilities
export { client } from "./sanity/client";
export { urlFor } from "./sanity/image";

// Services
export {
  getProjectBySlug,
  getProjectsHome,
  getProjectsPage,
} from "./services/projectService";
export {
  getMembersHome,
  getMembersPage,
  getWordsOfPresident,
} from "./services/memberService";
export { getFeaturedSupporters } from "./services/supporterService";
export { getContact, getContacts } from "./services/contactService";
export { getFaqSummary, getFaqs } from "./services/faqService";
export { getHeroData } from "./services/heroService";
export { getNavbar } from "./services/navbarService";
export {
  getAllHomeSections,
  getHomeSection,
  getHomeSectionsByNames,
} from "./services/homeSectionService";

// Types
export type { Project } from "./types/project";
export type { Member } from "./types/member";
export type { Supporter } from "./types/supporter";
export type { Page } from "./types/page";
export type { Work } from "./types/work";
export type { Contact } from "./types/contact";
export type { Faq } from "./types/faq";
