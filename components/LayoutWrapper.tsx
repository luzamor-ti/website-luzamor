"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { GlobalActionButtons } from "@/components/GlobalActionButtons";
import type { Image } from "sanity";
import type { NavBar as NavBarType } from "@/sanity/lib/types/navbar";
import type { Footer as FooterType } from "@/sanity/lib/types/footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
  navbar: NavBarType | null;
  footer: FooterType | null;
  logo?: Image | null;
  whatsappNumber?: string;
}

export default function LayoutWrapper({
  children,
  navbar,
  footer,
  logo,
  whatsappNumber,
}: LayoutWrapperProps) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/login" ||
    pathname === "/maintenance" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/fundacao-cms");

  return (
    <>
      {!hideLayout && navbar && <NavBar logo={logo ?? undefined} {...navbar} />}

      <div id="main-content" tabIndex={-1}>
        {children}
      </div>

      {!hideLayout && footer && <Footer logo={logo ?? undefined} {...footer} />}

      {!hideLayout && <GlobalActionButtons whatsappNumber={whatsappNumber} />}
    </>
  );
}
