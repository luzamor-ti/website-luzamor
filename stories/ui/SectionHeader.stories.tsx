import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeader } from "@/components/ui/SectionHeader";

const meta = {
  title: "UI/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    tag: {
      control: "text",
      description: "Tag/categoria da seção (ex: 'Projetos', 'Sobre Nós')",
    },
    title: {
      control: "text",
      description: "Título principal da seção",
    },
    description: {
      control: "text",
      description: "Descrição da seção",
    },
    align: {
      control: "select",
      options: ["left", "center"],
      description: "Alinhamento do conteúdo",
    },
    variant: {
      control: "select",
      options: ["light", "dark"],
      description:
        "Variante de cor (light para fundo claro, dark para fundo escuro)",
    },
    layout: {
      control: "select",
      options: ["default", "split"],
      description:
        "Layout da seção (default: vertical, split: tag+título à esquerda, descrição à direita)",
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tag: "nossos projetos",
    title: "Transformando Vidas Através da Educação",
    description:
      "Conheça os projetos sociais que estão fazendo a diferença na vida de milhares de pessoas em todo o Brasil.",
    align: "left",
    variant: "light",
    layout: "default",
  },
};

export const CenterAligned: Story = {
  args: {
    tag: "eventos",
    title: "Próximos Eventos",
    description:
      "Participe dos nossos eventos culturais e educacionais. Uma oportunidade única de aprendizado e conexão.",
    align: "center",
    variant: "light",
    layout: "default",
  },
};

export const SplitLayout: Story = {
  args: {
    tag: "sobre nós",
    title: "Nossa História",
    description:
      "Desde 2010, trabalhamos para criar um futuro melhor através da educação de qualidade e acesso à cultura.",
    align: "left",
    variant: "light",
    layout: "split",
  },
};

export const DarkVariant: Story = {
  args: {
    tag: "impacto",
    title: "Nosso Impacto Social",
    description:
      "Números que mostram a transformação que estamos criando nas comunidades.",
    align: "left",
    variant: "dark",
    layout: "default",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const DarkSplit: Story = {
  args: {
    tag: "cursos",
    title: "Capacitação Profissional",
    description:
      "Oferecemos cursos gratuitos de alta qualidade para desenvolvimento pessoal e profissional.",
    align: "left",
    variant: "dark",
    layout: "split",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const NoTag: Story = {
  args: {
    title: "Perguntas Frequentes",
    description:
      "Encontre respostas para as dúvidas mais comuns sobre a Fundação Luzamor.",
    align: "center",
    variant: "light",
    layout: "default",
  },
};

export const NoDescription: Story = {
  args: {
    tag: "equipe",
    title: "Conheça Nossa Equipe",
    align: "left",
    variant: "light",
    layout: "default",
  },
};

export const LongTitle: Story = {
  args: {
    tag: "nossa missão",
    title:
      "Juntos, Construímos um Futuro Melhor Através da Educação e Cultura para Todos",
    description:
      "Acreditamos que a educação é a chave para transformar realidades e criar oportunidades iguais para todas as pessoas.",
    align: "center",
    variant: "light",
    layout: "default",
  },
};
