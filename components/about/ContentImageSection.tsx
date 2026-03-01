"use client";

import { ContentWithImage } from "@/sanity/lib/types/about";
import { Section, SectionHeader, Text } from "@/components/ui";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ContentImageSectionProps {
  data: ContentWithImage | null;
  fallback: {
    tag?: string;
    title?: string;
    description?: string;
  };
  imagePosition?: "left" | "right";
  backgroundColor?: "white" | "light";
}

export function ContentImageSection({
  data,
  fallback,
  imagePosition = "right",
  backgroundColor = "white",
}: ContentImageSectionProps) {
  const bgClass = backgroundColor === "light" ? "bg-neutral-light" : "bg-white";

  // Garante que description seja string, não PortableText
  const getDescription = () => {
    const desc = data?.descricao;
    if (!desc) return fallback.description;

    // Se for string, retorna direto
    if (typeof desc === "string") return desc;

    // Se for array (PortableText), extrai o texto
    if (Array.isArray(desc)) {
      return desc
        .map((block) => {
          if (block._type === "block" && block.children) {
            return block.children.map((child) => child.text).join("");
          }
          return "";
        })
        .join("\n");
    }

    return fallback.description;
  };

  return (
    <Section className={bgClass}>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Conteúdo */}
        <motion.div
          variants={staggerItemVariants}
          className={`space-y-6 ${imagePosition === "left" ? "lg:order-2" : ""}`}
        >
          <SectionHeader
            tag={data?.tag || fallback.tag}
            title={data?.titulo || fallback.title}
            align="left"
            variant="light"
          />
          <Text variant="large" className="text-neutral-medium leading-relaxed">
            {getDescription()}
          </Text>
        </motion.div>

        {/* Imagem */}
        <motion.div
          variants={staggerItemVariants}
          className={`relative h-[500px] rounded-2xl overflow-hidden ${
            imagePosition === "left" ? "lg:order-1" : ""
          }`}
        >
          {data?.imagem ? (
            <Image
              src={urlFor(data.imagem).width(800).height(800).url()}
              alt={data?.titulo || fallback.title || ""}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
          )}
        </motion.div>
      </motion.div>
    </Section>
  );
}
