import { Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/sanity/client";
import { getNavbar } from "@/sanity/lib/services/navbarService";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getFooter } from "@/sanity/lib/services/footerService";

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
  const footer = await getFooter();

  return { config, navbar, footer };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config, navbar, footer } = await getLayoutData();
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
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -left-48 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{
              backgroundColor: theme.primaryColor || "#00B749",
              opacity: 0.3,
            }}
          />
          <div
            className="absolute -left-32 top-2/3 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{
              backgroundColor: theme.primaryColor || "#00B749",
              opacity: 0.03,
            }}
          />

          <div
            className="absolute -right-48 top-1/3 w-[480px] h-[480px] rounded-full blur-[120px]"
            style={{
              backgroundColor: theme.primaryColor || "#00B749",
              opacity: 0.2,
            }}
          />
          <div
            className="absolute -right-36 top-3/4 w-[420px] h-[420px] rounded-full blur-[110px]"
            style={{
              backgroundColor: theme.primaryColor || "#00B749",
              opacity: 0.1,
            }}
          />
        </div>

        <NavBar logo={config?.logo} {...navbar}></NavBar>
        {children}
        <Footer logo={config?.logo} {...footer}></Footer>
      </body>
    </html>
  );
}
