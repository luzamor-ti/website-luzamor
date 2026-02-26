import { getProjectsHome } from "./projectService";
import { getMembersHome } from "./memberService";
import { getFeaturedSupporters } from "./supporterService";
import { getFaqSummary } from "./faqService";
import { getContacts } from "./contactService";
import { getGlobalConfiguration } from "./configuracaoService";
import { getCourses } from "./courseService";
import { getUpcomingEvents } from "./eventService";

import { Project } from "../types/project";
import { Member } from "../types/member";
import { Supporter } from "../types/supporter";
import { Faq } from "../types/faq";
import { Contact } from "../types/contact";
import { GlobalConfiguration } from "../types/configuration";
import { Course } from "../types/course";
import { Event } from "../types/event";

export interface HomeData {
  projects: Project[];
  members: Member[];
  supporters: Supporter[];
  faq: Faq[];
  contacts: Contact[];
  configuration: GlobalConfiguration | null;
  courses: Course[];
  events: Event[];
}

export async function getHomeData(): Promise<HomeData> {
  const [
    projects,
    members,
    supporters,
    faq,
    contacts,
    configuration,
    courses,
    events,
  ] = await Promise.all([
    getProjectsHome(),
    getMembersHome(),
    getFeaturedSupporters(),
    getFaqSummary(),
    getContacts(),
    getGlobalConfiguration(),
    getCourses(),
    getUpcomingEvents(),
  ]);

  return {
    projects,
    members,
    supporters,
    faq,
    contacts,
    configuration,
    courses,
    events,
  };
}
