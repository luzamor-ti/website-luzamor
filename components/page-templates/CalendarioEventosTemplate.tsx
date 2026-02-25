import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";

interface CalendarioEventosTemplateProps {
  pagina: Pagina;
}

export function CalendarioEventosTemplate({
  pagina,
}: CalendarioEventosTemplateProps) {
  return (
    <main className="min-h-screen pt-24">
      <Section>
        <Heading level={1} className="text-center">
          {pagina.titulo}
        </Heading>
        {pagina.descricao && (
          <Text variant="large" className="text-center mt-4 max-w-3xl mx-auto">
            {pagina.descricao}
          </Text>
        )}

        {/* Timeline / Cronologia de eventos */}
        {pagina.secoes && pagina.secoes.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="space-y-8">
              {pagina.secoes.map((secao) => (
                <div
                  key={secao._key}
                  className="relative pl-8 border-l-2 border-primary"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  {secao.titulo && (
                    <Heading level={3} className="mb-2">
                      {secao.titulo}
                    </Heading>
                  )}
                  {secao.subtitulo && (
                    <Text variant="small" className="text-gray-600 mb-3">
                      {secao.subtitulo}
                    </Text>
                  )}
                  {secao.conteudo && (
                    <div className="prose">
                      <PortableText value={secao.conteudo} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
