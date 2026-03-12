import { GENERIC_FALLBACK } from "@/constants/textFallbacks";

export function ctaWhatsappGlobal(
  itemName: string,
  number?: string,
  customMessage?: string,
  fallbackNumber?: string, // Número que vem da configuracaoGlobal do Sanity
) {
  // HIERARQUIA:
  // 1. WhatsApp do Curso
  // 2. WhatsApp Global do Sanity
  // 3. Número de emergência caso o Sanity esteja totalmente vazio
  const finalNumber =
    number ||
    fallbackNumber ||
    process.env.NEXT_PUBLIC_FALLBACK_WHATSAPP_NUMBER;

  const baseMessage = customMessage || GENERIC_FALLBACK.whatsappDefaultMessage;
  const message = baseMessage.replace("{itemName}", itemName);

  return {
    href: `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`,
    isExternal: true,
  };
}

export function getWhatsappContactUrl(
  number?: string,
  customMessage?: string,
  fallbackNumber?: string,
): string {
  const finalNumber =
    number ||
    fallbackNumber ||
    process.env.NEXT_PUBLIC_FALLBACK_WHATSAPP_NUMBER;

  const baseMessage = customMessage || "Olá! Gostaria de mais informações.";
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(baseMessage)}`;
}
