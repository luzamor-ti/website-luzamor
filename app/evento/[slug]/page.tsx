import { notFound } from "next/navigation";
import { getEventBySlug } from "@/sanity/lib/services/eventService";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import {
  EventHero,
  EventDetails,
  EventInfo,
  EventGallerySection,
  EventSupportersSection,
  EventOrganizations,
} from "@/components/events";
import { Section } from "@/components/ui";
import { Metadata } from "next";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

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
  const { slug } = await params;

  const [event, globalConfig] = await Promise.all([
    getEventBySlug(slug),
    getGlobalConfiguration(),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <EventHero event={event} />

      <Section className="my-12 p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Sticky Sidebar) */}
            <div className="lg:col-span-8 space-y-12">
              <EventDetails event={event} />
              <EventSupportersSection event={event} />
            </div>

            {/* Right Column (Content) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
              <EventInfo
                event={event}
                globalWhatsapp={globalConfig?.contact?.whatsapp}
              />
            </div>

          </div>
        </div>
      </Section>

      <EventOrganizations event={event} />

      <EventGallerySection event={event} />
    </main>
  );
}
