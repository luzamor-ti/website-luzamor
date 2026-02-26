import { Page } from "@/sanity/lib/types/page";
import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";

interface ProjetosTemplateProps {
  pagina: Page;
}

export function ProjetosTemplate({ pagina }: ProjetosTemplateProps) {
  return (
    <main className="min-h-screen pt-24">
      <Section>
        <Heading level={1} className="text-center">
          {pagina.title}
        </Heading>

        {pagina.description && (
          <Text variant="large" className="text-center mt-4 max-w-3xl mx-auto">
            {pagina.description}
          </Text>
        )}

        {pagina.content && (
          <div className="mt-8 prose prose-lg max-w-4xl mx-auto">
            <PortableText value={pagina.content} />
          </div>
        )}

        {pagina.sections && pagina.sections.length > 0 && (
          <div className="mt-16">
            {pagina.sections.map((secao) => (
              <div key={secao._key} className="mb-16">
                {secao.title && (
                  <Heading level={2} className="mb-4">
                    {secao.title}
                  </Heading>
                )}
                {secao.subtitle && (
                  <Text variant="large" className="mb-6">
                    {secao.subtitle}
                  </Text>
                )}
                {secao.content && (
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={secao.content} />
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
