import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/sanity/client";
import { getNavbar } from "@/sanity/lib/services/navbarService";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
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
  const config = await getGlobalConfiguration();
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
  const theme = config?.theme || {};

  return (
    <html lang="pt-BR">
      <body
        className={inter.variable}
        style={
          {
            "--color-primary": theme.primaryColor || "#6366f1",
            "--color-secondary": theme.secondaryColor || "#8b5cf6",
            "--color-accent": theme.accentColor || "#10b981",
            "--color-bg": theme.backgroundColor || "#ffffff",
            "--color-text": theme.textColor || "#1f2937",
          } as React.CSSProperties
        }
      >
        <NavBar logo={config?.logo} {...navbar}></NavBar>
        {children}
      </body>
    </html>
  );
}
