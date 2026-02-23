"use client";

import { motion } from "framer-motion";
import { Image as SanityImage } from "sanity";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import type { NavBar as NavBarType } from "@/sanity/lib/types/navbar";

interface NavBarProps extends Partial<NavBarType> {
  logo?: SanityImage;
}

export function NavBar({ logo, itens, botaoPrincipal }: NavBarProps) {
  const logoUrl = logo?.asset?._ref ? buildSanityImageUrl(logo.asset._ref) : "";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-4">
      <motion.nav
        className="w-full flex items-center justify-between px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm"
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
              className="h-8 w-auto object-contain"
            />
          )}
          <span className="text-gray-800 font-semibold text-lg">
            Fundação Luzamor
          </span>
        </div>
        <ul className="flex items-center space-x-6">
          {itens?.map((item) => (
            <li key={item._id}>
              <a
                href={`/${item.slug}`}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-sm font-medium"
              >
                {item.tituloPersonalizado || item.slug}
              </a>
            </li>
          ))}
        </ul>
        {botaoPrincipal?.titulo && (
          <a
            href={botaoPrincipal.url || "#"}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold"
          >
            {botaoPrincipal.titulo}
          </a>
        )}
      </motion.nav>
    </div>
  );
}
