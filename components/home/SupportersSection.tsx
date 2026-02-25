"use client";

import Image from "next/image";
import { Apoiador } from "@/sanity/lib/types/apoiador";
import { Section, SectionHeader, Ticker } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";

interface SupportersSectionProps {
  data: Apoiador[];
}

export function SupportersSection({ data }: SupportersSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <SectionHeader
        tag="Nossos parceiros"
        title="Quem nos apoia"
        align="center"
      />
      <Ticker speed="normal" pauseOnHover={true}>
        {data.map((supporter) => {
          const logoUrl = supporter.logo?.asset?._ref
            ? buildSanityImageUrl(supporter.logo.asset._ref)
            : null;

          return (
            <div
              key={supporter._id}
              className="flex items-center justify-center min-w-[200px] h-24 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {logoUrl ? (
                <a
                  href={supporter.site || "#"}
                  target={supporter.site ? "_blank" : undefined}
                  rel={supporter.site ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Image
                    src={logoUrl}
                    alt={supporter.nome}
                    width={160}
                    height={80}
                    className="object-contain max-h-20"
                  />
                </a>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="font-semibold text-gray-700">
                    {supporter.nome}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </Ticker>
    </Section>
  );
}
