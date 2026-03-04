import { notFound } from "next/navigation";
import { getEventBySlug } from "@/sanity/lib/services/eventService";
import {
  EventHero,
  EventCTA,
  EventDetails,
  EventInfo,
  EventGallerySection,
} from "@/components/events";
import { Metadata } from "next";

interface EventPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Evento não encontrado",
    };
  }

  return {
    title: `${event.title} | Fundação Luz & Amor`,
    description:
      event.description?.[0]?.children?.[0]?.text ||
      "Evento da Fundação Luz & Amor",
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <EventHero event={event} />
      <EventCTA event={event} />

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EventInfo event={event} />
            </div>
          </div>
        </div>
      </div>

      <EventGallerySection event={event} />
    </main>
  );
}
