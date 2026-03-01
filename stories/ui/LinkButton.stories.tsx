import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkButton } from "@/components/ui/LinkButton";

const meta = {
  title: "UI/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "URL de destino do link",
    },
    children: {
      control: "text",
      description: "Texto do botão",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/sobre-nos",
    children: "Saiba mais",
  },
};

export const Projetos: Story = {
  args: {
    href: "/projetos",
    children: "Ver todos os projetos",
  },
};

export const Contato: Story = {
  args: {
    href: "/contato",
    children: "Entre em contato",
  },
};

export const Cursos: Story = {
  args: {
    href: "/cursos",
    children: "Conheça nossos cursos",
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    children: "Visite nosso site externo",
  },
};

export const LongText: Story = {
  args: {
    href: "/",
    children: "Descubra como você pode fazer a diferença",
  },
};

export const Multiple: Story = {
  args: {
    href: "/sobre-nos",
    children: "Sobre nós",
  },
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <LinkButton href="/sobre-nos">Sobre nós</LinkButton>
      <LinkButton href="/projetos">Nossos projetos</LinkButton>
      <LinkButton href="/cursos">Cursos disponíveis</LinkButton>
      <LinkButton href="/contato">Fale conosco</LinkButton>
    </div>
  ),
};
