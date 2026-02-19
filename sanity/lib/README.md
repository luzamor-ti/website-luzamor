# Arquitetura da Camada `/lib`

Esta estrutura organiza o código da aplicação seguindo uma arquitetura em camadas clara e separação de responsabilidades.

## 📁 Estrutura de Diretórios

```
lib/
├── sanity/           # Infraestrutura e clientes Sanity
│   ├── client.ts    # Cliente Sanity configurado
│   └── image.ts     # Utilitário para URLs de imagens
│
├── queries/          # Apenas consultas GROQ puras
│   ├── projeto.ts
│   ├── membro.ts
│   ├── trabalho.ts
│   ├── apoiador.ts
│   ├── contato.ts
│   ├── faq.ts
│   └── pagina.ts
│
├── services/         # Lógica de negócio e execução de fetches
│   ├── projetoService.ts
│   ├── membroService.ts
│   ├── trabalhoService.ts
│   ├── apoiadorService.ts
│   ├── contatoService.ts
│   ├── faqService.ts
│   └── paginaService.ts
│
├── types/            # Definições TypeScript
│   ├── projeto.ts
│   ├── membro.ts
│   ├── trabalho.ts
│   ├── apoiador.ts
│   ├── contato.ts
│   ├── faq.ts
│   └── pagina.ts
│
└── index.ts          # Exports centralizados
```

## 🎯 Responsabilidades por Camada

| Camada   | Responsabilidade                                                                 |
| -------- | ------------------------------------------------------------------------------- |
| queries  | Apenas strings com consultas GROQ puras, sem lógica ou imports externos         |
| services | Executa fetches via client, aplica regras de negócio, retorna dados tipados     |
| types    | Interfaces TypeScript para tipagem forte em toda a aplicação                   |
| sanity   | Infraestrutura: clientes configurados, utilitários e configurações do Sanity    |

## 📝 Exemplos de Uso

### Importar do índice (recomendado)

```typescript
import { getProjetosHome, Projeto } from '@/lib'

const projetos: Projeto[] = await getProjetosHome()
```

### Importar diretamente de um serviço

```typescript
import { getProjetosHome } from '@/lib/services/projetoService'
import type { Projeto } from '@/lib/types/projeto'

const projetos: Projeto[] = await getProjetosHome()
```

### Usar o cliente Sanity diretamente (quando necessário)

```typescript
import { client } from '@/lib/sanity/client'

const data = await client.fetch('*[_type == "projeto"]')
```

## 🔄 Fluxo de Dados

```
Componente/Página
       ↓
Service (executa fetch + lógica)
       ↓
Query (consulta GROQ)
       ↓
Client Sanity
       ↓
Type (tipagem de retorno)
```

## ✅ Boas Práticas

1. **Queries**: Devem conter apenas GROQ, sem imports ou lógica
2. **Services**: Importam queries, usam o client e retornam dados tipados
3. **Types**: Interfaces simples sem dependências circulares
4. **Imports**: Preferencialmente via `@/lib` (índice) para manutenção mais fácil

## 🚀 Próximas Etapas

- Preencher as placeholders de queries baseado em seu schema Sanity
- Atualizar tipos conforme os campos reais do seu schema
- Adicionar validações e transformações de dados nos services
- Implementar cache e ISR (Incremental Static Regeneration) quando necessário
