import { getHomeData } from "@/sanity/lib/services/homeService";
import { getHeroData } from "@/sanity/lib/services/heroService";
import { getHomeSectionsByNames } from "@/sanity/lib/services/homeSectionService";
import {
  HeroSection,
  ProjectsSection,
  SupportersSection,
  FaqSection,
  IntroSection,
  ImpactSection,
  InitiativesSection,
  HowToHelpSection,
  CoursesSection,
  EventsSection,
} from "@/components/home";

const SECTION_NAMES = [
  "intro",
  "projects",
  "supporters",
  "faq",
  "impact",
  "initiatives",
  "howToHelp",
  "courses",
  "events",
] as const;

export default async function Home() {
  const [homeData, hero, sections] = await Promise.all([
    getHomeData(),
    getHeroData(),
    getHomeSectionsByNames([...SECTION_NAMES]),
  ]);

  const { projects, supporters, faq, configuration, courses, events } =
    homeData;

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
    </main>
  );
}
