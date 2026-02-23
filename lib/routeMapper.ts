/**
 * Centralized slug-to-page mapping.
 *
 * Add a new entry here whenever a new CMS-driven page is created in the
 * frontend. If a slug exists in the CMS but is NOT listed here the app will
 * serve a 404 page instead of a blank screen.
 */
export const REGISTERED_SLUGS = [
  "sobre",
  "projetos",
  "contato",
  "salas-de-aula",
  "calendario-de-eventos",
  "auditorio",
  "aulas",
  "diretoria",
  "palavra-do-presidente",
] as const;

export type RegisteredSlug = (typeof REGISTERED_SLUGS)[number];

export function isRegisteredSlug(slug: string): slug is RegisteredSlug {
  return (REGISTERED_SLUGS as readonly string[]).includes(slug);
}
