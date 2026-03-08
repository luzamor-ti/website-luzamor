# Relacionamento Evento ↔ Projeto

## Visão Geral

Um evento pode ser **opcionalmente** vinculado a um projeto da fundação. A relação é do tipo **muitos-para-um**: cada evento referencia no máximo um projeto, e cada projeto pode ter nenhum ou vários eventos associados.

```
Projeto (1) ←──── (0..*) Evento
```

## Modelo de Dados

### Schema Sanity (`evento.ts`)

O campo `projeto` foi adicionado ao schema do evento como uma **referência** ao documento `projeto`:

```typescript
defineField({
  name: "projeto",
  title: "Projeto Relacionado",
  type: "reference",
  to: [{ type: "projeto" }],
  description: "Vincule este evento a um projeto da fundação (opcional)",
  group: "configuracoes",
});
```

**Características:**

- **Opcional**: nenhuma validação `required` — o evento funciona normalmente sem projeto
- **Grupo**: localizado na aba "Configurações" do editor do CMS
- **Preview**: o título do projeto aparece no subtítulo da listagem do CMS (ex: `15/04/2026 • educacional | 📁 Projeto Esperança`)

### Tipo TypeScript (`Event`)

```typescript
// sanity/lib/types/event.ts
export interface Event {
  // ... campos existentes ...
  project?: {
    _id: string;
    title: string;
    slug: string;
  } | null;
  featured: boolean;
  active: boolean;
}
```

O campo `project` é `optional` (pode ser `undefined` quando omitido pela query) e aceita `null` (quando o evento explicitamente não tem projeto).

## Queries GROQ

### Projeção do projeto

Todas as queries de evento agora incluem a projeção desnormalizada do projeto:

```groq
"project": projeto-> {
  _id,
  "title": titulo,
  "slug": slug.current
}
```

Queries atualizadas:

- `eventsQuery`
- `upcomingEventsQuery`
- `featuredEventsQuery`
- `eventBySlugQuery`
- `allUpcomingEventsQuery`
- `allPastEventsQuery`

### Nova query: `eventsByProjectQuery`

Busca todos os eventos ativos vinculados a um projeto específico:

```groq
*[_type == "evento" && ativo == true && projeto._ref == $projectId]
  | order(dataEvento desc) { ... }
```

**Parâmetro**: `$projectId` (string) — o `_id` do projeto

## Service Layer

### Nova função: `getEventsByProject(projectId)`

```typescript
// sanity/lib/services/eventService.ts
export async function getEventsByProject(projectId: string): Promise<Event[]>;
```

**Comportamento:**

- Retorna array de eventos vinculados ao projeto
- Retorna `[]` se não houver eventos, se fetch retornar `null`, ou em caso de erro
- Ordena por data do evento (mais recente primeiro)

### Uso em componentes

```tsx
// Em um Server Component
import { getEventsByProject } from "@/sanity/lib/services/eventService";

const events = await getEventsByProject(project._id);
```

```tsx
// Em um Client Component — receba por props
interface ProjectEventsProps {
  events: Event[];
}

export function ProjectEvents({ events }: ProjectEventsProps) {
  return events.map((event) => <EventCard key={event._id} event={event} />);
}
```

## Uso no CMS

1. Acesse o Sanity Studio em `/fundacao-cms`
2. Ao criar/editar um **Evento**, vá para a aba **Configurações**
3. No campo **"Projeto Relacionado"**, selecione o projeto desejado
4. O campo é opcional — deixe vazio para eventos independentes

## Testes

### Arquivos de teste criados

| Arquivo                                                     | Testes | Descrição                                               |
| ----------------------------------------------------------- | ------ | ------------------------------------------------------- |
| `sanity/schemaTypes/__tests__/eventoProjetoSchema.test.ts`  | 8      | Valida o campo `projeto` no schema Sanity               |
| `sanity/lib/queries/__tests__/eventProjectQueries.test.ts`  | 10     | Valida projeção do projeto em todas as queries          |
| `sanity/lib/services/__tests__/eventProjectService.test.ts` | 7      | Testa `getEventsByProject` e campo project nos services |
| `sanity/lib/__tests__/eventProjectRelation.test.ts`         | 12     | Validação do tipo e da relação 1:N                      |

**Total: 37 testes**

### Executar testes

```bash
npx vitest run --project unit sanity/lib/__tests__/eventProjectRelation.test.ts sanity/lib/services/__tests__/eventProjectService.test.ts sanity/schemaTypes/__tests__/eventoProjetoSchema.test.ts sanity/lib/queries/__tests__/eventProjectQueries.test.ts
```

## Mocks atualizados

O arquivo `components/events/__tests__/eventMocks.ts` foi atualizado com novos mocks:

- `mockProject` — objeto de projeto para testes
- `mockEventWithProject` — evento vinculado a um projeto
- `mockEventWithoutProject` — evento com `project: null`

## Arquivos Modificados

| Arquivo                                     | Tipo de Alteração                                               |
| ------------------------------------------- | --------------------------------------------------------------- |
| `sanity/schemaTypes/evento.ts`              | Campo `projeto` + preview atualizado                            |
| `sanity/lib/types/event.ts`                 | Campo `project` no tipo `Event`                                 |
| `sanity/lib/queries/event.ts`               | Projeção `project` em todas as queries + `eventsByProjectQuery` |
| `sanity/lib/services/eventService.ts`       | Função `getEventsByProject`                                     |
| `components/events/__tests__/eventMocks.ts` | Novos mocks                                                     |

## Arquivos Criados

| Arquivo                                                     | Descrição                  |
| ----------------------------------------------------------- | -------------------------- |
| `sanity/schemaTypes/__tests__/eventoProjetoSchema.test.ts`  | Testes do schema           |
| `sanity/lib/queries/__tests__/eventProjectQueries.test.ts`  | Testes das queries         |
| `sanity/lib/services/__tests__/eventProjectService.test.ts` | Testes do service          |
| `sanity/lib/__tests__/eventProjectRelation.test.ts`         | Testes da relação de tipos |
| `docs/relacionamento-evento-projeto.md`                     | Esta documentação          |
