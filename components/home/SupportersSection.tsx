"use client";

import Image from "next/image";
import { Supporter } from "@/sanity/lib/types/supporter";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, Ticker } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";

interface SupportersSectionProps {
  data: Supporter[];
  section: HomeSection | null;
}

export function SupportersSection({ data, section }: SupportersSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.supporters;

  return (
    <Section className="bg-white">
      <SectionHeader
        tag={section?.tag || fallback.tag}
        title={section?.title || fallback.title}
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
                  href={supporter.website || "#"}
                  target={supporter.website ? "_blank" : undefined}
                  rel={supporter.website ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Image
                    src={logoUrl}
                    alt={supporter.name}
                    width={160}
                    height={80}
                    className="object-contain max-h-20"
                  />
                </a>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="font-semibold text-gray-700">
                    {supporter.name}
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
