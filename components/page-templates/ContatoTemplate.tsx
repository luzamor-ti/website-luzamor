import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";

interface ContatoTemplateProps {
  pagina: Pagina;
}

export function ContatoTemplate({ pagina }: ContatoTemplateProps) {
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
      </Section>
    </main>
  );
}
