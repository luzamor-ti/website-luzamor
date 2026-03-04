import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Ticker } from "@/components/ui/Ticker";

const meta = {
  title: "UI/Ticker",
  component: Ticker,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
      description: "Velocidade da animação",
    },
    direction: {
      control: "select",
      options: ["left", "right"],
      description: "Direção do movimento",
    },
    pauseOnHover: {
      control: "boolean",
      description: "Pausa a animação ao passar o mouse",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof Ticker>;

export default meta;
type Story = StoryObj<typeof meta>;

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center w-32 h-16 bg-gray-100 rounded-lg border border-gray-200">
    <span className="text-sm font-medium text-gray-500">{name}</span>
  </div>
);

export const Default: Story = {
  args: {
    speed: "normal",
    direction: "left",
    pauseOnHover: true,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
        <LogoPlaceholder name="Logo 3" />
        <LogoPlaceholder name="Logo 4" />
        <LogoPlaceholder name="Logo 5" />
      </>
    ),
  },
};

export const Fast: Story = {
  args: {
    speed: "fast",
    direction: "left",
    pauseOnHover: true,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
        <LogoPlaceholder name="Logo 3" />
        <LogoPlaceholder name="Logo 4" />
        <LogoPlaceholder name="Logo 5" />
      </>
    ),
  },
};

export const Slow: Story = {
  args: {
    speed: "slow",
    direction: "left",
    pauseOnHover: true,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
        <LogoPlaceholder name="Logo 3" />
        <LogoPlaceholder name="Logo 4" />
        <LogoPlaceholder name="Logo 5" />
      </>
    ),
  },
};

export const RightDirection: Story = {
  args: {
    speed: "normal",
    direction: "right",
    pauseOnHover: true,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
        <LogoPlaceholder name="Logo 3" />
        <LogoPlaceholder name="Logo 4" />
        <LogoPlaceholder name="Logo 5" />
      </>
    ),
  },
};

export const NoPauseOnHover: Story = {
  args: {
    speed: "normal",
    direction: "left",
    pauseOnHover: false,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
        <LogoPlaceholder name="Logo 3" />
        <LogoPlaceholder name="Logo 4" />
        <LogoPlaceholder name="Logo 5" />
      </>
    ),
  },
};

export const FewItems: Story = {
  args: {
    speed: "normal",
    direction: "left",
    pauseOnHover: true,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
      </>
    ),
  },
};

export const ManyItems: Story = {
  args: {
    speed: "normal",
    direction: "left",
    pauseOnHover: true,
    children: (
      <>
        <LogoPlaceholder name="Logo 1" />
        <LogoPlaceholder name="Logo 2" />
        <LogoPlaceholder name="Logo 3" />
        <LogoPlaceholder name="Logo 4" />
        <LogoPlaceholder name="Logo 5" />
        <LogoPlaceholder name="Logo 6" />
        <LogoPlaceholder name="Logo 7" />
        <LogoPlaceholder name="Logo 8" />
        <LogoPlaceholder name="Logo 9" />
        <LogoPlaceholder name="Logo 10" />
      </>
    ),
  },
};

export const WithBadges: Story = {
  args: {
    speed: "normal",
    direction: "left",
    pauseOnHover: true,
    children: (
      <>
        <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap">
          ⭐ Certificado ISO
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium whitespace-nowrap">
          ✓ Verificado
        </div>
        <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium whitespace-nowrap">
          🏆 Prêmio 2023
        </div>
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium whitespace-nowrap">
          🌟 Top Rated
        </div>
        <div className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium whitespace-nowrap">
          💯 100% Confiável
        </div>
      </>
    ),
  },
};
