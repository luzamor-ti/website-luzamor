import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";

interface ProjetosTemplateProps {
  pagina: Pagina;
}

export function ProjetosTemplate({ pagina }: ProjetosTemplateProps) {
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

        {pagina.conteudo && (
          <div className="mt-8 prose prose-lg max-w-4xl mx-auto">
            <PortableText value={pagina.conteudo} />
          </div>
        )}

        {pagina.secoes && pagina.secoes.length > 0 && (
          <div className="mt-16">
            {pagina.secoes.map((secao) => (
              <div key={secao._key} className="mb-16">
                {secao.titulo && (
                  <Heading level={2} className="mb-4">
                    {secao.titulo}
                  </Heading>
                )}
                {secao.subtitulo && (
                  <Text variant="large" className="mb-6">
                    {secao.subtitulo}
                  </Text>
                )}
                {secao.conteudo && (
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={secao.conteudo} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
