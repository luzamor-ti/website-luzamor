export function buildSanityImageUrl(ref?: string): string {
  if (!ref) return "";

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return "";

  const parts = ref.split("-");

  // Formato esperado: image-<hash>-<dimensions>-<extension>
  if (parts.length < 4) return "";
  if (parts[0] !== "image") return "";

  const hash = parts[1];
  const extension = parts[parts.length - 1];
  const dimensions = parts.slice(2, -1).join("-");

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dimensions}.${extension}`;
}
