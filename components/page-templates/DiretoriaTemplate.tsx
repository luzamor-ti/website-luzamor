import { getBoardMembers } from "@/sanity/lib/services/memberService";
import { Page } from "@/sanity/lib/types/page";
import { Section, SectionHeader } from "@/components/ui";
import { BoardSection } from "@/components/board/BoardSection";
import { DIRETORIA_PAGE_FALLBACKS } from "@/constants/textFallbacks";

interface DiretoriaTemplateProps {
  pagina: Page;
}

export async function DiretoriaTemplate({ pagina }: DiretoriaTemplateProps) {
  const members = await getBoardMembers();

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <Section className="relative bg-[#0a0a0a] pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://framerusercontent.com/images/al6LHhZeQCUgkaAutT71lCt7G5w.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/80" />
        <div className="relative z-10 max-w-5xl">
          <SectionHeader
            tag={DIRETORIA_PAGE_FALLBACKS.hero.tag}
            title={pagina.title || DIRETORIA_PAGE_FALLBACKS.hero.title}
            description={
              pagina.description || DIRETORIA_PAGE_FALLBACKS.hero.description
            }
            variant="dark"
            align="left"
          />
        </div>
      </Section>

      {/* LISTAGEM DA DIRETORIA */}
      <BoardSection members={members} />
    </main>
  );
}
