import {
  AboutHeroSection,
  AboutImpactsSection,
  OurHistorySection,
  ContentImageSection,
  OurTeamSection,
} from "@/components/about";
import { SupportersSection } from "@/components/home/SupportersSection";
import { ABOUT_PAGE_FALLBACKS } from "@/constants/textFallbacks";
import { getAboutPageData } from "@/sanity/lib/services/aboutService";

export async function SobreNosTemplate() {
  const { aboutPage, supporters, members } = await getAboutPageData();
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <AboutHeroSection data={aboutPage?.hero || null} />

      {/* Impactos */}
      <AboutImpactsSection data={aboutPage?.impactos || null} />

      {/* Nossa História (Timeline) */}
      <OurHistorySection data={aboutPage?.nossaHistoria || null} />

      {/* Nossos Apoiadores */}
      <SupportersSection data={supporters} section={null} />

      {/* Nossa Missão */}
      <ContentImageSection
        data={aboutPage?.nossaMissao || null}
        fallback={ABOUT_PAGE_FALLBACKS.mission}
        imagePosition="right"
        backgroundColor="light"
      />

      {/* Nossa Visão */}
      <ContentImageSection
        data={aboutPage?.nossaVisao || null}
        fallback={ABOUT_PAGE_FALLBACKS.vision}
        imagePosition="left"
        backgroundColor="light"
      />

      {/* Nosso Time */}
      <OurTeamSection data={aboutPage?.nossoTime || null} members={members} />
    </main>
  );
}
