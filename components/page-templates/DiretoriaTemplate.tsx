"use client";

import { Page } from "@/sanity/lib/types/page";
import { Section, Heading, Text, Grid, Card } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import { useState } from "react";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";

interface DiretoriaTemplateProps {
  pagina: Page;
}

export function DiretoriaTemplate({ pagina }: DiretoriaTemplateProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

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

        {/* Grid de fotos clicáveis - similar ao patrocinadores */}
        {pagina.sections && pagina.sections.length > 0 && (
          <Grid cols={3} gap="lg" className="mt-12">
            {pagina.sections.map((secao, index) => {
              const imageUrl = secao.image?.asset?._ref
                ? buildSanityImageUrl(secao.image.asset._ref)
                : "";

              return (
                <div
                  key={secao._key}
                  className="cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() =>
                    setSelectedItem(selectedItem === index ? null : index)
                  }
                >
                  <Card padding="md">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={secao.title || "Membro da diretoria"}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <Heading level={3}>{secao.title}</Heading>
                    {secao.subtitle && (
                      <Text variant="small" className="text-gray-600 mt-1">
                        {secao.subtitle}
                      </Text>
                    )}

                    {/* Conteúdo expandido ao clicar */}
                    {selectedItem === index && secao.content && (
                      <div className="mt-4 pt-4 border-t prose prose-sm">
                        <PortableText value={secao.content} />
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </Grid>
        )}
      </Section>
    </main>
  );
}
