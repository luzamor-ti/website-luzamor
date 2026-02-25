import { getHomeData } from "@/sanity/lib/services/homeService";
import { getHeroData } from "@/sanity/lib/services/heroService";
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
  const { projetos, membros, apoiadores, faq, contatos } = await getHomeData();
  const hero = await getHeroData();

  return (
    <main>
      <HeroSection data={hero} />
      <IntroSection />
      <SupportersSection data={apoiadores} />
      <ImpactSection />
      <InitiativesSection />
      <ProjectsSection data={projetos} />
      <HowToHelpSection />
      <FaqSection data={faq} />
      <MembersSection data={membros} />
      <ContactSection data={contatos} />
    </main>
  );
}
