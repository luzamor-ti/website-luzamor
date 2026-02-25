"use client";

import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading, Text, Grid, Card } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import { useState } from "react";
import Image from "next/image";

interface DiretoriaTemplateProps {
  pagina: Pagina;
}

export function DiretoriaTemplate({ pagina }: DiretoriaTemplateProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

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

        {/* Grid de fotos clicáveis - similar ao patrocinadores */}
        {pagina.secoes && pagina.secoes.length > 0 && (
          <Grid cols={3} gap="lg" className="mt-12">
            {pagina.secoes.map((secao, index) => (
              <div
                key={secao._key}
                className="cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() =>
                  setSelectedItem(selectedItem === index ? null : index)
                }
              >
                <Card padding="md">
                  {secao.imagem?.asset?.url && (
                    <Image
                      src={secao.imagem.asset.url}
                      alt={secao.titulo || "Membro da diretoria"}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <Heading level={3}>{secao.titulo}</Heading>
                  {secao.subtitulo && (
                    <Text variant="small" className="text-gray-600 mt-1">
                      {secao.subtitulo}
                    </Text>
                  )}

                  {/* Conteúdo expandido ao clicar */}
                  {selectedItem === index && secao.conteudo && (
                    <div className="mt-4 pt-4 border-t prose prose-sm">
                      <PortableText value={secao.conteudo} />
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </Grid>
        )}
      </Section>
    </main>
  );
}
