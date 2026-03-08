import { getWordsOfPresident } from "@/sanity/lib/services/memberService";
import { Page } from "@/sanity/lib/types/page";
import { PresidentPageContent } from "@/components/president/PresidentPageContent";

interface PalavraPresidenteTemplateProps {
  pagina: Page;
}

export async function PalavraPresidenteTemplate({
  pagina,
}: PalavraPresidenteTemplateProps) {
  const presidentData = await getWordsOfPresident();

  if (!presidentData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Conteúdo indisponível no momento.</p>
      </main>
    );
  }

  return <PresidentPageContent pagina={pagina} presidentData={presidentData} />;
}
