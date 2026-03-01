import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "@/components/ui/Icon";
import {
  Heart,
  Users,
  Award,
  Star,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 16, max: 128, step: 8 },
      description: "Tamanho do ícone em pixels",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Heart,
    size: 24,
  },
};

export const Small: Story = {
  args: {
    icon: Star,
    size: 16,
  },
};

export const Medium: Story = {
  args: {
    icon: Award,
    size: 32,
  },
};

export const Large: Story = {
  args: {
    icon: Users,
    size: 64,
  },
};

export const WithColor: Story = {
  args: {
    icon: Heart,
    size: 48,
    className: "text-red-500",
  },
};

export const Primary: Story = {
  args: {
    icon: TrendingUp,
    size: 32,
    className: "text-primary",
  },
};

export const IconCollection: Story = {
  args: {
    icon: Heart,
  },
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size={32} className="text-red-500" />
        <span className="text-xs text-gray-600">Heart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Users} size={32} className="text-blue-500" />
        <span className="text-xs text-gray-600">Users</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Award} size={32} className="text-yellow-500" />
        <span className="text-xs text-gray-600">Award</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size={32} className="text-purple-500" />
        <span className="text-xs text-gray-600">Star</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={TrendingUp} size={32} className="text-green-500" />
        <span className="text-xs text-gray-600">Trending Up</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Calendar} size={32} className="text-indigo-500" />
        <span className="text-xs text-gray-600">Calendar</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Mail} size={32} className="text-orange-500" />
        <span className="text-xs text-gray-600">Mail</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Phone} size={32} className="text-pink-500" />
        <span className="text-xs text-gray-600">Phone</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={MapPin} size={32} className="text-teal-500" />
        <span className="text-xs text-gray-600">Map Pin</span>
      </div>
    </div>
  ),
};
