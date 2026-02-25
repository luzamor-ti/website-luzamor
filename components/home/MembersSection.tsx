"use client";

import { Membro } from "@/sanity/lib/types/membro";
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Heading,
  Text,
} from "@/components/ui";

interface MembersSectionProps {
  data: Membro[];
}

export function MembersSection({ data }: MembersSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <SectionHeader tag="Nossa equipe" title="Pessoas que fazem a diferença" />
      <Grid cols={4} gap="lg">
        {data.map((member) => (
          <Card key={member._id} padding="lg" className="text-center">
            <Heading level={5} className="mb-1">
              {member.nome}
            </Heading>
            <Text variant="small" className="text-gray-600 mb-2">
              {member.cargo}
            </Text>
            {member.bioCurta && (
              <Text variant="small" className="text-gray-500">
                {member.bioCurta}
              </Text>
            )}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
