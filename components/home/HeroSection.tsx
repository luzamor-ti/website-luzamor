"use client";

import { motion } from "framer-motion";
import { Hero } from "@/sanity/lib/types/hero";
import { slideUpVariants, staggerContainerVariants } from "@/lib/animations";
import { Heading, Text, Button } from "@/components/ui";

interface HeroSectionProps {
  data: Hero | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  const backgroundImage = data?.image?.asset?.url;
  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-start justify-center p-10"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      <div className="relative z-10 max-w-5xl mx-auto text-start">
        {data?.tagline && (
          <motion.div variants={slideUpVariants} className="mb-4">
            <Text variant="small" className="text-primary font-medium">
              {data.tagline}
            </Text>
          </motion.div>
        )}

        <motion.div variants={slideUpVariants}>
          <Heading level={1} className="text-start text-white">
            {data?.title || "Transformando cultura em experiências reais"}
          </Heading>
        </motion.div>

        {data?.subtitle && (
          <motion.div className="mt-6 max-w-2xl" variants={slideUpVariants}>
            <Text variant="large" className="text-start text-white/90">
              {data.subtitle}
            </Text>
          </motion.div>
        )}

        {/* CTAs */}
        {(data?.primaryCta || data?.secondaryCta) && (
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            variants={slideUpVariants}
          >
            {data?.primaryCta && (
              <Button href={data.primaryCta.url} size="lg" showArrow>
                {data.primaryCta.text}
              </Button>
            )}

            {data?.secondaryCta && (
              <Button href={data.secondaryCta.url} variant="outline" size="lg">
                {data.secondaryCta.text}
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
