import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionFooter } from "@/components/ui/SectionFooter";

const meta = {
  title: "UI/SectionFooter",
  component: SectionFooter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "Texto descritivo do footer",
    },
    linkText: {
      control: "text",
      description: "Texto do link",
    },
    linkHref: {
      control: "text",
      description: "URL do link",
    },
    showLink: {
      control: "boolean",
      description: "Mostra ou esconde o link",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof SectionFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Conheça todos os nossos projetos sociais e descubra como você pode fazer parte dessa transformação.",
    linkText: "Ver todos os projetos",
    linkHref: "/projetos",
    showLink: true,
  },
};

export const Events: Story = {
  args: {
    text: "Participe dos nossos eventos e workshops. Uma oportunidade única de aprendizado e networking.",
    linkText: "Ver agenda completa",
    linkHref: "/eventos",
    showLink: true,
  },
};

export const Courses: Story = {
  args: {
    text: "Oferecemos cursos gratuitos de capacitação profissional em diversas áreas. Invista no seu futuro!",
    linkText: "Conheça os cursos",
    linkHref: "/cursos",
    showLink: true,
  },
};

export const HowToHelp: Story = {
  args: {
    text: "Sua contribuição faz toda a diferença. Descubra as diferentes formas de apoiar nossos projetos.",
    linkText: "Saiba como ajudar",
    linkHref: "/como-ajudar",
    showLink: true,
  },
};

export const WithoutLink: Story = {
  args: {
    text: "Agradecemos a todos os nossos apoiadores e parceiros que tornam esse trabalho possível.",
    showLink: false,
  },
};

export const LongText: Story = {
  args: {
    text: "Desde 2010, a Fundação Luzamor tem se dedicado a transformar vidas através da educação de qualidade, cultura e apoio comunitário. Nossos projetos alcançam milhares de pessoas todos os anos.",
    linkText: "Conheça nossa história",
    linkHref: "/sobre-nos",
    showLink: true,
  },
};

export const ShortText: Story = {
  args: {
    text: "Fique por dentro das novidades!",
    linkText: "Ver mais",
    linkHref: "/novidades",
    showLink: true,
  },
};

export const WithCustomClassName: Story = {
  args: {
    text: "Este footer tem espaçamento customizado para casos especiais.",
    linkText: "Explorar",
    linkHref: "/explorar",
    showLink: true,
    className: "mt-8 pt-16",
  },
};
