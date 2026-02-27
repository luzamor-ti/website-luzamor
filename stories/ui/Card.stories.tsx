import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Typography";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de card reutilizável com animações. Usado para criar cards com bordas, sombras e efeitos hover.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Espaçamento interno do card",
    },
    hover: {
      control: "boolean",
      description: "Ativa efeito hover com sombra",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: "md",
    hover: true,
    children: (
      <div>
        <Heading level={3} className="mb-2">
          Título do Card
        </Heading>
        <Text>
          Este é um exemplo de card com conteúdo de texto. Você pode adicionar
          qualquer conteúdo aqui.
        </Text>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
    hover: true,
    children: (
      <div>
        <Heading level={4} className="mb-2">
          Card Compacto
        </Heading>
        <Text variant="small">Padding pequeno para cards mais compactos.</Text>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    hover: true,
    children: (
      <div>
        <Heading level={3} className="mb-3">
          Card Espaçoso
        </Heading>
        <Text>Padding grande para cards com mais espaço interno.</Text>
      </div>
    ),
  },
};

export const NoHover: Story = {
  args: {
    padding: "md",
    hover: false,
    children: (
      <div>
        <Heading level={3} className="mb-2">
          Sem Efeito Hover
        </Heading>
        <Text>Este card não tem efeito hover ativado.</Text>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    padding: "md",
    hover: true,
    children: (
      <div>
        <div className="aspect-video bg-gradient-to-br from-primary to-secondary rounded-lg mb-4" />
        <Heading level={4} className="mb-2">
          Card com Imagem
        </Heading>
        <Text variant="small">
          Exemplo de card com imagem simulada no topo.
        </Text>
      </div>
    ),
  },
};

export const ProjectCard: Story = {
  args: {
    padding: "md",
    hover: true,
    children: (
      <div>
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4" />
        <Heading level={4} className="mb-2 text-gray-900">
          Projeto Exemplo
        </Heading>
        <Text className="mb-4">
          Descrição de um projeto da fundação. Este é um exemplo de como o card
          pode ser usado para exibir projetos.
        </Text>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Educação
          </span>
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            2024
          </span>
        </div>
      </div>
    ),
  },
};
