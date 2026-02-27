import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "@/components/ui/Typography";

const meta = {
  title: "UI/Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de texto com variantes predefinidas. Oferece estilos consistentes para diferentes tipos de conteúdo textual.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["body", "small", "large", "muted"],
      description: "Variante de estilo do texto",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    children:
      "Este é um texto de corpo padrão. Use esta variante para o texto principal do conteúdo.",
    variant: "body",
  },
};

export const Small: Story = {
  args: {
    children:
      "Este é um texto pequeno. Ideal para legendas, metadados ou texto secundário.",
    variant: "small",
  },
};

export const Large: Story = {
  args: {
    children:
      "Este é um texto grande. Use para destacar parágrafos importantes ou introduções.",
    variant: "large",
  },
};

export const Muted: Story = {
  args: {
    children:
      "Este é um texto esmaecido. Perfeito para informações secundárias ou de suporte.",
    variant: "muted",
  },
};

export const AllVariants: Story = {
  args: {
    children: "Example",
  },
  render: () => (
    <div className="space-y-4 max-w-lg">
      <div>
        <Text variant="large">
          <strong>Large:</strong> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Text>
      </div>
      <div>
        <Text variant="body">
          <strong>Body:</strong> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>
      <div>
        <Text variant="small">
          <strong>Small:</strong> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Text>
      </div>
      <div>
        <Text variant="muted">
          <strong>Muted:</strong> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Texto com classe customizada",
    variant: "body",
    className: "text-primary font-bold",
  },
};

export const Paragraph: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    variant: "body",
  },
  parameters: {
    layout: "padded",
  },
};
