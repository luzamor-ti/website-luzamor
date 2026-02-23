export function buildSanityImageUrl(ref?: string): string {
  if (!ref) return "";

  const prefix = process.env.NEXT_PUBLIC_SANITY_IMAGE_URL_PREFIX || "";

  const parts = ref.split("-");

  if (parts.length < 3) return "";
  if (parts[0] !== "image") return "";

  const hash = parts[1];
  const extension = parts[parts.length - 1];
  const middle = parts.slice(2, -1).join("-");

  return `${prefix}${hash}-${middle}.${extension}`;
}
