import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de botão reutilizável com múltiplas variantes e tamanhos. Suporta links internos/externos e animações.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description: "Estilo visual do botão",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do botão",
    },
    fullWidth: {
      control: "boolean",
      description: "Ocupa toda a largura disponível",
    },
    showArrow: {
      control: "boolean",
      description: "Exibe ícone de seta à direita",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Botão Primary",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Botão Secondary",
    variant: "secondary",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Botão Outline",
    variant: "outline",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Botão Ghost",
    variant: "ghost",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "Botão Pequeno",
    variant: "primary",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Botão Grande",
    variant: "primary",
    size: "lg",
  },
};

export const WithArrow: Story = {
  args: {
    children: "Ver Mais",
    variant: "primary",
    size: "md",
    showArrow: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Botão Largura Total",
    variant: "primary",
    size: "md",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const AsLink: Story = {
  args: {
    children: "Link para Homepage",
    variant: "primary",
    size: "md",
    href: "/",
  },
};

export const WithOnClick: Story = {
  args: {
    children: "Clique Aqui",
    variant: "secondary",
    size: "md",
    onClick: () => alert("Botão clicado!"),
  },
};
