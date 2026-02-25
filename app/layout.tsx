import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/sanity/client";
import { getNavbar } from "@/sanity/lib/services/navbarService";
import { getConfiguracaoGlobal } from "@/sanity/lib/services/configuracaoService";
import { NavBar } from "@/components/NavBar";

const inter = Inter({
  variable: "--font-inter",
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
  const config = await getConfiguracaoGlobal();
  console.log("🚀 ~ getLayoutData ~ config:", config);
  const navbar = await getNavbar();

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
  console.log("🚀 ~ RootLayout ~ tema:", tema);

  return (
    <html lang="pt-BR">
      <body
        className={inter.variable}
        style={
          {
            "--color-primary": tema.corPrimaria || "#6366f1",
            "--color-secondary": tema.corSecundaria || "#8b5cf6",
            "--color-accent": tema.corDestaque || "#10b981",
            "--color-bg": tema.corFundo || "#ffffff",
            "--color-text": tema.corTexto || "#1f2937",
          } as React.CSSProperties
        }
      >
        <NavBar logo={config?.logo} {...navbar}></NavBar>
        {children}
      </body>
    </html>
  );
}
