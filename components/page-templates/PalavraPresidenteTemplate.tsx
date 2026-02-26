"use client";
import { Pagina } from "@/sanity/lib/types/pagina";
import { Section, Heading, Grid, SectionHeader, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getPalavraPresidente } from "@/sanity/lib/services/membroService";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { use, useEffect, useState } from "react";
import { Membro } from "@/sanity/lib";

interface PalabraPresidenteTemplateProps {
  pagina: Pagina;
}

export function PalavraPresidenteTemplate({
  pagina,
}: PalabraPresidenteTemplateProps) {
  const [presidentData, setPresidentData] = useState<Membro | null>();

  useEffect(() => {
    getPalavraPresidente().then((data) => setPresidentData(data));
  }, []);

  if (!presidentData) return <div>Carregando...</div>;
  const imgPresident = buildSanityImageUrl(presidentData.foto.asset._ref);
  return (
    <main className="min-h-screen">
      <div
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/al6LHhZeQCUgkaAutT71lCt7G5w.png?width=1416&height=921)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(16px)",
          position: "fixed",
          top: -30,
          left: -30,
          right: -30,
          bottom: -30,
          zIndex: -1,
        }}
      ></div>
      <motion.section
        className="relative min-h-screen flex flex-col items-start justify-center p-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        <Grid cols={2} className="max-w-6xl mx-auto items-center">
          <Image
            alt={presidentData.alt}
            src={imgPresident}
            width={500}
            height={500}
          ></Image>
          <div className="text-white">
            <SectionHeader variant="dark" title={pagina.titulo}></SectionHeader>
            {presidentData.palavra && (
              <PortableText value={presidentData.palavra} />
            )}
          </div>
        </Grid>
      </motion.section>
    </main>
  );
}
