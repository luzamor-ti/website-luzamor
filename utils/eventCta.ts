import { Event } from "@/sanity/lib/types/event";
import { EVENT_DETAIL_FALLBACKS } from "@/constants/textFallbacks";

export type CTAType = "link" | "whatsapp" | "email";

export interface CTAConfig {
  href: string;
  onClick?: () => void;
  isExternal: boolean;
}

/**
 * Constrói a configuração para um botão CTA de evento
 * @param event - Objeto do evento
 * @returns Configuração do CTA com href e handler
 */
export function buildEventCTA(event: Event): CTAConfig {
  const hasCTA = event.cta?.enabled;

  if (!hasCTA || !event.cta) {
    // Fallback: WhatsApp global
    const message = EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
      "{eventName}",
      event.title,
    );
    return {
      href: `https://wa.me/${EVENT_DETAIL_FALLBACKS.globalWhatsapp}?text=${encodeURIComponent(message)}`,
      isExternal: true,
    };
  }

  switch (event.cta.type) {
    case "link":
      return {
        href: event.cta.link || "#",
        isExternal: true,
      };

    case "whatsapp": {
      const whatsappNumber =
        event.cta.whatsapp || EVENT_DETAIL_FALLBACKS.globalWhatsapp;
      const message =
        event.cta.whatsappMessage ??
        EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
          "{eventName}",
          event.title,
        );
      return {
        href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        isExternal: true,
      };
    }

    case "email":
      return {
        href: `mailto:${event.cta.email}?subject=${encodeURIComponent(`Interesse no evento: ${event.title}`)}`,
        isExternal: false,
      };

    default:
      return {
        href: "#",
        isExternal: false,
      };
  }
}

/**
 * Handler de clique para CTA de evento
 * Executa ação apropriada baseada no tipo de CTA
 * @param event - Objeto do evento
 */
export function handleEventCTAClick(event: Event): void {
  if (!event.cta?.enabled) {
    // Fallback para WhatsApp global
    const message = EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
      "{eventName}",
      event.title,
    );
    window.open(
      `https://wa.me/${EVENT_DETAIL_FALLBACKS.globalWhatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    return;
  }

  switch (event.cta.type) {
    case "link":
      if (event.cta.link) {
        window.open(event.cta.link, "_blank");
      }
      break;

    case "whatsapp": {
      const whatsappNumber =
        event.cta.whatsapp || EVENT_DETAIL_FALLBACKS.globalWhatsapp;
      const message =
        event.cta.whatsappMessage ||
        EVENT_DETAIL_FALLBACKS.whatsappDefaultMessage.replace(
          "{eventName}",
          event.title,
        );
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
      break;
    }

    case "email":
      if (event.cta.email) {
        window.location.href = `mailto:${event.cta.email}?subject=${encodeURIComponent(`Interesse no evento: ${event.title}`)}`;
      }
      break;
  }
}

/**
 * Obtém o texto do botão CTA
 * @param event - Objeto do evento
 * @returns Texto do botão
 */
export function getCTAButtonText(event: Event): string {
  return event.cta?.buttonText || EVENT_DETAIL_FALLBACKS.ctaButtonText;
}
