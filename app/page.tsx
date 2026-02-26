import { getHomeData } from "@/sanity/lib/services/homeService";
import { getHeroData } from "@/sanity/lib/services/heroService";
import { getHomeSectionsByNames } from "@/sanity/lib/services/homeSectionService";
import {
  HeroSection,
  ProjectsSection,
  MembersSection,
  SupportersSection,
  FaqSection,
  ContactSection,
  IntroSection,
  ImpactSection,
  InitiativesSection,
  HowToHelpSection,
} from "@/components/home";

export default async function Home() {
  const { projects, members, supporters, faq, contacts } = await getHomeData();
  const hero = await getHeroData();

  // Busca todas as seções do CMS
  const sections = await getHomeSectionsByNames([
    "intro",
    "projects",
    "members",
    "supporters",
    "faq",
    "contact",
    "impact",
    "initiatives",
    "howToHelp",
  ]);

  return (
    <main>
      <HeroSection data={hero} />
      <IntroSection data={sections.intro} />
      <SupportersSection data={supporters} section={sections.supporters} />
      <ImpactSection data={sections.impact} />
      <InitiativesSection data={sections.initiatives} />
      <ProjectsSection data={projects} section={sections.projects} />
      <HowToHelpSection data={sections.howToHelp} />
      <FaqSection data={faq} section={sections.faq} />
      <MembersSection data={members} section={sections.members} />
      <ContactSection data={contacts} section={sections.contact} />
    </main>
  );
}
