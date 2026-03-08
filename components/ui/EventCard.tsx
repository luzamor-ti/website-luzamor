import { staggerItemVariants } from "@/lib/animations";
import { Event } from "@/sanity/lib/types/event";
import { motion } from "framer-motion";
import { Link } from "./Typography";
import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { EventCategoryBadge } from "../events";
import { ArrowRight, Clock, MapPin, Ticket } from "lucide-react";
import { EVENT_DETAIL_FALLBACKS } from "@/constants/textFallbacks";

export function EventCard({
  event,
  index,
}: {
  event: Event | Partial<Event>;
  index: number;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(".", ""),
      year: date.getFullYear(),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const handleCTA = (event: Event | Partial<Event>, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!event.cta?.enabled) return;

    switch (event.cta.type) {
      case "whatsapp":
        if (event.cta.whatsapp) {
          const message =
            event.cta.whatsappMessage ||
            EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
              "{eventName}",
              event.title || "este evento",
            );
          window.open(
            `https://wa.me/${event.cta.whatsapp}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        } else {
          // Fallback para WhatsApp global
          const message = EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
            "{eventName}",
            event.title || "este evento",
          );
          window.open(
            `https://wa.me/${EVENT_DETAIL_FALLBACKS.globalWhatsapp}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        }
        break;
      case "email":
        if (event.cta.email) {
          const mailtoLink = `mailto:${event.cta.email}?subject=${encodeURIComponent(`Interesse em: ${event.title}`)}`;
          const anchor = document.createElement("a");
          anchor.href = mailtoLink;
          anchor.click();
        }
        break;
      case "link":
        if (event.cta.link) {
          window.open(event.cta.link, "_blank");
        }
        break;
    }
  };

  const date = formatDate(event?.eventDate || new Date().toISOString());
  const price = formatPrice(event?.ticketPrice?.value || 0);
  console.log("EventCard render:", { event, date, price });

  return (
    <motion.div
      key={event._id}
      className="group relative perspective-1000"
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
      role="article"
      aria-label={`Evento: ${event.title}`}
    >
      {/* Card principal - Link para página do evento */}
      <Link
        href={`/evento/${event.slug?.current}`}
        className="relative rounded-2xl overflow-hidden bg-white shadow-xl group-hover:shadow-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 h-full flex flex-col block cursor-pointer"
      >
        {/* Imagem de destaque com overlay de gradiente */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={buildSanityImageUrl(event.coverImage?.asset?._ref)}
            alt={event.coverImage?.alt || `Imagem do evento ${event.title}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Data em destaque - canto superior esquerdo */}
          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-[70px]">
            <div className="text-3xl font-bold text-gray-900 leading-none">
              {date.day}
            </div>
            <div className="text-xs font-semibold text-gray-600 uppercase mt-1">
              {date.month}
            </div>
          </div>

          {/* Badge de categoria - canto superior direito */}
          <div className="absolute top-4 right-4">
            <EventCategoryBadge
              category={event.category || "outro"}
              variant="solid"
              size="sm"
            />
          </div>

          {/* Efeito de brilho animado */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
          </div>
        </div>

        {/* Conteúdo do card */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Título */}
          <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {event.title}
          </h4>

          {/* Informações do evento */}
          <div className="space-y-2.5 mb-4 flex-1">
            {/* Horário */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{date.time}</span>
            </div>

            {/* Localização (se disponível) */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="line-clamp-1">
                {event.location?.name || "Fundação luzamor"}
              </span>
            </div>

            {/* Ingresso */}
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary flex-shrink-0" />
              <span
                className={`text-sm font-semibold ${event.ticketPrice?.free ? "text-green-600" : "text-gray-900"}`}
              >
                {event.ticketPrice?.free ? "Gratuito" : price}
              </span>
            </div>
          </div>

          {/* Botão de ação do CTA */}
          {event.cta?.enabled && (
            <button
              onClick={(e) => handleCTA(event, e)}
              className="group/cta flex items-center justify-center gap-2 text-primary font-semibold text-sm transition-all duration-300 mt-auto pt-4 border-t border-gray-100 w-full py-3 rounded-lg hover:bg-primary hover:text-white hover:shadow-lg cursor-pointer"
            >
              <span className="uppercase tracking-wide">
                {event.cta.buttonText || "Garantir meu lugar"}
              </span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </button>
          )}
        </div>

        {/* Borda animada */}
        <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 ring-primary ring-opacity-0 group-hover:ring-opacity-30 transition-all duration-500 pointer-events-none" />
      </Link>

      {/* Reflexo sob o card */}
      <div className="absolute -bottom-2 left-4 right-4 h-8 bg-gradient-to-br from-primary/20 to-emerald-400/20 opacity-0 group-hover:opacity-40 blur-xl rounded-full transition-opacity duration-500 -z-10" />
    </motion.div>
  );
}
