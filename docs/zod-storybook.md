# Documentação: Zod + Storybook

Este guia explica como usar Zod para validação de props e Storybook para documentação de componentes no Website Luzamor.

## Índice

- [Visão Geral](#visão-geral)
- [Zod: Validação de Props](#zod-validação-de-props)
- [Storybook: Documentação de Componentes](#storybook-documentação-de-componentes)
- [Padrões e Convenções](#padrões-e-convenções)
- [Como Criar um Novo Componente](#como-criar-um-novo-componente)
- [Comandos Úteis](#comandos-úteis)

## Visão Geral

### Por que Zod + Storybook?

- **Zod**: Validação de schemas TypeScript em runtime, garantindo type-safety e validação de props
- **Storybook**: Ambiente isolado para desenvolver, testar e documentar componentes UI
- **Integração**: Schemas Zod são usados para gerar controles automáticos no Storybook

### Estrutura do Projeto

```
lib/schemas/          # Schemas Zod para validação
  ui.ts              # Schemas dos componentes UI
  index.ts           # Exports centralizados

components/ui/        # Componentes UI
  Button.tsx         # Componente
  Card.tsx
  Typography.tsx
  Section.tsx
  Grid.tsx
  ...

stories/             # Stories do Storybook
  Introduction.mdx   # Página inicial
  ui/                # Stories dos componentes UI
    Button.stories.tsx
    Card.stories.tsx
    Typography.stories.tsx
    ...

.storybook/          # Configuração do Storybook
  main.ts           # Config principal
  preview.ts        # Config de preview (Tailwind, etc)
```

## Zod: Validação de Props

### Criando Schemas

Schemas ficam em `lib/schemas/ui.ts` e seguem este padrão:

```typescript
import { z } from "zod";

// Schema para enum/union types
export const buttonVariantSchema = z.enum([
  "primary",
  "secondary",
  "outline",
  "ghost",
]);

// Schema para props do componente
export const buttonPropsSchema = z.object({
  children: z.any(),
  variant: buttonVariantSchema.default("primary"),
  size: z.enum(["sm", "md", "lg"]).default("md"),
  fullWidth: z.boolean().default(false),
  className: z.string().default(""),
});

// Type inference do Zod
export type ButtonProps = z.infer<typeof buttonPropsSchema>;
```

### Padrões de Schemas

#### 1. Enums e Literais

```typescript
// Para strings específicas
export const sizeSchema = z.enum(["sm", "md", "lg"]);

// Para números específicos
export const headingLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);
```

#### 2. Valores Padrão

```typescript
// Sempre defina valores padrão para props opcionais
variant: z.enum(["primary", "secondary"]).default("primary"),
className: z.string().default(""),
```

#### 3. Props Opcionais

```typescript
// Use .optional() para props que podem ser undefined
href: z.string().optional(),
onClick: z.function().optional(),
```

#### 4. ReactNode / Children

```typescript
// Use z.any() para ReactNode (Zod não suporta JSX)
children: z.any(),
```

### Validando Props em Runtime (Opcional)

```typescript
import { buttonPropsSchema } from "@/lib/schemas";

function Button(props: ButtonProps) {
  // Validar em desenvolvimento
  if (process.env.NODE_ENV === "development") {
    buttonPropsSchema.parse(props);
  }

  // ... resto do componente
}
```

## Storybook: Documentação de Componentes

### Estrutura de uma Story

Stories ficam junto com os componentes: `ComponentName.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { buttonPropsSchema } from "@/lib/schemas";

const meta = {
  title: "UI/Button", // Caminho no menu lateral
  component: Button,
  parameters: {
    layout: "centered", // centered | fullscreen | padded
    docs: {
      description: {
        component: "Descrição do componente",
      },
    },
  },
  tags: ["autodocs"], // Gera documentação automática
  argTypes: {
    variant: {
      control: "select",
      options: buttonPropsSchema.shape.variant._def.values,
      description: "Estilo visual do botão",
    },
    size: {
      control: "select",
      options: buttonPropsSchema.shape.size._def.values,
      description: "Tamanho do botão",
    },
    fullWidth: {
      control: "boolean",
      description: "Ocupa toda a largura disponível",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories individuais
export const Primary: Story = {
  args: {
    children: "Botão Primary",
    variant: "primary",
    size: "md",
  },
};

export const WithArrow: Story = {
  args: {
    children: "Ver Mais",
    variant: "primary",
    showArrow: true,
  },
};
```

### Tipos de Controles

| Tipo      | Controle       | Uso                     |
| --------- | -------------- | ----------------------- |
| `select`  | Dropdown       | Enums, opções limitadas |
| `radio`   | Radio buttons  | Poucas opções (2-5)     |
| `boolean` | Toggle         | true/false              |
| `text`    | Input texto    | Strings livres          |
| `number`  | Input numérico | Números                 |
| `range`   | Slider         | Números com min/max     |
| `color`   | Color picker   | Cores                   |
| `object`  | JSON editor    | Objetos complexos       |
| `array`   | Array editor   | Arrays                  |

### Layouts no Storybook

```typescript
parameters: {
  layout: "centered",  // Componente centralizado (botões, cards pequenos)
  // OU
  layout: "padded",   // Com padding (cards, listas)
  // OU
  layout: "fullscreen", // Sem padding (sections, páginas)
}
```

### Usando Schemas Zod para Controles Automáticos

**Importante**: Devido às limitações do TypeScript com schemas Zod que usam `.default()`, listamos as opções manualmente nos argTypes. Os schemas Zod ainda são úteis para validação em runtime e inferência de tipos.

```typescript
// Defina opções manualmente para melhor compatibilidade TypeScript
argTypes: {
  variant: {
    control: "select",
    options: ["primary", "secondary", "outline"],
    description: "Estilo visual do botão",
  },
}
```

Os schemas Zod continuam sendo valiosos para:

- Validação de props em runtime (desenvolvimento)
- Inferência de tipos TypeScript
- Documentação dos valores aceitos

### Stories Complexas com Render

Para stories que precisam de markup customizado:

```typescript
export const MultipleContentBlocks: Story = {
  render: (args) => (
    <Section {...args}>
      <Heading level={2}>Título</Heading>
      <Text>Conteúdo da seção</Text>
      <Grid cols={3}>
        <Card>Item 1</Card>
        <Card>Item 2</Card>
        <Card>Item 3</Card>
      </Grid>
    </Section>
  ),
};
```

### Ações (Actions)

Para callbacks e eventos:

```typescript
export const WithOnClick: Story = {
  args: {
    children: "Clique Aqui",
    onClick: () => alert("Clicado!"),
  },
};
```

O Storybook captura automaticamente `onClick`, `onChange`, etc. e mostra no painel Actions.

## Padrões e Convenções

### 1. Nomenclatura

```typescript
// Schema do enum/variant
export const buttonVariantSchema = z.enum([...]);

// Schema das props
export const buttonPropsSchema = z.object({...});

// Type inferido
export type ButtonProps = z.infer<typeof buttonPropsSchema>;
```

### 2. Organização de Stories

```typescript
// Estrutura recomendada de stories por componente:

// 1. Variantes principais
export const Primary: Story = {...};
export const Secondary: Story = {...};

// 2. Tamanhos
export const Small: Story = {...};
export const Large: Story = {...};

// 3. Estados especiais
export const WithIcon: Story = {...};
export const Disabled: Story = {...};

// 4. Demonstração completa (opcional)
export const AllVariants: Story = {
  render: () => <div>...</div>
};
```

### 3. Descrições

Sempre adicione descrições úteis:

```typescript
parameters: {
  docs: {
    description: {
      component: "Descrição clara do propósito e uso do componente",
    },
  },
},
argTypes: {
  variant: {
    description: "Descrição específica desta prop",
  },
},
```

### 4. Tags

```typescript
tags: ["autodocs"],        // Gera docs automáticas
// Outras tags úteis:
tags: ["deprecated"],      // Marca como deprecated
tags: ["experimental"],    // Marca como experimental
```

## Como Criar um Novo Componente

### Passo 1: Criar o Componente

```tsx
// components/ui/Badge.tsx
"use client";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  // ... implementação
}
```

### Passo 2: Criar Schema Zod

```typescript
// lib/schemas/ui.ts
export const badgeVariantSchema = z.enum(["default", "primary", "secondary"]);
export const badgeSizeSchema = z.enum(["sm", "md", "lg"]);

export const badgePropsSchema = z.object({
  children: z.any(),
  variant: badgeVariantSchema.default("default"),
  size: badgeSizeSchema.default("md"),
  className: z.string().default(""),
});

export type BadgeProps = z.infer<typeof badgePropsSchema>;
```

### Passo 3: Criar Stories

```tsx
// stories/ui/Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Badge para tags, categorias e status.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary"],
      description: "Variante visual do badge",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

// ... mais stories
```

### Passo 4: Exportar Schema

```typescript
// lib/schemas/index.ts
export * from "./ui";
```

### Passo 5: Atualizar Types do Componente (Opcional)

```tsx
// components/ui/Badge.tsx
import { badgePropsSchema, type BadgeProps } from "@/lib/schemas";

export function Badge(props: BadgeProps) {
  // Validação em dev
  if (process.env.NODE_ENV === "development") {
    badgePropsSchema.parse(props);
  }

  const { children, variant, size, className } = props;
  // ... resto
}
```

## Comandos Úteis

### Executar Storybook

```bash
npm run storybook
```

Abre em: http://localhost:6006

### Build Storybook (Static)

```bash
npm run build-storybook
```

Gera em: `storybook-static/`

### Validar Props com Zod

```typescript
import { buttonPropsSchema } from "@/lib/schemas";

// Parse (throws error se inválido)
const validProps = buttonPropsSchema.parse(props);

// SafeParse (retorna objeto com success/error)
const result = buttonPropsSchema.safeParse(props);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Boas Práticas

### ✅ Fazer

- Sempre criar schema Zod para componentes UI reutilizáveis
- Usar schemas para gerar controles automáticos no Storybook
- Adicionar descrições claras em argTypes
- Criar múltiplas stories mostrando diferentes casos de uso
- Usar valores padrão nos schemas
- Organizar stories por categoria (UI/, Home/, Templates/, etc)

### ❌ Evitar

- Criar schemas para componentes muito simples (wrappers de div)
- Duplicar opções manualmente (use `schema.shape.prop._def.values`)
- Stories sem descrição ou contexto
- Validação de props em produção (impacto no performance)
- Schemas muito complexos ou aninhados desnecessariamente

## Exemplos Práticos

### Componente com Array de Objetos

```typescript
// Schema
export const accordionItemSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const accordionPropsSchema = z.object({
  items: z.array(accordionItemSchema),
  className: z.string().default(""),
});

// Story
export const Default: Story = {
  args: {
    items: [
      { title: "Item 1", content: "Conteúdo 1" },
      { title: "Item 2", content: "Conteúdo 2" },
    ],
  },
};
```

### Componente com União de Types

```typescript
export const buttonActionSchema = z.union([
  z.object({ type: z.literal("link"), href: z.string() }),
  z.object({ type: z.literal("button"), onClick: z.function() }),
]);
```

### Componente com Refs

```typescript
// Zod não valida refs bem, use z.any()
export const inputPropsSchema = z.object({
  ref: z.any().optional(),
  value: z.string(),
});
```

## Recursos Adicionais

- [Documentação Zod](https://zod.dev/)
- [Documentação Storybook](https://storybook.js.org/)
- [Storybook + Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [TypeScript + Zod](https://zod.dev/?id=type-inference)

## Próximos Passos

1. Adicionar testes com Vitest (já configurado)
2. Configurar visual regression testing com Chromatic
3. Criar documentação MDX customizada
4. Adicionar addon de acessibilidade (a11y) - já instalado

---

**Mantido por**: Fundação Luzamor  
**Última atualização**: Fevereiro 2026
