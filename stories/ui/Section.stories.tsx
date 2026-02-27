import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";

const meta = {
  title: "UI/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Container de seção com animações. Wrapper para seções da página com animação de entrada e espaçamento consistente.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="text-center">
        <Heading level={2} className="mb-4">
          Seção de Exemplo
        </Heading>
        <Text>
          Este é um exemplo de seção com animação de entrada. O conteúdo é
          centralizado e tem espaçamento consistente.
        </Text>
      </div>
    ),
  },
};

export const WithId: Story = {
  args: {
    id: "sobre-nos",
    children: (
      <div className="text-center">
        <Heading level={2} className="mb-4">
          Sobre Nós
        </Heading>
        <Text>
          Esta seção tem um ID que pode ser usado para navegação com âncoras.
        </Text>
      </div>
    ),
  },
};

export const WithBackground: Story = {
  args: {
    className: "bg-gray-50",
    children: (
      <div className="text-center">
        <Heading level={2} className="mb-4">
          Seção com Fundo Cinza
        </Heading>
        <Text>Exemplo de seção com background customizado.</Text>
      </div>
    ),
  },
};

export const WithGradientBackground: Story = {
  args: {
    className: "bg-gradient-to-br from-primary/10 to-secondary/10",
    children: (
      <div className="text-center">
        <Heading level={2} className="mb-4">
          Seção com Gradiente
        </Heading>
        <Text>Exemplo de seção com background gradiente.</Text>
      </div>
    ),
  },
};

export const MultipleContentBlocks: Story = {
  args: {
    children: (
      <div className="space-y-8">
        <div className="text-center">
          <Heading level={2} className="mb-4">
            Título Principal
          </Heading>
          <Text variant="large" className="mb-4">
            Subtítulo ou descrição principal da seção.
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heading level={4} className="mb-2">
              Bloco 1
            </Heading>
            <Text variant="small">Conteúdo do primeiro bloco.</Text>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heading level={4} className="mb-2">
              Bloco 2
            </Heading>
            <Text variant="small">Conteúdo do segundo bloco.</Text>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heading level={4} className="mb-2">
              Bloco 3
            </Heading>
            <Text variant="small">Conteúdo do terceiro bloco.</Text>
          </div>
        </div>
      </div>
    ),
  },
};
