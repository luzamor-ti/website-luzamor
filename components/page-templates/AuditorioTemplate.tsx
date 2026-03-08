import { Page } from "@/sanity/lib/types/page";
import { getAuditorium } from "@/sanity/lib/services/auditoriumService";
import { AuditoriumContent } from "@/components/auditorium/AuditoriumContent";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";

interface AuditorioTemplateProps {
  pagina: Page;
}

export async function AuditorioTemplate({ pagina }: AuditorioTemplateProps) {
  const data = await getAuditorium();
  const globalConfiguration = await getGlobalConfiguration();
  return (
    <AuditoriumContent
      pagina={pagina}
      data={data}
      globalConfiguration={globalConfiguration}
    />
  );
}
