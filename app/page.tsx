import { getHomeData } from "@/sanity/lib/services/homeService";
import { getHeroData } from "@/sanity/lib/services/heroService";
import { getHomeSectionsByNames } from "@/sanity/lib/services/homeSectionService";
import {
  HeroSection,
  ProjectsSection,
  SupportersSection,
  FaqSection,
  ContactSection,
  IntroSection,
  ImpactSection,
  InitiativesSection,
  HowToHelpSection,
  CoursesSection,
  EventsSection,
} from "@/components/home";

export default async function Home() {
  const {
    projects,
    supporters,
    faq,
    contacts,
    configuration,
    courses,
    events,
  } = await getHomeData();
  const hero = await getHeroData();

  // Busca todas as seções do CMS
  const sections = await getHomeSectionsByNames([
    "intro",
    "projects",
    "supporters",
    "faq",
    "contact",
    "impact",
    "initiatives",
    "howToHelp",
    "courses",
    "events",
  ]);

  return (
    <main>
      <HeroSection data={hero} />
      <IntroSection data={sections.intro} />
      <SupportersSection data={supporters} section={sections.supporters} />
      <ImpactSection data={sections.impact} />
      <InitiativesSection data={sections.initiatives} />
      <ProjectsSection data={projects} section={sections.projects} />
      <CoursesSection
        data={courses}
        section={sections.courses}
        config={configuration}
      />
      <HowToHelpSection data={sections.howToHelp} />
      <EventsSection data={events} section={sections.events} />
      <FaqSection data={faq} section={sections.faq} />
      <ContactSection data={contacts} section={sections.contact} />
    </main>
  );
}
