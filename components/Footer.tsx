"use client";
import { Card, Grid, Heading, Link, Text, Ticker } from "@/components/ui";
import { getFooter } from "@/sanity/lib/services/footerService";
import { useEffect, useState } from "react";
import type { Footer } from "@/sanity/lib/types/footer";
import build from "next/dist/build";
import { Image as SanityImage } from "sanity";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import Image from "next/image";

interface FooterProps extends Partial<Footer> {
  logo?: SanityImage;
}

export function Footer({
  logo,
  email,
  sejaApoiadorSubtitulo,
  sejaApoiadorTitulo,
  slogan,
  whatsapp,
}: FooterProps) {
  const logoUrl = buildSanityImageUrl(logo?.asset?._ref);

  const navigationLinks = [
    { name: "Início", href: "/" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Projetos", href: "/projetos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Contato", href: "/contato" },
  ];

  const anotherLinks = [
    { name: "Início", href: "/" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Projetos", href: "/projetos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Contato", href: "/contato" },
  ];

  const socialLinks = [
    { name: "Início", href: "/" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Projetos", href: "/projetos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Contato", href: "/contato" },
  ];

  const contactLinks = [
    { name: "Início", href: "/" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Projetos", href: "/projetos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <footer className="bg-black text-white py-6 mt-12">
      <Grid cols={3} gap="lg" className="max-w-6xl mx-auto">
        <div className="col-span-2">
          <div className="flex items-center space-x-3">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                width={50}
                height={50}
                className="object-contain rounded-full"
              />
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-white font-semibold text-sm">Fundação</span>
              <span className="text-white font-semibold text-sm">Luzamor</span>
            </div>
          </div>
        </div>
        <div></div>
      </Grid>
      <Grid
        cols={4}
        gap="lg"
        className="max-w-6xl mx-auto border-b-1 border-white/20 py-8 mb-8"
      >
        {navigationLinks.map((link) => (
          <Link key={link.name} href={link.href} className="">
            {link.name}
          </Link>
        ))}
        {anotherLinks.map((link) => (
          <Link key={link.name} href={link.href} className="">
            {link.name}
          </Link>
        ))}
        {socialLinks.map((link) => (
          <Link key={link.name} href={link.href} className="">
            {link.name}
          </Link>
        ))}
        {contactLinks.map((link) => (
          <Link key={link.name} href={link.href} className="">
            {link.name}
          </Link>
        ))}
      </Grid>

      <Ticker>
        <div className="flex items-center space-x-3">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo"
              width={34}
              height={34}
              className="object-contain rounded-full"
            />
          )}
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm">Fundação</span>
            <span className="text-white font-semibold text-sm">Luzamor</span>
          </div>
        </div>
      </Ticker>
    </footer>
  );
}
