import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid } from "@/components/ui/Grid";
import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Typography";

const meta = {
  title: "UI/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grid responsivo com animação. Componente para layouts em grade com diferentes quantidades de colunas e espaçamentos.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4],
      description: "Número de colunas no grid",
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Espaçamento entre itens do grid",
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleCard = ({ title, index }: { title: string; index: number }) => (
  <Card>
    <div className="aspect-square bg-gradient-to-br from-primary to-secondary rounded-lg mb-3 flex items-center justify-center text-white text-4xl font-bold">
      {index}
    </div>
    <Heading level={5} className="mb-2">
      {title}
    </Heading>
    <Text variant="small">Exemplo de card no grid.</Text>
  </Card>
);

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <SampleCard title="Item 1" index={1} />
        <SampleCard title="Item 2" index={2} />
        <SampleCard title="Item 3" index={3} />
        <SampleCard title="Item 4" index={4} />
        <SampleCard title="Item 5" index={5} />
        <SampleCard title="Item 6" index={6} />
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: "md",
    children: (
      <>
        <SampleCard title="Item 1" index={1} />
        <SampleCard title="Item 2" index={2} />
        <SampleCard title="Item 3" index={3} />
        <SampleCard title="Item 4" index={4} />
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: "md",
    children: (
      <>
        <SampleCard title="Item 1" index={1} />
        <SampleCard title="Item 2" index={2} />
        <SampleCard title="Item 3" index={3} />
        <SampleCard title="Item 4" index={4} />
        <SampleCard title="Item 5" index={5} />
        <SampleCard title="Item 6" index={6} />
        <SampleCard title="Item 7" index={7} />
        <SampleCard title="Item 8" index={8} />
      </>
    ),
  },
};

export const SmallGap: Story = {
  args: {
    cols: 3,
    gap: "sm",
    children: (
      <>
        <SampleCard title="Item 1" index={1} />
        <SampleCard title="Item 2" index={2} />
        <SampleCard title="Item 3" index={3} />
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: {
    cols: 3,
    gap: "lg",
    children: (
      <>
        <SampleCard title="Item 1" index={1} />
        <SampleCard title="Item 2" index={2} />
        <SampleCard title="Item 3" index={3} />
      </>
    ),
  },
};

export const SingleColumn: Story = {
  args: {
    cols: 1,
    gap: "md",
    children: (
      <>
        <Card>
          <Heading level={4} className="mb-2">
            Item em Coluna Única
          </Heading>
          <Text>
            Este grid usa apenas uma coluna, útil para layouts de lista ou
            mobile-first.
          </Text>
        </Card>
        <Card>
          <Heading level={4} className="mb-2">
            Segundo Item
          </Heading>
          <Text>Outro item na coluna única.</Text>
        </Card>
      </>
    ),
  },
};

export const MixedContent: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <Card padding="lg">
          <Heading level={4} className="mb-3">
            Card Grande
          </Heading>
          <Text>Card com mais padding e conteúdo.</Text>
        </Card>
        <Card padding="sm">
          <Heading level={5} className="mb-2">
            Card Compacto
          </Heading>
          <Text variant="small">Card com menos padding.</Text>
        </Card>
        <Card hover={false}>
          <Heading level={5} className="mb-2">
            Sem Hover
          </Heading>
          <Text variant="small">Card sem efeito hover.</Text>
        </Card>
      </>
    ),
  },
};
