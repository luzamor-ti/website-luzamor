"use client";

import { Contato } from "@/sanity/lib/types/contato";
import { Section, SectionHeader, Card, Text, Link } from "@/components/ui";

interface ContactSectionProps {
  data: Contato[];
}

export function ContactSection({ data }: ContactSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          tag="Entre em contato"
          title="Fale conosco"
          align="center"
        />
        <div className="space-y-6">
          {data.map((contact) => (
            <Card key={contact._id} padding="lg">
              {contact.email && (
                <div className="mb-4">
                  <Text variant="small" className="text-gray-600 mb-1">
                    Email
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
              {contact.telefone && (
                <div className="mb-4">
                  <Text variant="small" className="text-gray-600 mb-1">
                    Telefone
                  </Text>
                  <Link
                    href={`tel:${contact.telefone}`}
                    variant="primary"
                    className="font-medium"
                  >
                    {contact.telefone}
                  </Link>
                </div>
              )}
              {contact.endereco && (
                <div>
                  <Text variant="small" className="text-gray-600 mb-1">
                    Endereço
                  </Text>
                  <Text className="font-medium">{contact.endereco}</Text>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
