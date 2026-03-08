"use client";

import Image from "next/image";
import { Event } from "@/sanity/lib/types/event";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { urlFor } from "@/sanity/lib/image";
import { Section } from "../ui";

interface EventOrganizationsProps {
  event: Event;
}
type OrgItemProps = {
  titulo: string;
  imagem?: { asset: { _ref: string; _type: "reference" }; alt?: string } | null;
  site?: string;
  label: string;
  showText: boolean;
};

function OrgItem({ titulo, imagem, site, label, showText }: OrgItemProps) {
  const logoUrl = imagem
    ? urlFor(imagem as Parameters<typeof urlFor>[0])
        .width(showText ? 160 : 240)
        .fit("max")
        .url()
    : null;

  // Apenas imagem (Incentivado Por)
  if (!showText && logoUrl) {
    const imageContent = (
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {label}
        </span>
        <div className="relative h-16 w-auto max-w-[240px]">
          <Image
            src={logoUrl}
            alt={titulo}
            width={240}
            height={64}
            className="object-contain h-16 w-auto"
          />
        </div>
      </div>
    );

    if (site) {
      return (
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visitar site: ${titulo}`}
          className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        >
          {imageContent}
        </a>
      );
    }

    return imageContent;
  }

  // Imagem + texto (Realização)
  const content = (
    <div className="flex items-center gap-3">
      {logoUrl && (
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image
            src={logoUrl}
            alt={titulo}
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {label}
        </span>
        <span className="text-sm font-semibold text-gray-800">{titulo}</span>
      </div>
    </div>
  );

  if (site) {
    return (
      <a
        href={site}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visitar site: ${titulo}`}
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

export function EventOrganizations({ event }: EventOrganizationsProps) {
  const realizacao = event.project?.realizacao;
  const incentivadoPor = event.project?.incentivadoPor;

  if (
    !realizacao?.titulo &&
    !realizacao?.imagem &&
    !incentivadoPor?.titulo &&
    !incentivadoPor?.imagem
  ) {
    return null;
  }

  return (
    <Section className="!pt-0 border-t border-gray-300 max-w-[1440px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="flex flex-wrap gap-8 items-center justify-center mt-32"
      >
        {realizacao?.titulo && (
          <OrgItem
            titulo={realizacao.titulo}
            imagem={realizacao.imagem}
            site={realizacao.site}
            label="Realização"
            showText={true}
          />
        )}
        {incentivadoPor?.titulo && (
          <OrgItem
            titulo={incentivadoPor.titulo}
            imagem={incentivadoPor.imagem}
            site={incentivadoPor.site}
            label="Incentivado Por"
            showText={false}
          />
        )}
      </motion.div>
    </Section>
  );
}
