"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/sanity/client";

const builder = imageUrlBuilder(client);

export interface NavbarItem {
  tituloPersonalizado: string;
  slug: string;
}

export interface NavbarProps {
  itens: NavbarItem[];
  logo?: any;
  botaoPrincipal?: {
    titulo: string;
    slug: string;
  };
}

export default function Navbar({ itens, logo, botaoPrincipal }: NavbarProps) {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 pointer-events-none"
    >
      <div className="flex justify-between items-center p-3 backdrop-blur-[10px] bg-[rgba(5,5,5,0.55)] max-w-[912px] w-full rounded-[99px] border border-white/20 pointer-events-auto">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="shrink-0"
        >
          <Link href="/" className="flex items-center justify-center pb-0.5">
            {logo ? (
              <img
                src={builder.image(logo).width(68).url()}
                alt="Logo"
                className="w-[34px] h-[34px] aspect-square object-cover"
              />
            ) : (
              <span className="text-white font-bold text-base tracking-tight">
                Luzamor
              </span>
            )}
          </Link>
        </motion.div>

        {/* Menu */}
        <nav className="flex items-center gap-0.5">
          {itens.map((item, index) => {
            const href = `/${item.slug}`;
            const isActive = pathname === href;

            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.15 + index * 0.05,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={href}
                  className={`flex justify-center items-center px-[10px] py-1 rounded-lg text-white text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive ? "bg-white/[0.12]" : "hover:bg-white/[0.07]"
                  }`}
                >
                  {item.tituloPersonalizado}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Botão Principal */}
        {botaoPrincipal?.titulo && botaoPrincipal?.slug && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0"
          >
            <Link
              href={`/${botaoPrincipal.slug}`}
              className="flex items-center justify-center px-5 py-3 bg-[#00b749] rounded-[999px] border border-[#54db8a] text-white text-sm font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-85"
            >
              {botaoPrincipal.titulo}
            </Link>
          </motion.div>
        )}

      </div>
    </motion.header>
  );
}
