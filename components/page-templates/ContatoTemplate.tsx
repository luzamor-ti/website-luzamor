import { Page } from "@/sanity/lib/types/page";
import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";

interface ContatoTemplateProps {
  pagina: Page;
}

export function ContatoTemplate({ pagina }: ContatoTemplateProps) {
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
      </Section>
    </main>
  );
}
