import { Page } from "@/sanity/lib/types/page";
import { Section, Heading } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";

interface PalabraPresidenteTemplateProps {
  pagina: Page;
}

export function PalabraPresidenteTemplate({
  pagina,
}: PalabraPresidenteTemplateProps) {
  const featuredImageUrl = pagina.featuredImage?.asset?._ref
    ? buildSanityImageUrl(pagina.featuredImage.asset._ref)
    : "";

  return (
    <main className="min-h-screen pt-24">
      <Section>
        <Heading level={1} className="text-center">
          {pagina.title}
        </Heading>
        {featuredImageUrl && (
          <div className="mt-8 max-w-md mx-auto">
            <Image
              src={featuredImageUrl}
              alt={pagina.title}
              width={600}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
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
