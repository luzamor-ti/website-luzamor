import { Page } from "@/sanity/lib/types/page";
import { getAuditorium } from "@/sanity/lib/services/auditoriumService";
import { AuditoriumContent } from "@/components/auditorium";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";

interface AuditorioTemplateProps {
  pagina: Page;
}

export async function AuditorioTemplate({ pagina }: AuditorioTemplateProps) {
  const [data, globalConfiguration] = await Promise.all([
    getAuditorium(),
    getGlobalConfiguration(),
  ]);
  return (
    <AuditoriumContent
      pagina={pagina}
      data={data}
      globalConfiguration={globalConfiguration}
    />
  );
}
