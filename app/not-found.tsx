import { Section, Heading, Text, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <Heading level={1} className="text-9xl font-bold text-primary mb-4">
            404
          </Heading>
          <Heading level={2} className="mb-4">
            Página não encontrada
          </Heading>
          <Text variant="large" className="mb-8 text-gray-600">
            Desculpe, a página que você está procurando não existe ou foi
            removida.
          </Text>
          <Button href="/" variant="primary" size="lg">
            Voltar para a Home
          </Button>
        </div>
      </Section>
    </main>
  );
}
