import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface PalabraPresidenteTemplateProps {
  pagina: Pagina;
}

export function PalabraPresidenteTemplate({
  pagina,
}: PalabraPresidenteTemplateProps) {
  return (
    <main className="min-h-screen pt-24">
      <Section>
        <Heading level={1} className="text-center">
          {pagina.titulo}
        </Heading>
        {pagina.imagemDestaque?.asset?.url && (
          <div className="mt-8 max-w-md mx-auto">
            <Image
              src={pagina.imagemDestaque.asset.url}
              alt={pagina.imagemDestaque.alt || pagina.titulo}
              width={600}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
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
