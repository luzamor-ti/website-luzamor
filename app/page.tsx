import dynamic from "next/dynamic";
import { getHomeData } from "@/sanity/lib/services/homeService";
import { getHeroData } from "@/sanity/lib/services/heroService";
import { getHomeSectionsByNames } from "@/sanity/lib/services/homeSectionService";
import {
  HeroSection,
  ProjectsSection,
  SupportersSection,
  IntroSection,
  ImpactSection,
  InitiativesSection,
} from "@/components/home";

const LazyCoursesSection = dynamic(
  () => import("@/components/home/CoursesSection").then((mod) => mod.CoursesSection),
  {
    loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
  },
);

const LazyHowToHelpSection = dynamic(
  () => import("@/components/home/HowToHelpSection"),
  {
    loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
  },
);

const LazyEventsSection = dynamic(
  () => import("@/components/home/EventsSection").then((mod) => mod.EventsSection),
  {
    loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
  },
);

const LazyFaqSection = dynamic(
  () => import("@/components/home/FaqSection").then((mod) => mod.FaqSection),
  {
    loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
  },
);

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
      <LazyCoursesSection
        data={courses}
        section={sections.courses}
        config={configuration}
      />
      <LazyHowToHelpSection data={sections.howToHelp} />
      <LazyEventsSection data={events} section={sections.events} />
      <LazyFaqSection data={faq} section={sections.faq} />
    </main>
  );
}
