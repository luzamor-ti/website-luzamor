import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading, Text, Grid, Card } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface CursosTemplateProps {
  pagina: Pagina;
}

export function CursosTemplate({ pagina }: CursosTemplateProps) {
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

        {/* Grid de cursos */}
        {pagina.secoes && pagina.secoes.length > 0 && (
          <Grid cols={2} gap="lg" className="mt-12">
            {pagina.secoes.map((secao) => (
              <Card key={secao._key} padding="lg">
                {secao.imagem?.asset?.url && (
                  <Image
                    src={secao.imagem.asset.url}
                    alt={secao.titulo || "Curso"}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
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
                  <div className="prose prose-sm">
                    <PortableText value={secao.conteudo} />
                  </div>
                )}
              </Card>
            ))}
          </Grid>
        )}
      </Section>
    </main>
  );
}
