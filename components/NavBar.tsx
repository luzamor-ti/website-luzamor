"use client";

import { motion } from "framer-motion";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import type { NavBar as NavBarType } from "@/sanity/lib/types/navbar";
import { Button } from "./ui";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavBarProps extends Partial<NavBarType> {
  logo?: SanityImage;
}

export function NavBar({ logo, items, primaryButton }: NavBarProps) {
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
        <Link
          href="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
        >
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
        </Link>
        <ul className="flex items-center space-x-6">
          {items?.map((item, index) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const itemKey = item._key || String(index);
            const itemUrl = item.page === "home" ? "/" : `/${item.page}`;

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
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openDropdown === itemKey ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={itemUrl}
                    className="text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-300 text-sm font-medium rounded-full px-3 py-1"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {hasSubItems && openDropdown === itemKey && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl min-w-[200px]"
                    onMouseEnter={() => setOpenDropdown(itemKey)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.subItems?.map((subItem, subIndex) => {
                      const subItemUrl =
                        subItem.page === "home" ? "/" : `/${subItem.page}`;
                      return (
                        <Link
                          key={subItem._key || String(subIndex)}
                          href={subItemUrl}
                          className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 text-sm"
                        >
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
        {primaryButton?.title && (
          <Button href={primaryButton.url} variant="primary" size="sm">
            {primaryButton.title}
          </Button>
        )}
      </motion.nav>
    </div>
  );
}
