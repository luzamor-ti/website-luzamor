"use client";

import Image from "next/image";
import { Supporter } from "@/sanity/lib/types/supporter";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, Ticker, SectionHeader, LinkButton } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface SupportersSectionProps {
  data: Supporter[];
  section: HomeSection | null;
}

export function SupportersSection({ data, section }: SupportersSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.supporters;
  const linkText =
    section?.linkText || fallback.linkText || "Ver todos os apoiadores";
  const linkUrl = section?.linkUrl || "/apoiadores";

  return (
    <Section>
      <motion.div
        className="space-y-12"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader
          tag={section?.tag || fallback.tag}
          description={section?.description}
          align="left"
          variant="light"
        />

        {/* Ticker de logos */}
        <motion.div variants={staggerItemVariants}>
          <Ticker speed="normal" pauseOnHover={true}>
            {data.map((supporter) => {
              const logoUrl = supporter.logo?.asset?._ref
                ? buildSanityImageUrl(supporter.logo.asset._ref)
                : null;

              return (
                <div
                  key={supporter._id}
                  className="flex items-center justify-center min-w-[200px] h-24 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
                >
                  {logoUrl ? (
                    <a
                      href={supporter.site || "#"}
                      target={supporter.site ? "_blank" : undefined}
                      rel={supporter.site ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-center w-full h-full"
                      aria-label={`Visite o site de ${supporter.name}`}
                    >
                      <Image
                        src={logoUrl}
                        alt={`Logo de ${supporter.name}`}
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
        </motion.div>

        {/* Link "Ver todos os apoiadores" com hover effect */}
        <motion.div
          className="flex justify-center"
          variants={staggerItemVariants}
        >
          <LinkButton href={linkUrl} className="flex-shrink-0">
            {linkText}
          </LinkButton>
        </motion.div>
      </motion.div>
    </Section>
  );
}
