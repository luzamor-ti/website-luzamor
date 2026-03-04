# Página de Calendário de Eventos

## Visão Geral

A página de Calendário de Eventos exibe todos os eventos da Fundação Luz & Amor, organizados em duas seções principais:

- **Próximos Eventos**: Eventos futuros ordenados por data (mais próximo primeiro)
- **Eventos Realizados**: Eventos passados com galerias de fotos

## Arquitetura

### Estrutura de Dados

#### Schema Sanity (CMS)

```typescript
// sanity/schemaTypes/evento.ts
{
  titulo: string;
  slug: slug;
  imagemCapa: image;
  descricao: array<block>;
  categoria: string; // cultural, educacional, social, etc.
  dataEvento: datetime;
  valorIngresso: {
    gratuito: boolean;
    valor?: number;
    informacoesAdicionais?: string;
  };
  cta: {
    habilitado: boolean;
    textoBotao?: string;
    tipo?: 'link' | 'whatsapp' | 'email';
    link?: string;
    whatsapp?: string;
    mensagemWhatsApp?: string;
    email?: string;
  };
  local?: {
    nome?: string;
    endereco?: string;
    linkMapa?: string;
  };
  galeria?: array<image>; // ✨ NOVO: Galeria de fotos do evento
  destaque: boolean;
  ativo: boolean;
  corDestaque?: string;
}
```

#### Tipo TypeScript

```typescript
// sanity/lib/types/event.ts
interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: { asset: { _ref: string; _type: "reference" }; alt?: string };
  description: PortableTextBlock[];
  category: "cultural" | "educacional" | "social" | ...;
  eventDate: string;
  ticketPrice: { free: boolean; value?: number; additionalInfo?: string };
  cta: { enabled: boolean; buttonText?: string; type?: string; ... };
  location?: { name?: string; address?: string; mapLink?: string };
  gallery?: { // ✨ NOVO
    asset: { _ref: string; _type: "reference" };
    alt?: string;
    caption?: string;
  }[];
  featured: boolean;
  active: boolean;
  highlightColor?: string;
}
```

### Camada de Serviços

#### Services

```typescript
// sanity/lib/services/eventService.ts

// Busca todos os eventos futuros (ordem: data ASC)
export async function getAllUpcomingEvents(): Promise<Event[]>;

// Busca todos os eventos passados (ordem: data DESC)
export async function getAllPastEvents(): Promise<Event[]>;

// Orquestra busca paralela de eventos futuros e passados
export async function getEventsCalendarData() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getAllUpcomingEvents(),
    getAllPastEvents(),
  ]);
  return { upcomingEvents, pastEvents };
}
```

#### Queries GROQ

```typescript
// sanity/lib/queries/event.ts

// Eventos futuros: dateTime(dataEvento) > dateTime(now()) | order(dataEvento asc)
export const allUpcomingEventsQuery = groq`...`;

// Eventos passados: dateTime(dataEvento) <= dateTime(now()) | order(dataEvento desc)
export const allPastEventsQuery = groq`...`;
```

### Componentes

#### Hierarquia de Componentes

```
app/[slug]/page.tsx (Server Component)
  └─> CalendarioEventosTemplate (Client Component)
        ├─> Section: Hero com título/descrição
        ├─> Section: Próximos Eventos
        │     └─> Grid → EventCard[]
        ├─> Section: Empty State (se não há eventos futuros)
        ├─> Section: Eventos Realizados
        │     └─> EventCard + EventGallery (toggle)
        └─> Section: Empty State (se não há eventos passados)
```

#### EventCard

**Localização**: `components/events/EventCard.tsx`

Componente reutilizável que exibe informações de um evento em formato card.

**Props**:

```typescript
interface EventCardProps {
  event: Event;
  showGalleryIcon?: boolean; // Mostra badge com quantidade de fotos
}
```

**Características**:

- Badge de data (dia/mês/ano)
- Badge de categoria
- Imagem de capa com hover effect
- Informações: título, descrição, localização, horário
- Indicador de preço (gratuito ou valor)
- Link para página de detalhes do evento
- Badge de galeria (se `showGalleryIcon=true` e evento tem fotos)

**Uso**:

```tsx
<EventCard event={event} />
<EventCard event={pastEvent} showGalleryIcon /> // Para eventos passados
```

#### EventGallery

**Localização**: `components/events/EventGallery.tsx`

Componente de galeria de fotos com lightbox modal.

**Props**:

```typescript
interface EventGalleryProps {
  images: GalleryImage[];
  eventTitle: string;
}
```

**Características**:

- Grid responsivo 2x3x4 colunas (mobile/tablet/desktop)
- Lightbox modal ao clicar em imagem
- Navegação anterior/próxima
- Suporte a legendas
- Contador de imagens (1/10)
- Navegação por teclado (setas, ESC)
- Bloqueia scroll do body quando aberto

**Uso**:

```tsx
{
  event.gallery && event.gallery.length > 0 && (
    <EventGallery images={event.gallery} eventTitle={event.title} />
  );
}
```

#### CalendarioEventosTemplate

**Localização**: `components/page-templates/CalendarioEventosTemplate.tsx`

Template principal da página de calendário de eventos.

**Props**:

```typescript
interface CalendarioEventosTemplateProps {
  pagina: Page;
  upcomingEvents: Event[];
  pastEvents: Event[];
}
```

**Seções**:

1. **Hero**: Título e descrição da página
2. **Próximos Eventos**: Grid 3-colunas com eventos futuros
3. **Eventos Realizados**: Lista com cards expandidos + galeria toggle
4. **Empty States**: Mensagens quando não há eventos

**Estado Local**:

```typescript
const [selectedPastEvent, setSelectedPastEvent] = useState<Event | null>(null);
```

Controla qual evento passado está com galeria expandida.

## Fluxo de Dados

### Server Side (app/[slug]/page.tsx)

```typescript
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "calendario-eventos") {
    // Busca paralela de eventos
    const { upcomingEvents, pastEvents } = await getEventsCalendarData();

    return (
      <CalendarioEventosTemplate
        pagina={pagina}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />
    );
  }

  // ... outros templates
}
```

### Client Side (CalendarioEventosTemplate)

1. Recebe dados via props (sem fetching)
2. Renderiza seções condicionalmente
3. Gerencia estado de galeria expandida para eventos passados
4. Aplica animações (framer-motion)

## Animações

Utiliza variantes pré-definidas de `lib/animations.ts`:

```typescript
import {
  staggerContainerVariants,
  fadeInVariants
} from "@/lib/animations";

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainerVariants}
>
  <motion.div variants={fadeInVariants}>...</motion.div>
</motion.div>
```

## Estados da Página

### Com Eventos Futuros e Passados

- Exibe ambas as seções
- Grid de 3 colunas para eventos futuros
- Lista expandida para eventos passados com toggle de galeria

### Apenas Eventos Futuros

- Exibe seção de próximos eventos
- Empty state para eventos realizados

### Apenas Eventos Passados

- Empty state para próximos eventos
- Exibe seção de eventos realizados

### Sem Eventos

- Empty states para ambas as seções
- Mensagens motivacionais

## Testes

### Cobertura

**EventCard.test.tsx** (13 testes)

- ✅ Renderização de dados do evento
- ✅ Formatação de data/hora
- ✅ Preços (gratuito/pago)
- ✅ Badge de galeria
- ✅ Links para página de detalhes

**EventGallery.test.tsx** (12 testes)

- ✅ Grid de imagens
- ✅ Lightbox (abrir/fechar)
- ✅ Navegação (próxima/anterior/wrap-around)
- ✅ Legendas
- ✅ Contador de imagens

**CalendarioEventosTemplate.test.tsx** (11 testes)

- ✅ Renderização de seções
- ✅ Empty states
- ✅ Toggle de galeria
- ✅ Eventos futuros e passados

**Total**: 36 testes passando

### Executar Testes

```bash
# Todos os testes de eventos
npm test -- components/events components/page-templates/CalendarioEventosTemplate

# Apenas EventCard
npm test -- components/events/__tests__/EventCard

# Apenas EventGallery
npm test -- components/events/__tests__/EventGallery

# Apenas Template
npm test -- components/page-templates/__tests__/CalendarioEventosTemplate
```

## Adicionando Eventos no CMS

1. Acessar `/fundacao-cms` no navegador
2. Navegar para "Evento"
3. Criar novo evento:
   - **Informações Básicas**: Título, imagem de capa, descrição, categoria
   - **Detalhes**: Data/hora, valor ingresso, CTA, localização
   - **Galeria de Fotos**: Adicionar fotos **após o evento** (opcional)
   - **Configurações**: Marcar como destaque, ativar/desativar

### Quando Adicionar Galeria?

A galeria deve ser adicionada **após a realização do evento**:

1. Editar evento existente
2. Ir para aba "Detalhes do Evento"
3. Adicionar imagens na seção "Galeria de Fotos"
4. Para cada imagem:
   - Upload da foto
   - Texto alternativo (acessibilidade)
   - Legenda opcional

## Considerações de Performance

### Otimizações Implementadas

1. **Fetch Paralelo**: `Promise.all()` para eventos futuros e passados
2. **Imagens Otimizadas**: Next.js Image com `sizes` responsivos
3. **Lazy Loading**: Galeria só renderiza quando expandida
4. **Viewport Triggers**: Animações só disparam quando visível

### Recomendações

- **Limite de Eventos Passados**: Considerar paginação se >50 eventos
- **Compressão de Imagens**: Otimizar imagens no upload (Sanity faz automaticamente)
- **CDN**: Imagens servidas via cdn.sanity.io

## Próximos Passos

### Melhorias Futuras

- [ ] Filtros por categoria
- [ ] Busca por nome/data
- [ ] Paginação para eventos passados
- [ ] Compartilhamento social de eventos
- [ ] Calendário visual (view mensal)
- [ ] Inscrição inline para eventos
- [ ] Exportar evento para Google Calendar

## Manutenção

### Atualizando Schema

Se precisar adicionar campos ao evento:

1. Atualizar schema: `sanity/schemaTypes/evento.ts`
2. Atualizar tipo: `sanity/lib/types/event.ts`
3. Atualizar query: `sanity/lib/queries/event.ts`
4. Atualizar componente que usa o campo
5. Criar/atualizar testes
6. Documentar mudança

### Troubleshooting

**Eventos não aparecem?**

- Verificar se `ativo == true` no CMS
- Verificar se data está no formato correto
- Checar console para erros de fetch

**Galeria não abre?**

- Verificar se evento tem imagens na galeria
- Checar console para erros do lightbox
- Testar em navegador diferente

**Testes falhando?**

- Limpar cache: `npm run test -- --clearCache`
- Verificar mocks de framer-motion
- Checar timezones nas datas de teste
