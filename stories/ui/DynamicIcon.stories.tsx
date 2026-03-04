import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

const meta = {
  title: "UI/DynamicIcon",
  component: DynamicIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "Heart",
        "Users",
        "Award",
        "Target",
        "TrendingUp",
        "DollarSign",
        "Clock",
        "Handshake",
        "GraduationCap",
        "MessageCircle",
        "Mail",
        "Phone",
        "MapPin",
        "Calendar",
        "CheckCircle",
        "Star",
        "Sparkles",
        "Zap",
        "Eye",
        "Book",
        "Music",
        "Palette",
        "Globe",
        "Shield",
        "Leaf",
        "Sun",
        "Moon",
        "Cloud",
        "Umbrella",
        "Camera",
      ],
      description: "Nome do ícone Lucide a ser renderizado",
    },
    size: {
      control: { type: "range", min: 16, max: 128, step: 8 },
      description: "Tamanho do ícone em pixels",
    },
    color: {
      control: "color",
      description: "Cor do ícone",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 4, step: 0.5 },
      description: "Espessura do traço",
    },
  },
} satisfies Meta<typeof DynamicIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Heart",
    size: 24,
  },
};

export const Primary: Story = {
  args: {
    name: "Users",
    size: 32,
    color: "var(--color-primary)",
  },
};

export const Large: Story = {
  args: {
    name: "Award",
    size: 64,
    strokeWidth: 2,
  },
};

export const Small: Story = {
  args: {
    name: "Star",
    size: 16,
    strokeWidth: 1.5,
  },
};

export const CustomColor: Story = {
  args: {
    name: "Heart",
    size: 48,
    color: "#e74c3c",
    strokeWidth: 2.5,
  },
};

export const IconGrid: Story = {
  args: {
    name: "Heart",
  },
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      {[
        "Heart",
        "Users",
        "Award",
        "Target",
        "TrendingUp",
        "DollarSign",
        "Clock",
        "Handshake",
        "GraduationCap",
        "MessageCircle",
        "Mail",
        "Phone",
        "MapPin",
        "Calendar",
        "CheckCircle",
        "Star",
        "Sparkles",
        "Zap",
        "Eye",
        "Book",
        "Music",
        "Palette",
        "Globe",
        "Shield",
      ].map((icon) => (
        <div
          key={icon}
          className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <DynamicIcon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};
