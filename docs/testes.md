# Guia de Testes - Website Luzamor

## Visão Geral

Este projeto utiliza **Vitest** como framework de testes, com **React Testing Library** para testes de componentes React. A configuração suporta dois tipos de testes:

1. **Testes Unitários** - Testes dos componentes da aplicação
2. **Testes do Storybook** - Testes visuais integrados com Storybook

## Estrutura de Testes

```
components/
├── ui/
│   ├── __tests__/
│   │   ├── Button.test.tsx
│   │   ├── Card.test.tsx
│   │   ├── Grid.test.tsx
│   │   ├── Section.test.tsx
│   │   ├── SectionHeader.test.tsx
│   │   └── Typography.test.tsx
│   └── ...
├── home/
│   ├── __tests__/
│   │   ├── HeroSection.test.tsx
│   │   └── ProjectsSection.test.tsx
│   └── ...
└── about/
    ├── __tests__/
    │   ├── AboutHeroSection.test.tsx
    │   └── AboutImpactsSection.test.tsx
    └── ...
```

## Comandos de Teste

### Executar testes unitários

```bash
npm test
```

### Executar testes em modo watch

```bash
npm run test:watch
```

### Executar testes com interface visual

```bash
npm run test:ui
```

### Gerar relatório de cobertura

```bash
npm run test:coverage
```

### Executar testes do Storybook

```bash
npm run test:storybook
```

### Executar todos os testes (unit + storybook)

```bash
npm run test:all
```

## Configuração

### Arquivos de Configuração

- **vitest.config.ts** - Configuração principal do Vitest
- **vitest.setup.ts** - Setup global dos testes (mocks, configurações)
- **vitest.shims.d.ts** - Tipos TypeScript para Vitest

### Mocks Globais

O arquivo `vitest.setup.ts` configura os seguintes mocks globais:

1. **Next.js Navigation** - Mock de `useRouter`, `usePathname`, `useSearchParams`
2. **Sanity Image** - Mock de `urlFor` para URLs de imagens
3. **Framer Motion** - Mock de componentes `motion.*` para evitar problemas de animação
4. **Portable Text** - Mock do componente `PortableText` do Sanity

## Escrevendo Testes

### Estrutura Básica de um Teste

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<MyComponent className="custom-class" />);
    const element = screen.getByText("Expected Text");
    expect(element).toHaveClass("custom-class");
  });
});
```

### Testando Componentes com Props

```tsx
it("renders with different variants", () => {
  const { rerender } = render(<Button variant="primary">Button</Button>);
  const button = screen.getByText("Button").closest("button");
  expect(button).toHaveClass("bg-primary");

  rerender(<Button variant="secondary">Button</Button>);
  expect(button).toHaveClass("bg-secondary");
});
```

### Testando Interações de Usuário

```tsx
import userEvent from "@testing-library/user-event";

it("calls onClick when clicked", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testando Componentes com Dados do Sanity

```tsx
const mockData = {
  _id: "1",
  _type: "projeto",
  title: "Test Project",
  description: "Test Description",
};

it("renders project data", () => {
  render(<ProjectCard data={mockData} />);
  expect(screen.getByText("Test Project")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
});
```

## Boas Práticas

### 1. Use queries semânticas

```tsx
// ✅ Bom - usa role
screen.getByRole("button", { name: "Submit" });

// ❌ Evite - muito genérico
screen.getByText("Submit");
```

### 2. Teste comportamento, não implementação

```tsx
// ✅ Bom - testa o resultado
it("displays error message when form is invalid", () => {
  // ...
  expect(screen.getByText("Email inválido")).toBeInTheDocument();
});

// ❌ Evite - testa implementação interna
it("sets error state to true", () => {
  // ...
  expect(component.state.hasError).toBe(true);
});
```

### 3. Use data-testid apenas quando necessário

```tsx
// ✅ Bom - usa texto ou role
screen.getByText("Welcome");
screen.getByRole("navigation");

// ⚠️ Use apenas quando outras queries não funcionam
screen.getByTestId("complex-component");
```

### 4. Teste casos de erro e edge cases

```tsx
describe("MyComponent", () => {
  it("renders with data", () => {
    /* ... */
  });

  it("renders with null data (fallback)", () => {
    /* ... */
  });

  it("renders with empty array", () => {
    /* ... */
  });

  it("handles missing optional props", () => {
    /* ... */
  });
});
```

### 5. Organize testes por responsabilidade

```tsx
describe("Button", () => {
  describe("rendering", () => {
    it("renders children correctly", () => {
      /* ... */
    });
    it("renders as link when href provided", () => {
      /* ... */
    });
  });

  describe("variants", () => {
    it("applies primary variant", () => {
      /* ... */
    });
    it("applies secondary variant", () => {
      /* ... */
    });
  });

  describe("interactions", () => {
    it("calls onClick when clicked", () => {
      /* ... */
    });
  });
});
```

## Cobertura de Testes

A meta de cobertura recomendada é:

- **Statements**: > 70%
- **Branches**: > 65%
- **Functions**: > 70%
- **Lines**: > 70%

### Visualizar Relatório de Cobertura

Após executar `npm run test:coverage`, abra:

```
coverage/index.html
```

## Troubleshooting

### "window is not defined"

Se componentes usam `window` ou `document`, use:

```tsx
vi.mock("path/to/component", () => ({
  Component: () => <div>Mocked Component</div>,
}));
```

### Erros de Animação (Framer Motion)

As animações estão mockadas globalmente. Se precisar testar animações específicas, use:

```tsx
vi.unmock("framer-motion");
```

### Imagens não carregam

URLs de imagens do Sanity estão mockadas. Se precisar testar com imagens reais:

```tsx
vi.unmock("@/sanity/lib/image");
```

## Recursos Adicionais

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Vitest Coverage](https://vitest.dev/guide/coverage.html)

## Exemplos de Testes

Consulte os seguintes arquivos para exemplos completos:

- `components/ui/__tests__/Button.test.tsx` - Testes de variantes e interações
- `components/ui/__tests__/Typography.test.tsx` - Testes de múltiplos componentes em um arquivo
- `components/home/__tests__/HeroSection.test.tsx` - Testes com props opcionais e fallbacks
- `components/about/__tests__/AboutImpactsSection.test.tsx` - Testes com dados complexos do Sanity
