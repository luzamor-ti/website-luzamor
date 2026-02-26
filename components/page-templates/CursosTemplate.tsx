import { Page } from "@/sanity/lib/types/page";
import { Section, Heading, Text, Grid, Card } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";

interface CursosTemplateProps {
  pagina: Page;
}

export function CursosTemplate({ pagina }: CursosTemplateProps) {
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

        {/* Grid de cursos */}
        {pagina.sections && pagina.sections.length > 0 && (
          <Grid cols={2} gap="lg" className="mt-12">
            {pagina.sections.map((secao) => {
              const imageUrl = secao.image?.asset?._ref
                ? buildSanityImageUrl(secao.image.asset._ref)
                : "";

              return (
                <Card key={secao._key} padding="lg">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={secao.title || "Curso"}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  {secao.title && (
                    <Heading level={3} className="mb-2">
                      {secao.title}
                    </Heading>
                  )}
                  {secao.subtitle && (
                    <Text variant="small" className="text-gray-600 mb-3">
                      {secao.subtitle}
                    </Text>
                  )}
                  {secao.content && (
                    <div className="prose prose-sm">
                      <PortableText value={secao.content} />
                    </div>
                  )}
                </Card>
              );
            })}
          </Grid>
        )}
      </Section>
    </main>
  );
}
