import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Accordion } from "@/components/ui/Accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "Array de itens do accordion com id, title e content",
    },
    allowMultiple: {
      control: "boolean",
      description: "Permite múltiplos itens abertos simultaneamente",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    id: "1",
    title: "O que é a Fundação Luzamor?",
    content:
      "A Fundação Luzamor é uma organização sem fins lucrativos dedicada à transformação social através da educação, cultura e apoio comunitário.",
  },
  {
    id: "2",
    title: "Como posso me tornar um voluntário?",
    content:
      "Para se tornar um voluntário, você pode entrar em contato conosco através do formulário de contato ou nos enviar um e-mail. Nossa equipe entrará em contato para discutir as oportunidades disponíveis.",
  },
  {
    id: "3",
    title: "Quais tipos de doações vocês aceitam?",
    content:
      "Aceitamos doações financeiras, materiais educativos, equipamentos e também doações recorrentes. Entre em contato para saber mais sobre como você pode contribuir.",
  },
  {
    id: "4",
    title: "Onde a Fundação atua?",
    content:
      "A Fundação Luzamor atua principalmente em comunidades do Brasil, focando em áreas que necessitam de apoio educacional e cultural.",
  },
];

const longContentItems = [
  {
    id: "1",
    title: "Nossa História",
    content: (
      <div className="space-y-3">
        <p>
          A Fundação Luzamor foi fundada em 2010 com o objetivo de transformar
          vidas através da educação e cultura.
        </p>
        <p>
          Ao longo dos anos, já impactamos mais de 10.000 pessoas com nossos
          projetos sociais, oferecendo cursos, eventos culturais e apoio
          comunitário.
        </p>
        <p>
          Nossa missão é criar um futuro melhor para as próximas gerações,
          promovendo acesso igualitário à educação de qualidade.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    title: "Nossos Projetos",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Cursos de capacitação profissional</li>
        <li>Eventos culturais e artísticos</li>
        <li>Apoio educacional para jovens</li>
        <li>Programas de mentoria</li>
        <li>Oficinas criativas e workshops</li>
      </ul>
    ),
  },
];

export const Default: Story = {
  args: {
    items: faqItems,
    allowMultiple: false,
  },
};

export const AllowMultiple: Story = {
  args: {
    items: faqItems,
    allowMultiple: true,
  },
};

export const WithRichContent: Story = {
  args: {
    items: longContentItems,
    allowMultiple: false,
  },
};

export const SingleItem: Story = {
  args: {
    items: [faqItems[0]],
    allowMultiple: false,
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...faqItems,
      {
        id: "5",
        title: "Como posso fazer uma doação?",
        content:
          "Você pode fazer doações através do nosso site, transferência bancária ou PIX. Entre em contato para mais informações.",
      },
      {
        id: "6",
        title: "A Fundação oferece cursos gratuitos?",
        content:
          "Sim! Oferecemos diversos cursos gratuitos nas áreas de educação, arte e cultura. Consulte nossa página de cursos para ver as opções disponíveis.",
      },
      {
        id: "7",
        title: "Vocês têm transparência nas contas?",
        content:
          "Sim, publicamos relatórios de prestação de contas regularmente para garantir total transparência com nossos apoiadores e a comunidade.",
      },
    ],
    allowMultiple: true,
  },
};
