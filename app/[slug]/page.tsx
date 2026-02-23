import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/sanity/client";

async function getNavbarSlugs(): Promise<string[]> {
  const navbar = await client.fetch(`
    *[_type == "navbar"][0]{
      itens[]{slug},
      botaoPrincipal{slug}
    }
  `);

  const itemSlugs: string[] = (navbar?.itens ?? [])
    .map((i: { slug?: string }) => i.slug)
    .filter(Boolean);

  if (navbar?.botaoPrincipal?.slug) {
    itemSlugs.push(navbar.botaoPrincipal.slug);
  }

  return itemSlugs;
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const validSlugs = await getNavbarSlugs();

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <main style={{ paddingTop: "80px" }}>
      <h1>{slug}</h1>
    </main>
  );
}
