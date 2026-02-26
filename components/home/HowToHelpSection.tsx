"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  Heading,
  Text,
  Grid,
  SectionHeader,
  SectionFooter,
} from "@/components/ui";
import {
  Users,
  DollarSign,
  Clock,
  Heart,
  Handshake,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

const iconMap: Record<string, LucideIcon> = {
  Users,
  DollarSign,
  Clock,
  Heart,
  Handshake,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
};

interface HowToHelpSectionProps {
  data: HomeSection | null;
}

const HowToHelpSection = ({ data }: HowToHelpSectionProps) => {
  const section = data || null;
  const fallback = TEXT_FALLBACKS.howToHelp;
  const router = useRouter();

  const cards = (section?.cards || fallback.cards || []).map((card, index) => ({
    ...card,
    IconComponent: card.icon
      ? iconMap[card.icon] || Users
      : iconMap[Object.keys(iconMap)[index] || "Users"],
  }));

  const cardColors = [
    {
      from: "from-emerald-500",
      to: "to-teal-600",
      ring: "ring-emerald-400",
      glow: "shadow-emerald-500/50",
    },
    {
      from: "from-blue-500",
      to: "to-indigo-600",
      ring: "ring-blue-400",
      glow: "shadow-blue-500/50",
    },
    {
      from: "from-purple-500",
      to: "to-pink-600",
      ring: "ring-purple-400",
      glow: "shadow-purple-500/50",
    },
  ];

  return (
    <Section>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          description={section?.description || fallback.description}
          layout="split"
          variant="light"
        />

        <Grid cols={3} gap="lg" className="mb-8 md:mb-12">
          {cards.map((card, index) => {
            const IconComponent = card.IconComponent;
            const color = cardColors[index % cardColors.length];

            return (
              <motion.div
                key={index}
                className="group relative cursor-pointer perspective-1000"
                variants={staggerItemVariants}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -12,
                  rotateY: 2,
                  rotateX: -2,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  const url = "url" in card ? card.url : undefined;
                  if (url) {
                    if (url.startsWith("http")) {
                      window.open(url, "_blank");
                    } else {
                      router.push(url);
                    }
                  }
                }}
                role="article"
                aria-label={`Como ajudar: ${card.title}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const url = "url" in card ? card.url : undefined;
                    if (url) {
                      if (url.startsWith("http")) {
                        window.open(url, "_blank");
                      } else {
                        router.push(url);
                      }
                    }
                  }
                }}
              >
                <div
                  className={`relative rounded-xl md:rounded-2xl overflow-hidden h-[320px] sm:h-[360px] md:h-[450px] bg-gradient-to-br ${color.from} ${color.to} shadow-xl group-hover:shadow-2xl ${color.glow} transition-all duration-500`}
                >
                  {card.image ? (
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity duration-500">
                      <Image
                        src={urlFor(card.image).width(600).height(800).url()}
                        alt={`Imagem ilustrativa de ${card.title}`}
                        fill
                        className="object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ) : null}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                  </div>

                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative h-full min-h-full p-5 sm:p-6 md:p-8 flex flex-col text-white z-10">
                    <motion.div
                      className="flex justify-start mb-6 sm:mb-8 md:mb-6 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:bg-white/35 transition-all duration-300 border border-white/20">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-lg" />
                      </div>
                    </motion.div>

                    <div className="flex-1 flex flex-col justify-between min-h-0">
                      <div className="space-y-2.5 sm:space-y-3 md:space-y-4 flex-shrink-0">
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <Heading
                            level={3}
                            className="text-white font-bold text-lg sm:text-xl md:text-2xl group-hover:translate-x-2 transition-transform duration-300 drop-shadow-lg leading-tight"
                          >
                            {card.title}
                          </Heading>
                          <div
                            className={`h-0.5 md:h-1 w-0 ${color.from} rounded-full group-hover:w-12 sm:group-hover:w-16 md:group-hover:w-20 transition-all duration-500`}
                          />
                        </div>

                        <Text className="text-white/95 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3 text-sm md:text-base drop-shadow-md group-hover:text-white transition-colors duration-300">
                          {card.description}
                        </Text>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-white font-semibold pt-4 sm:pt-5 md:pt-6 group-hover:gap-2.5 sm:group-hover:gap-3 transition-all duration-300 flex-shrink-0">
                        <span className="text-xs sm:text-sm tracking-wide uppercase">
                          Saiba mais
                        </span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Borda brilhante animada */}
                  <div
                    className={`absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 ${color.ring} ring-opacity-0 group-hover:ring-opacity-60 transition-all duration-500`}
                  />
                </div>

                {/* Reflexo sob o card */}
                <div
                  className={`absolute -bottom-2 left-4 right-4 h-8 bg-gradient-to-br ${color.from} ${color.to} opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            );
          })}
        </Grid>

        {/* Footer */}
        <SectionFooter
          text={
            section?.buttonText ||
            fallback.description_footer ||
            fallback.buttonText ||
            ""
          }
          linkText={section?.linkText || fallback.linkText || "Saiba mais"}
          linkHref={section?.linkUrl || "#"}
          showLink={true}
        />
      </motion.div>
    </Section>
  );
};

export default HowToHelpSection;
