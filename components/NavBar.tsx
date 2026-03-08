"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import type { NavBar as NavBarType } from "@/sanity/lib/types/navbar";
import { Button } from "./ui";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavBarProps extends Partial<NavBarType> {
  logo?: SanityImage;
}

export function NavBar({ logo, items, primaryButton }: NavBarProps) {
  const logoUrl = logo?.asset?._ref ? buildSanityImageUrl(logo.asset._ref) : "";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) setOpenDropdown(null);
    };

    const handleScroll = () => setOpenDropdown(null);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openDropdown]);

  // Fecha o menu mobile ao scrollar
  useEffect(() => {
    if (!mobileOpen) return;
    const handleScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-4">
      <motion.nav
        className="w-full flex items-center justify-between px-6 py-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
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

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center space-x-6">
          {items?.map((item, index) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const itemKey = item._key || String(index);
            const itemUrl = item.page === "home" ? "/" : `/${item.page}`;

            return (
              <li key={itemKey} className="relative" data-dropdown>
                {hasSubItems ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-white/90 hover:text-white transition-colors duration-300 text-sm font-medium rounded-full px-3 py-1 cursor-pointer"
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
                <AnimatePresence>
                  {hasSubItems && openDropdown === itemKey && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl min-w-[200px] z-10"
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
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        {primaryButton?.title && (
          <div className="hidden md:block">
            <Button href={primaryButton.url} variant="primary" size="sm">
              {primaryButton.title}
            </Button>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-1 cursor-pointer"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden"
            data-dropdown
          >
            <ul className="flex flex-col py-2">
              {items?.map((item, index) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const itemKey = item._key || String(index);
                const itemUrl = item.page === "home" ? "/" : `/${item.page}`;

                return (
                  <li key={itemKey}>
                    {hasSubItems ? (
                      <>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-5 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium cursor-pointer"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === itemKey ? null : itemKey,
                            )
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
                        <AnimatePresence>
                          {openDropdown === itemKey && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden border-t border-white/10"
                            >
                              {item.subItems?.map((subItem, subIndex) => {
                                const subItemUrl =
                                  subItem.page === "home"
                                    ? "/"
                                    : `/${subItem.page}`;
                                return (
                                  <li key={subItem._key || String(subIndex)}>
                                    <Link
                                      href={subItemUrl}
                                      onClick={() => setMobileOpen(false)}
                                      className="block pl-8 pr-5 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={itemUrl}
                        onClick={() => setMobileOpen(false)}
                        className="block px-5 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {primaryButton?.title && (
              <div className="px-5 py-3 border-t border-white/10">
                <Button
                  href={primaryButton.url}
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                >
                  {primaryButton.title}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
