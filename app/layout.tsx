import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/sanity/client";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Fundação Luzamor",
    template: "%s | Fundação Luzamor",
  },
  description: "Site institucional da Fundação Luzamor.",
  metadataBase: new URL("https://luzamor.com"),
  openGraph: {
    title: "Fundação Luzamor",
    description: "Site institucional da Fundação Luzamor.",
    type: "website",
  },
};

async function getLayoutData() {
  const config = await client.fetch(`*[_type == "configuracaoGlobal"][0]`);
  const navbar = await client.fetch(`
    *[_type == "navbar"][0]{
      itens[]{
        tituloPersonalizado,
        slug
      },
      botaoPrincipal{
        titulo,
        slug
      }
    }
  `);

  const rodape = await client.fetch(`*[_type == "rodape"][0]`);

  return { config, navbar, rodape };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config, navbar } = await getLayoutData();
  const tema = config?.tema || {};

  return (
    <html lang="pt-BR">
      <body
        style={
          {
            "--color-primary": tema.corPrimaria,
            "--color-secondary": tema.corSecundaria,
            "--color-accent": tema.corDestaque,
            "--color-bg": tema.corFundo,
            "--color-text": tema.corTexto,
          } as React.CSSProperties
        }
      >
        <Navbar
          itens={navbar?.itens ?? []}
          logo={config?.logo}
          botaoPrincipal={navbar?.botaoPrincipal}
        />
        {children}
      </body>
    </html>
  );
}
