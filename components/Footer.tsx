"use client";
import { Button, Grid, Heading, Link, Text, Ticker } from "@/components/ui";

import type { Footer } from "@/sanity/lib/types/footer";
import { Image as SanityImage } from "sanity";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface FooterProps extends Partial<Footer> {
  logo?: SanityImage;
}

export function Footer({
  logo,
  sejaApoiadorSubtitulo,
  sejaApoiadorTitulo,
  slogan,
  whatsapp,
}: FooterProps) {
  const logoUrl = buildSanityImageUrl(logo?.asset?._ref);

  const navigationLinks = [
    { name: "Início", href: "/" },
    { name: "Sobre nós", href: "/sobre-nos" },
    { name: "Cursos", href: "/cursos" },
    { name: "Calendário de Eventos", href: "/calendario-eventos" },
  ];

  const anotherLinks = [
    { name: "Projetos", href: "/projetos" },
    { name: "Sala de aula", href: "/salas-aula" },
    { name: "Auditório", href: "/auditorio" },
    { name: "Contato", href: "/contato" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "" },
    { name: "Instagram", href: "" },
  ].filter((link) => link.href);

  const contactLinks = [
    { name: "(44) 3346-2217", href: "tel:4433462217" },
    {
      name: "fundacaoluzamor@gmail.com",
      href: "mailto:fundacaoluzamor@gmail.com",
    },
    {
      name: "R. Néo Alves Martins, 1704",
      href: "https://www.google.com/maps/search/?api=1&query=R.+N%C3%A9o+Alves+Martins+1704+Maring%C3%A1+PR",
    },
    {
      name: "Maringá - PR",
      href: "https://www.google.com/maps/search/?api=1&query=Maring%C3%A1+PR",
    },
  ];

  return (
    <footer className="bg-black text-white py-6 mt-12">
      <Grid cols={3} gap="lg" className="max-w-6xl mx-auto">
        <div className="col-span-2 flex flex-col space-y-4 pl-5">
          <div className="flex items-center space-x-3">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt=""
                width={50}
                height={50}
                className="object-contain rounded-full"
              />
            )}
            <div className="flex flex-col leading-tight">
              <Text className="text-white font-semibold text-sm">Fundação</Text>
              <Text className="text-white font-semibold text-sm">Luzamor</Text>
            </div>
          </div>
          <div className="">
            <Text variant="small" className="text-white/70">
              {slogan}
            </Text>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Heading level={3} className="text-white">
            Seja um Apoiador
          </Heading>
          <Text variant="small" className="text-white/70">
            {sejaApoiadorSubtitulo}
          </Text>
          {whatsapp ? (
            <Button href={whatsapp} external variant="primary">
              {sejaApoiadorTitulo}
            </Button>
          ) : null}
        </div>
      </Grid>
      <Grid
        cols={4}
        gap="lg"
        className="max-w-6xl mx-auto border-b-1 border-white/20 py-8 mb-8"
      >
        <nav aria-label="Navegação" className="flex flex-col space-y-4">
          <Text variant="body" className="text-white font-semibold pl-5">
            Navegação
          </Text>
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white no-underline hover:text-white/70 hover:bg-white/10 rounded-full transition-all duration-500 hover:px-5 py-1 w-fit translate-x-0 hover:translate-x-1 transition-transform pl-5"
            >
              {link.name}
              <ArrowRight size={16} className="inline-block ml-1" />
            </Link>
          ))}
        </nav>

        <nav aria-label="Outros links" className="flex flex-col space-y-4">
          <Text variant="body" className="text-white font-semibold pl-5">
            Outros Links
          </Text>
          {anotherLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white no-underline hover:text-white/70 hover:bg-white/10 rounded-full transition-all duration-500 px-5 py-1 w-fit translate-x-0 hover:translate-x-1 transition-transform"
            >
              {link.name}
              <ArrowRight size={16} className="inline-block ml-1" />
            </Link>
          ))}
        </nav>

        <nav aria-label="Redes sociais" className="flex flex-col space-y-4">
          <Text variant="body" className="text-white font-semibold pl-5">
            Redes Sociais
          </Text>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white no-underline hover:text-white/70 hover:bg-white/10 rounded-full transition-all duration-500 px-5 py-1 w-fit translate-x-0 hover:translate-x-1 transition-transform"
            >
              {link.name}
              <ArrowRight size={16} className="inline-block ml-1" />
            </Link>
          ))}
        </nav>

        <div className="flex flex-col space-y-4">
          <Text variant="body" className="text-white font-semibold pl-5">
            Contato
          </Text>
          {contactLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white no-underline hover:text-white/70 hover:bg-white/10 rounded-full transition-all duration-500 px-5 py-1 w-fit translate-x-0 hover:translate-x-1 transition-transform"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Grid>
      <Text
        variant="small"
        className="text-left max-w-6xl mx-auto text-white/70 mb-5"
      >
        Fundação Luzamor. Todos os direitos reservados.
      </Text>

      <Ticker>
        <div className="flex items-center space-x-3 opacity-50">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt=""
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
