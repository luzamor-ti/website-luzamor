import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "@/components/ui/Typography";

const meta = {
  title: "UI/Typography/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de título com níveis e estilos predefinidos. Usa tags semânticas (h1-h6) com classes de estilo consistentes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
      description: "Nível do heading (h1-h6)",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: {
    children: "Heading Nível 1",
    level: 1,
  },
};

export const Level2: Story = {
  args: {
    children: "Heading Nível 2",
    level: 2,
  },
};

export const Level3: Story = {
  args: {
    children: "Heading Nível 3",
    level: 3,
  },
};

export const Level4: Story = {
  args: {
    children: "Heading Nível 4",
    level: 4,
  },
};

export const Level5: Story = {
  args: {
    children: "Heading Nível 5",
    level: 5,
  },
};

export const Level6: Story = {
  args: {
    children: "Heading Nível 6",
    level: 6,
  },
};

export const WithGradient: Story = {
  args: {
    children: "Título com Gradiente",
    level: 2,
    className:
      "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  },
};

export const Colored: Story = {
  args: {
    children: "Título Colorido",
    level: 2,
    className: "text-primary",
  },
};

export const AllLevels: Story = {
  args: {
    children: "Example",
  },
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
