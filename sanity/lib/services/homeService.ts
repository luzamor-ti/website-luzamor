import { getProjectsHome } from "./projectService";
import { getMembersHome } from "./memberService";
import { getFeaturedSupporters } from "./supporterService";
import { getFaqSummary } from "./faqService";
import { getContacts } from "./contactService";
import { getGlobalConfiguration } from "./configuracaoService";

import { Project } from "../types/project";
import { Member } from "../types/member";
import { Supporter } from "../types/supporter";
import { Faq } from "../types/faq";
import { Contact } from "../types/contact";
import { GlobalConfiguration } from "../types/configuration";

export interface HomeData {
  projects: Project[];
  members: Member[];
  supporters: Supporter[];
  faq: Faq[];
  contacts: Contact[];
  configuration: GlobalConfiguration | null;
}

export async function getHomeData(): Promise<HomeData> {
  const [projects, members, supporters, faq, contacts, configuration] =
    await Promise.all([
      getProjectsHome(),
      getMembersHome(),
      getFeaturedSupporters(),
      getFaqSummary(),
      getContacts(),
      getGlobalConfiguration(),
    ]);

  return {
    projects,
    members,
    supporters,
    faq,
    contacts,
    configuration,
  };
}
