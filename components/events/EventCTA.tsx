"use client";

import { Section, Heading, Button } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface EventCTAProps {
  event: Event;
}

export function EventCTA({ event }: EventCTAProps) {
  if (!event.cta?.enabled) return null;

  const handleCTAClick = () => {
    switch (event.cta?.type) {
      case "link":
        window.open(event.cta.link, "_blank");
        break;
      case "whatsapp":
        const message = encodeURIComponent(
          event.cta.whatsappMessage ||
            `Olá! Gostaria de participar do evento: ${event.title}`,
        );
        window.open(
          `https://wa.me/${event.cta.whatsapp}?text=${message}`,
          "_blank",
        );
        break;
      case "email":
        window.location.href = `mailto:${event.cta.email}?subject=Interesse no evento: ${event.title}`;
        break;
    }
  };

  const getCTAIcon = () => {
    switch (event.cta?.type) {
      case "link":
        return <ExternalLink size={24} />;
      case "whatsapp":
        return <MessageCircle size={24} />;
      case "email":
        return <Mail size={24} />;
      default:
        return <ExternalLink size={24} />;
    }
  };

  return (
    <Section className="bg-gradient-to-r from-primary via-primary to-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-3xl mx-auto"
      >
        <Heading level={2} className="text-white mb-6 text-3xl md:text-4xl">
          {event.cta?.buttonText || "Participe deste evento!"}
        </Heading>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleCTAClick}
          className="bg-white text-primary hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          {getCTAIcon()}
          {event.cta?.buttonText || "Garantir minha vaga"}
        </Button>
      </motion.div>
    </Section>
  );
}
