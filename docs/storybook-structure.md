# Estrutura do Projeto - Storybook

## 📁 Nova Organização

```
website-luzamor/
│
├── components/
│   └── ui/                    # ✅ APENAS componentes
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Grid.tsx
│       ├── Typography.tsx
│       ├── Section.tsx
│       └── ...
│
├── stories/                   # ✅ TODAS as stories aqui
│   ├── Welcome.mdx            # Página inicial do Storybook
│   ├── README.md              # Guia de organização
│   └── ui/                    # Stories dos componentes UI
│       ├── Button.stories.tsx
│       ├── Card.stories.tsx
│       ├── Grid.stories.tsx
│       ├── Heading.stories.tsx
│       ├── Section.stories.tsx
│       └── Text.stories.tsx
│
├── lib/
│   └── schemas/               # Schemas Zod
│       ├── ui.ts
│       └── index.ts
│
├── .storybook/                # Configuração
│   ├── main.ts
│   └── preview.ts
│
└── docs/
    └── zod-storybook.md       # Documentação completa
```

## 🎯 Benefícios da Reorganização

### Antes ❌

```
components/ui/
├── Button.tsx
├── Button.stories.tsx        # Misturado com componente
├── Card.tsx
├── Card.stories.tsx          # Misturado com componente
└── ...                       # Pasta bagunçada
```

**Problemas:**

- Pasta `components/ui/` misturada com código e documentação
- Difícil de navegar
- Confusão sobre responsabilidades

### Depois ✅

```
components/ui/                 # APENAS componentes
├── Button.tsx
├── Card.tsx
└── ...

stories/ui/                    # APENAS documentação
├── Button.stories.tsx
├── Card.stories.tsx
└── ...
```

**Vantagens:**

- Separação clara de responsabilidades
- Pasta de componentes limpa e focada
- Fácil de escalar (adicionar categorias de stories)
- Melhor organização do Storybook

## 📝 Padrões de Import

### Stories importam componentes com path absoluto:

```tsx
// stories/ui/Button.stories.tsx
import { Button } from "@/components/ui/Button";
```

### Componentes continuam normalmente:

```tsx
// components/home/HeroSection.tsx
import { Button } from "@/components/ui";
```

## 🗂️ Expansão Futura

Estrutura preparada para crescer:

```
stories/
├── Welcome.mdx
├── ui/                       # Componentes base
│   └── *.stories.tsx
├── home/                     # Seções da home (futuro)
│   ├── HeroSection.stories.tsx
│   └── ProjectsSection.stories.tsx
└── templates/                # Templates de páginas (futuro)
    ├── ProjetosTemplate.stories.tsx
    └── SobreNosTemplate.stories.tsx
```

## 🚀 Comandos

```bash
# Storybook em desenvolvimento
npm run storybook

# Build estático do Storybook
npm run build-storybook
```

## 📚 Documentação

- `stories/README.md` - Guia de organização das stories
- `docs/zod-storybook.md` - Guia completo de Zod + Storybook
- `docs/componentes.md` - Guia de componentes do projeto

---

**Organização concluída em**: Fevereiro 2026
