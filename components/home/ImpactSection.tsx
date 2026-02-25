"use client";

import {
  Section,
  SectionHeader,
  Card,
  Grid,
  Heading,
  Text,
} from "@/components/ui";

const ImpactSection = () => {
  const impacts = [
    {
      number: "652+",
      title: "Projetos realizados",
      description: "Promovendo a cultura e fomentando a educação de qualidade.",
    },
    {
      number: "14+",
      title: "Cursos e aulas",
      description: "Com profissionais extremamente competentes.",
    },
    {
      number: "10+",
      title: "Parcerias ativas",
      description: "Garantindo excelência e melhorias sempre.",
    },
  ];

  return (
    <Section className="bg-gray-900 text-white">
      <SectionHeader
        tag="Nosso impacto"
        title="Transformando vidas através da cultura"
        align="center"
      />
      <Grid cols={3} gap="lg">
        {impacts.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800 border-gray-700 text-center"
            padding="lg"
          >
            <Heading level={2} className="text-primary mb-4">
              {item.number}
            </Heading>
            <Heading level={5} className="text-white mb-3">
              {item.title}
            </Heading>
            <Text className="text-gray-400 leading-relaxed">
              {item.description}
            </Text>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ImpactSection;
