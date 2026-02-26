"use client";

import { Contact } from "@/sanity/lib/types/contact";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, Card, Text, Link } from "@/components/ui";

interface ContactSectionProps {
  data: Contact[];
  section: HomeSection | null;
}

export function ContactSection({ data, section }: ContactSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.contact;
  const labels = section?.labels || fallback.labels;

  return (
    <Section className="bg-white">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          align="center"
        />
        <div className="space-y-6">
          {data.map((contact) => (
            <Card key={contact._id} padding="lg">
              {contact.email && (
                <div className="mb-4">
                  <Text variant="small" className="text-gray-600 mb-1">
                    {labels.email}
                  </Text>
                  <Link
                    href={`mailto:${contact.email}`}
                    variant="primary"
                    className="font-medium"
                  >
                    {contact.email}
                  </Link>
                </div>
              )}
              {contact.phone && (
                <div className="mb-4">
                  <Text variant="small" className="text-gray-600 mb-1">
                    {labels.phone}
                  </Text>
                  <Link
                    href={`tel:${contact.phone}`}
                    variant="primary"
                    className="font-medium"
                  >
                    {contact.phone}
                  </Link>
                </div>
              )}
              {contact.address && (
                <div>
                  <Text variant="small" className="text-gray-600 mb-1">
                    {labels.address}
                  </Text>
                  <Text className="font-medium">{contact.address}</Text>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
