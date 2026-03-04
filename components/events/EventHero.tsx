"use client";

import Image from "next/image";
import { Section, Heading } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Event } from "@/sanity/lib/types/event";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";

interface EventHeroProps {
  event: Event;
}

const CATEGORY_LABELS: Record<string, string> = {
  cultural: "Cultural",
  educacional: "Educacional",
  social: "Social",
  arrecadacao: "Arrecadação",
  celebracao: "Celebração",
  esportivo: "Esportivo",
  arte: "Arte",
  musical: "Musical",
  literario: "Literário",
  outro: "Outro",
};

export function EventHero({ event }: EventHeroProps) {
  const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);
  const eventDate = new Date(event.eventDate);
  const dateFormatted = format(eventDate, "dd 'de' MMMM, yyyy", {
    locale: ptBR,
  });
  const timeFormatted = format(eventDate, "HH:mm", { locale: ptBR });
  const weekday = format(eventDate, "EEEE", { locale: ptBR });

  return (
    <Section
      isFluid
      className="relative min-h-[90vh] flex flex-col justify-start overflow-hidden bg-[#0a0a0a] !p-0"
    >
      {/* Background com Blur */}
      {imageUrl && (
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.2)",
          }}
        />
      )}

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col items-start">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="w-full mb-8"
        >
          <span className="inline-block bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl mb-6">
            {CATEGORY_LABELS[event.category]}
          </span>

          <Heading
            level={1}
            className="text-white mb-6 text-5xl md:text-6xl drop-shadow-2xl"
          >
            {event.title}
          </Heading>

          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Calendar size={20} />
              <span className="font-medium capitalize">
                {weekday}, {dateFormatted}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock size={20} />
              <span className="font-medium">{timeFormatted}</span>
            </div>
            {event.location?.name && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin size={20} />
                <span className="font-medium">{event.location.name}</span>
              </div>
            )}
          </div>
        </motion.div>

        {imageUrl && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
            className="w-full flex justify-center"
          >
            <div className="relative w-full max-w-3xl aspect-video rounded-[48px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/10">
              <Image
                src={imageUrl}
                alt={event.coverImage.alt || event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
