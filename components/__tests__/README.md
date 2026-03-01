# Testes Unitários

Este diretório contém os testes unitários dos componentes da aplicação.

## Estrutura

```
components/
├── ui/__tests__/          # Testes dos componentes UI (Button, Card, etc)
├── home/__tests__/        # Testes dos componentes da Home
└── about/__tests__/       # Testes dos componentes da página Sobre
```

## Executar Testes

```bash
# Executar todos os testes
npm test

# Modo watch (reexecuta ao salvar)
npm run test:watch

# Com cobertura
npm run test:coverage

# Interface visual
npm run test:ui
```

## Cobertura Atual

- **Total**: ~64%
- **Componentes UI**: ~54%
- **Componentes Home**: ~52%
- **Componentes About**: ~93%

## Documentação Completa

Consulte [docs/testes.md](../docs/testes.md) para documentação completa sobre:

- Como escrever testes
- Boas práticas
- Mocks e configurações
- Exemplos práticos
- Troubleshooting

## Exemplo Rápido

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## Próximos Passos

- [ ] Adicionar testes para componentes de animação
- [ ] Aumentar cobertura dos componentes UI restantes (Accordion, Ticker, Icon)
- [ ] Adicionar testes para componentes de página (templates)
- [ ] Adicionar testes de integração
