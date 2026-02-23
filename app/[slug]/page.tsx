import { notFound } from "next/navigation";
import { isRegisteredSlug } from "@/lib/routeMapper";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isRegisteredSlug(slug)) {
    notFound();
  }

  return (
    <main style={{ paddingTop: "80px" }}>
      <h1>{slug}</h1>
    </main>
  );
}
