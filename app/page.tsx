import { getHomeData } from "@/sanity/lib/services/homeService";
import {
  HeroSection,
  ProjetosSection,
  MembrosSection,
  ApoiadoresSection,
  FaqSection,
  ContatoSection,
} from "@/components/home";

export default async function Home() {
  const { projetos, membros, apoiadores, faq, contatos, configuracao } =
    await getHomeData();

  return (
    <main>
      {/* HERO */}
      <HeroSection data={configuracao} />

      {/* PROJETOS */}
      <ProjetosSection data={projetos} />

      {/* MEMBROS */}
      <MembrosSection data={membros} />

      {/* APOIADORES */}
      <ApoiadoresSection data={apoiadores} />

      {/* FAQ */}
      <FaqSection data={faq} />

      {/* CONTATO */}
      <ContatoSection data={contatos} />
    </main>
  );
}
