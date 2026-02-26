"use client";

import { Member } from "@/sanity/lib/types/member";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Heading,
  Text,
} from "@/components/ui";

interface MembersSectionProps {
  data: Member[];
  section: HomeSection | null;
}

export function MembersSection({ data, section }: MembersSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.members;

  return (
    <Section className="bg-gray-50">
      <SectionHeader
        tag={section?.tag || fallback.tag}
        title={section?.title || fallback.title}
      />
      <Grid cols={4} gap="lg">
        {data.map((member) => (
          <Card key={member._id} padding="lg" className="text-center">
            <Heading level={5} className="mb-1">
              {member.name}
            </Heading>
            <Text variant="small" className="text-gray-600 mb-2">
              {member.role}
            </Text>
            {member.shortBio && (
              <Text variant="small" className="text-gray-500">
                {member.shortBio}
              </Text>
            )}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
