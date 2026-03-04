# Página de Detalhes de Evento

## Visão Geral

A página de detalhes de evento (`/evento/[slug]`) apresenta informações completas sobre um evento específico com um layout moderno e CTA (Call-to-Action) proeminente.

## Arquitetura

### Rota Dinâmica

- **Localização**: `app/evento/[slug]/page.tsx`
- **Tipo**: Server Component com dynamic routing
- **Metadata**: Geração automática de SEO com título e descrição do evento

### Estrutura de Componentes

```
app/evento/[slug]/page.tsx (Server Component)
    ↓
EventDetailTemplate (Client Component)
    ├── Hero Section com imagem
    ├── CTA Section proeminente
    ├── Event Details (coluna principal)
    │   ├── Descrição (Portable Text)
    │   └── EventGallery
    └── Info Sidebar (sticky)
        ├── Informações do evento
        └── Compartilhar
```

## Componentes

### EventDetailTemplate

**Localização**: `components/events/EventDetailTemplate.tsx`

**Props**:

```typescript
interface EventDetailTemplateProps {
  event: Event;
}
```

**Funcionalidades**:

- Hero fullscreen com imagem destaque e gradiente
- Badge de categoria e informações da data
- CTA Section com gradiente chamativo
- Layout em 3 colunas (2/3 conteúdo + 1/3 sidebar)
- Sidebar sticky com informações organizadas
- Suporte a diferentes tipos de CTA (link, WhatsApp, email)
- Galeria de fotos integrada
- Animações suaves com Framer Motion

##Layout Moderno

### Hero Section

- Altura de 70vh para impacto visual
- Imagem de capa em destaque com gradiente overlay
- Badge de categoria com gradiente
- Título grande (5xl em mobile, 6xl em desktop)
- Informações chave em cards translúcidos com backdrop-blur

### CTA Proeminente

- Seção dedicada com gradiente primary → secondary
- Botão grande e chamativo (contraste com fundo branco)
- Ícone dinâmico baseado no tipo de CTA
- Animação de hover com scale
- Posicionamento estratégico logo após o hero

### Grid de Informações

- Cards com bordas arredondadas e sombras suaves
- Ícones em círculos coloridos com fundo primary/10
- Tipografia hierárquica clara
- Espaçamento generoso

## Tipos de CTA

### Link Externo

```typescript
cta: {
  enabled: true,
  type: "link",
  buttonText: "Inscreva-se agora",
  link: "https://exemplo.com/inscricao"
}
```

### WhatsApp

```typescript
cta: {
  enabled: true,
  type: "whatsapp",
  buttonText: "Falar com organizador",
  whatsapp: "5511999999999",
  whatsappMessage: "Olá! Gostaria de participar do evento..."
}
```

### Email

```typescript
cta: {
  enabled: true,
  type: "email",
  buttonText: "Entre em contato",
  email: "contato@fundacao.com"
}
```

## Informações Exibidas

### Coluna Principal (2/3)

1. **Sobre o Evento**
   - Descrição completa renderizada com Portable Text
   - Suporte a rich text (negrito, itálico, listas, etc.)

2. **Galeria de Fotos**
   - Componente EventGallery reutilizado
   - Grid responsivo com lightbox
   - Navegação por teclado

### Sidebar (1/3)

#### Card de Informações

- **Data**: Dia da semana e data formatada
- **Horário**: Hora de início
- **Local**: Nome, endereço e link para mapa
- **Ingresso**: Preço ou "Gratuito" + informações adicionais

#### Card de Compartilhamento

- Preparado para integração futura com botões de redes sociais

## Data Fetching

### Server Component

```typescript
// app/evento/[slug]/page.tsx
export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound(); // Renderiza página 404
  }

  return <EventDetailTemplate event={event} />;
}
```

### Service Layer

```typescript
// sanity/lib/services/eventService.ts
export async function getEventBySlug(slug: string): Promise<Event | null>;
```

### GROQ Query

```groq
*[_type == "evento" && slug.current == $slug && ativo == true][0] {
  // Todos os campos incluindo gallery
}
```

## Formatação de Data

Utiliza `date-fns` com locale pt-BR:

- Formato completo: "sexta-feira, 15 de março, 2024"
- Horário: "19:00"
- Dia da semana capitalizado

## Responsividade

### Desktop (lg+)

- Grid 3 colunas (2+1)
- Sidebar sticky (top-24)
- Hero 70vh
- Título 6xl

### Mobile

- Layout empilhado
- Sidebar abaixo do conteúdo
- Hero 70vh mantido
- Título 5xl

## Animações

### Hero

- Fade in com stagger para elementos
- Slide up no título
- Delay no CTA button

### Conteúdo

- Fade in on scroll para seções
- Transições suaves (300-500ms)

### Hover States

- Scale 1.05 no botão CTA
- Underline nos links

## SEO

### Metadata Dinâmica

```typescript
export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  return {
    title: `${event.title} | Fundação Luz & Amor`,
    description: event.description?.[0]?.children?.[0]?.text || "...",
  };
}
```

## Acessibilidade

- Contraste adequado em todos os textos
- Links com indicação visual clara
- Botões com tamanho mínimo adequado
- Landmarks semânticos (<main>, <section>)
- Alt text em todas as imagens

## Navegação

### Entrada

- Click em EventCard na página de calendário
- URL direta: `/evento/nome-do-evento`

### Saída

- Link "Ver no mapa" (se disponível)
- Links na sidebar para ações (email, WhatsApp, etc.)
- Navegação padrão do site (header/footer)

## Exemplos de Uso

### Evento com CTA WhatsApp

```tsx
<EventDetailTemplate
  event={{
    title: "Workshop de Artesanato",
    category: "educacional",
    eventDate: "2024-03-15T14:00:00",
    cta: {
      enabled: true,
      type: "whatsapp",
      buttonText: "Garantir minha vaga",
      whatsapp: "5511999999999",
    },
    // ... outros campos
  }}
/>
```

### Evento Gratuito sem CTA

```tsx
<EventDetailTemplate
  event={{
    title: "Palestra Sobre Sustentabilidade",
    category: "cultural",
    eventDate: "2024-04-20T19:00:00",
    ticketPrice: {
      free: true,
    },
    cta: {
      enabled: false,
    },
    // ... outros campos
  }}
/>
```

## Melhorias Futuras

1. **Funcionalidades de Compartilhamento**
   - Botões para redes sociais (Facebook, Twitter, LinkedIn)
   - Copiar link para clipboard
   - WhatsApp Web share

2. **Eventos Relacionados**
   - Sugestão de eventos similares
   - "Você também pode gostar de..."

3. **Countdown Timer**
   - Para eventos futuros
   - Atualização em tempo real

4. **Integração com Calendário**
   - Botão "Adicionar ao Google Calendar"
   - Arquivo .ics para download

5. **Mapa Interativo**
   - Embed do Google Maps
   - Visualização da localização

6. **Comentários/Avaliações**
   - Para eventos passados
   - Sistema de rating

## Manutenção

### Adicionar Novo Tipo de CTA

1. Adicionar tipo em `Event` interface
2. Adicionar case no switch de `handleCTAClick`
3. Adicionar ícone em `getCTAIcon`

### Modificar Layout

- `EventDetailTemplate.tsx` - Estrutura e estilo
- Classes Tailwind para ajustes rápidos
- Variants do Framer Motion para animações

### Atualizar Informações Exibidas

- Modificar grid na sidebar
- Adicionar novos campos em GROQ query
- Atualizar interface `Event`
