# Stories - Documentação Storybook

Esta pasta contém todas as stories do Storybook para o projeto Website Luzamor.

## 📁 Estrutura

```
stories/
├── Welcome.mdx             # Página inicial do Storybook
└── ui/                     # Stories dos componentes UI
    ├── Button.stories.tsx
    ├── Card.stories.tsx
    ├── Grid.stories.tsx
    ├── Heading.stories.tsx
    ├── Section.stories.tsx
    └── Text.stories.tsx
```

## 🎯 Organização

### Por que separar stories dos componentes?

1. **Separação de Responsabilidades**: Componentes ficam focados na lógica e apresentação, stories ficam focadas em documentação
2. **Limpeza**: Pasta `components/ui/` mais limpa e fácil de navegar
3. **Escalabilidade**: Fácil adicionar mais categorias de stories (home, templates, etc)

### Estrutura de Pastas

- **`stories/`**: Pasta raiz para documentação do Storybook
  - **`Welcome.mdx`**: Página de boas-vindas e orientações
  - **`ui/`**: Stories de componentes UI básicos
    - Cada arquivo `*.stories.tsx` documenta um componente
    - Importa componentes de `@/components/ui/`

## 📝 Convenções

### Nomenclatura

- Arquivos de stories: `ComponentName.stories.tsx`
- Título no Storybook: `UI/ComponentName`
- Stories individuais: `PascalCase` (ex: `Primary`, `WithArrow`, `AllVariants`)

### Imports

Sempre use path absoluto para importar componentes:

```tsx
// ✅ Correto
import { Button } from "@/components/ui/Button";

// ❌ Evitar
import { Button } from "../../components/ui/Button";
```

### Estrutura de uma Story

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentName } from "@/components/ui/ComponentName";

const meta = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered", // ou "padded" ou "fullscreen"
    docs: {
      description: {
        component: "Descrição clara do componente",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Controles para props
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories exportadas
export const Default: Story = { ... };
export const Variant: Story = { ... };
```

## 🚀 Como Adicionar uma Nova Story

### Para Componente UI

1. Crie o arquivo em `stories/ui/ComponentName.stories.tsx`
2. Importe o componente de `@/components/ui/`
3. Use `title: "UI/ComponentName"`
4. Siga a estrutura padrão acima

### Para Nova Categoria

Se precisar de uma nova categoria (ex: templates, home):

1. Crie uma pasta: `stories/nome-categoria/`
2. Adicione stories nela
3. Use `title: "Nome Categoria/ComponentName"`

Exemplo:

```
stories/
├── ui/                    # title: "UI/..."
├── templates/             # title: "Templates/..."
│   └── ProjectTemplate.stories.tsx
└── home/                  # title: "Home/..."
    └── HeroSection.stories.tsx
```

## 📚 Recursos

- [Documentação Completa](../docs/zod-storybook.md) - Guia detalhado de Zod + Storybook
- [Storybook Docs](https://storybook.js.org/) - Documentação oficial
- [Component Guide](../docs/componentes.md) - Guia de componentes do projeto

## 🔍 Executando Storybook

```bash
# Desenvolvimento
npm run storybook

# Build estático
npm run build-storybook
```

Acesse: http://localhost:6006

---

**Mantido por**: Fundação Luzamor  
**Última atualização**: Fevereiro 2026
