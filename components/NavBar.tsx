"use client";

import { motion } from "framer-motion";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import type { NavBar as NavBarType } from "@/sanity/lib/types/navbar";
import { Button } from "./ui";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavBarProps extends Partial<NavBarType> {
  logo?: SanityImage;
}

export function NavBar({ logo, itens, botaoPrincipal }: NavBarProps) {
  const logoUrl = logo?.asset?._ref ? buildSanityImageUrl(logo.asset._ref) : "";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-4">
      <motion.nav
        className="w-full flex items-center justify-between px-6 py-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo"
              width={34}
              height={34}
              className="h-8 w-auto object-contain rounded-full"
            />
          )}
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm">Fundação</span>
            <span className="text-white font-semibold text-sm">Luzamor</span>
          </div>
        </div>
        <ul className="flex items-center space-x-6">
          {itens?.map((item, index) => {
            const hasSubItems = item.subItens && item.subItens.length > 0;
            const itemKey = item._key || String(index);
            const itemUrl = item.pagina === "home" ? "/" : `/${item.pagina}`;

            return (
              <li
                key={itemKey}
                className="relative"
                onMouseEnter={() => hasSubItems && setOpenDropdown(itemKey)}
                onMouseLeave={() => hasSubItems && setOpenDropdown(null)}
              >
                {hasSubItems ? (
                  <button
                    className="flex items-center gap-1 text-white/90 hover:text-white transition-colors duration-300 text-sm font-medium rounded-full px-3 py-1"
                    onClick={() =>
                      setOpenDropdown(openDropdown === itemKey ? null : itemKey)
                    }
                  >
                    {item.titulo}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openDropdown === itemKey ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={itemUrl}
                    className="text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-300 text-sm font-medium rounded-full px-3 py-1"
                  >
                    {item.titulo}
                  </a>
                )}

                {/* Dropdown Menu */}
                {hasSubItems && openDropdown === itemKey && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl min-w-[200px]"
                  >
                    {item.subItens?.map((subItem, subIndex) => {
                      const subItemUrl =
                        subItem.pagina === "home" ? "/" : `/${subItem.pagina}`;
                      return (
                        <a
                          key={subItem._key || String(subIndex)}
                          href={subItemUrl}
                          className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 text-sm"
                        >
                          {subItem.titulo}
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
        {botaoPrincipal?.titulo && (
          <Button href={botaoPrincipal.url} variant="primary" size="sm">
            {botaoPrincipal.titulo}
          </Button>
        )}
      </motion.nav>
    </div>
  );
}
