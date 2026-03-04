# Arquitetura de Eventos - Reorganização Completa

## Visão Geral

Reestruturação completa seguindo o padrão de `/components/courses`, com componentização modular e layout visual impactante.

## Estrutura de Arquivos

```
app/
  evento/
    [slug]/
      page.tsx                    # Apenas fetching + composição

components/
  events/                         # Componentes de evento individual
    EventCard.tsx                 # Card reutilizável
    EventGallery.tsx              # Galeria com lightbox
    EventHero.tsx                 # Hero da página de detalhes
    EventDetails.tsx              # Descrição do evento
    EventInfo.tsx                 # Sidebar com informações
    EventCTA.tsx                  # Call-to-action section
    EventGallerySection.tsx       # Wrapper da galeria
    index.ts                      # Barrel export

  page-templates/
    CalendarioEventosTemplate.tsx # Template principal
    calendario-eventos/           # Componentes internos
      FeaturedEvent.tsx           # Próximo evento em destaque
      UpcomingEventsGrid.tsx      # Grid de próximos eventos
      PastEventsGrid.tsx          # Grid de eventos passados
      index.ts                    # Barrel export
```

## Padrão de Organização

### 1. Página de Detalhes (`/evento/[slug]`)

**Inspiração**: Segue exatamente o padrão de `/course/[slug]`

**Estrutura**:

```tsx
// app/evento/[slug]/page.tsx
export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <main>
      <EventHero event={event} />
      <EventCTA event={event} />
      <div className="grid lg:grid-cols-3">
        <EventDetails event={event} />
        <EventInfo event={event} />
      </div>
      <EventGallerySection event={event} />
    </main>
  );
}
```

**Componentes**:

#### EventHero

- Hero fullscreen com imagem blur no fundo
- Badge de categoria
- Informações principais (data, hora, local)
- Estilo dark com texto branco
- Bordas arredondadas em 48px

#### EventCTA

- Seção proeminente com gradiente primary → secondary
- Botão grande e chamativo
- Suporte a 3 tipos: link, WhatsApp, email
- Ícones dinâmicos
- Apenas renderiza se CTA estiver habilitado

#### EventDetails

- Descrição do evento com PortableText
- Prose styling para rich text
- Max-width para legibilidade

#### EventInfo

- Sidebar sticky (top-24)
- Card com informações organizadas:
  - Data completa
  - Horário
  - Local (com link para mapa)
  - Preço do ingresso
- Ícones em containers coloridos (bg-primary/10)

#### EventGallerySection

- Wrapper para EventGallery
- Background cinza claro
- Título centralizado
- Apenas renderiza se tiver gale ria

### 2. Calendário de Eventos

**Nova Estrutura - 4 Seções**:

1. **Hero** - Apresentação com gradiente e animações
2. **Featured Event** - Próximo evento com destaque MAIOR
3. **Upcoming Events** - Outros eventos futuros (destaque alto)
4. **Past Events** - Eventos passados (destaque menor)

#### Hero Section

```tsx
- Background: gradiente com shapes animados blur
- Badge: gradiente primary → secondary com ícone Sparkles
- Título: Text gradient extragrande (5xl/7xl)
- Descrição: Texto grande e legível
```

#### Featured Event (FeaturedEvent.tsx)

```tsx
<div className="rounded-[48px] gradient border p-1">
  <Grid cols 2/3>
    <Image />                    # Imagem grande com badges
    <Content>                     # Informações + CTA
      🔥 PRÓXIMO EVENTO
      <Title />
      <Description />
      <EventInfo />              # Data, hora, local
      <Button gradient />        # Ver Detalhes
    </Content>
  </Grid>
</div>
```

**Características**:

- Layout horizontal (image left, content right)
- Borda gradiente com padding de 1
- Imagem ocupa 40% do espaço (2/5 columns)
- Badge "🔥 PRÓXIMO EVENTO" em destaque
- Botão gradient com arrow animado
- Hover: scale + shadow upgrade

#### Upcoming Events Grid (UpcomingEventsGrid.tsx)

```tsx
- Badge: Secondary gradient
- Grid 3 colunas
- EventCard padrão
- Background: gradiente sutil via-primary/5
```

#### Past Events Grid (PastEventsGrid.tsx)

```tsx
- Badge: Gray-700 (destaque menor)
- Grid 3 colunas
- EventCard com showGalleryIcon
- Background: Gray-50
```

## Hierarquia Visual

### Destaque Maior (Featured Event)

- ✨ Tamanho: Grande (ocupa seção inteira)
- ✨ Layout: Horizontal com grid 2/3
- ✨ Borda: Gradiente primary → secondary
- ✨ Título: 4xl/5xl
- ✨ Badge: "🔥 PRÓXIMO EVENTO"
- ✨ CTA: Botão gradient grande com arrow
- ✨ Cores: Vibrantes (primary/secondary)

### Destaque Alto (Upcoming Events)

- 🎯 Tamanho: Cards médios em grid 3 colunas
- 🎯 Badge seção: Secondary gradient
- 🎯 Background: Gradiente sutil
- 🎯 Hover: -translate-y-2 + shadow-2xl
- 🎯 Cores: Primary/Secondary

### Destaque Menor (Past Events)

- 📅 Tamanho: Cards médios em grid 3 colunas
- 📅 Badge seção: Gray-700 (sóbrio)
- 📅 Background: Gray-50
- 📅 Badge galeria: Indicador de fotos
- 📅 Cores: Neutras (gray)

## Componentes Internos

### FeaturedEvent

**Localização**: `components/page-templates/calendario-eventos/FeaturedEvent.tsx`

**Responsabilidade**: Exibir o próximo evento com máximo destaque

**Estrutura**:

- Borda gradiente container
- Grid lg:cols-5 (2+3)
- Imagem lado esquerdo com badges
- Conteúdo lado direito com CTA

**Props**: `{ event: Event }`

### UpcomingEventsGrid

**Localização**: `components/page-templates/calendario-eventos/UpcomingEventsGrid.tsx`

**Responsabilidade**: Grid de próximos eventos (exceto o featured)

**Estrutura**:

- Motion wrapper com stagger
- Grid 3 colunas
- EventCard para cada evento

**Props**: `{ events: Event[] }`

### PastEventsGrid

**Localização**: `components/page-templates/calendario-eventos/PastEventsGrid.tsx`

**Responsabilidade**: Grid de eventos passados

**Estrutura**:

- Motion wrapper com stagger
- Grid 3 colunas
- EventCard com showGalleryIcon

**Props**: `{ events: Event[] }`

## Cores e Gradientes

### Primary/Secondary (Eventos Futuros)

```css
/* Featured Event */
from-primary via-primary to-secondary

/* Badges */
from-primary to-primary/80
from-secondary to-secondary/80

/* Hero */
from-primary via-secondary to-primary (text gradient)
```

### Gray (Eventos Passados)

```css
/* Badge */
bg-gray-700

/* Background */
bg-gray-50

/* Empty state */
bg-gray-200
text-gray-500/600/700
```

## Animações

### Hero

- Shapes: animate-pulse com delay
- Elements: staggerContainerVariants

### Featured Event

- Hover button: translateX arrow
- Hover card: scale-105 + shadow-2xl

### Grids

- whileInView com margin -100px
- staggerContainerVariants

### Cards (EventCard)

- Hover: -translate-y-2 + scale-110 (image)
- Duration: 500-700ms

## Empty States

### Upcoming Events (Vazio)

```tsx
- Border dashed colorido
- Gradiente from-primary/5 via-white to-secondary/5
- Ícone grande em círculo gradiente
- Texto otimista e amigável
```

### Past Events (Vazio)

```tsx
- Background branco simples
- Border gray-200
- Ícone gray em círculo gray-200
- Texto neutro
```

## Responsividade

### Desktop (lg+)

- Featured Event: Grid 2/3
- Cards: Grid 3 colunas
- Sidebar: Sticky

### Mobile

- Featured Event: Stack vertical
- Cards: Grid 1 coluna
- Sidebar: Below content

## Comparação com Cursos

| Aspecto           | Courses                             | Events                             |
| ----------------- | ----------------------------------- | ---------------------------------- |
| **Hero**          | Dark com blur                       | Dark com blur ✅                   |
| **Componentes**   | Separados (Hero, Description, etc.) | Separados (Hero, Details, etc.) ✅ |
| **Página**        | Apenas fetching                     | Apenas fetching ✅                 |
| **Barrel Export** | index.ts                            | index.ts ✅                        |
| **Layout**        | Grid + CTA                          | Grid + CTA ✅                      |

## Benefícios da Nova Estrutura

### Modularidade

- ✅ Componentes pequenos e focados
- ✅ Fácil manutenção
- ✅ Reuso facilitado
- ✅ Testes isolados

### Organização

- ✅ Segue padrão estabelecido (courses)
- ✅ Separação clara de responsabilidades
- ✅ Barrel exports para imports limpos
- ✅ Pastas nomeadas coerentemente

### Performance

- ✅ Server Components para fetching
- ✅ Client Components só onde necessário
- ✅ Code splitting automático
- ✅ Image optimization

### Manutenibilidade

- ✅ Um componente = uma responsabilidade
- ✅ Props bem definidas
- ✅ TypeScript strict
- ✅ Fácil adicionar features

## Migration Guide

### Antes (Monolítico)

```tsx
// EventDetailTemplate.tsx (1 arquivo grande)
export function EventDetailTemplate({ event }) {
  // Todo o código HTML/TSX aqui (200+ linhas)
}
```

### Depois (Modular)

```tsx
// app/evento/[slug]/page.tsx
import { EventHero, EventCTA, ... } from "@/components/events";

export default async function EventPage({ params }) {
  const event = await getEventBySlug(params.slug);
  return (
    <main>
      <EventHero event={event} />
      <EventCTA event={event} />
      {/* ... */}
    </main>
  );
}
```

## Checklist de Implementação

- ✅ EventHero criado
- ✅ EventDetails criado
- ✅ EventInfo criado
- ✅ EventCTA criado
- ✅ EventGallerySection criado
- ✅ FeaturedEvent criado
- ✅ UpcomingEventsGrid criado
- ✅ PastEventsGrid criado
- ✅ CalendarioEventosTemplate refatorado
- ✅ app/evento/[slug]/page.tsx refatorado
- ✅ Barrel exports atualizados
- ✅ EventDetailTemplate removido
- ✅ Lint passou (0 errors)
- ⏳ Testes atualizados

## Próximos Passos

1. Atualizar testes unitários
2. Adicionar testes E2E (Playwright)
3. Documentar no Storybook
4. Criar variantes de EventCard para diferentes contextos
5. Implementar lazy loading para galeria
6. Adicionar botões de compartilhamento social
