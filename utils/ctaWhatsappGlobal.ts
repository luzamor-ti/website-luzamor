import { GENERIC_FALLBACK } from "@/constants/textFallbacks";

export function ctaWhatsappGlobal(itemName: string, number: string) {
  const message = GENERIC_FALLBACK.whatsappDefaultMessage.replace(
    "{itemName}",
    itemName,
  );
  return {
    href: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    isExternal: true,
  };
}
