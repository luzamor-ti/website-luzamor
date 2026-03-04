# Componentes de Eventos

Documentação de referência dos componentes relacionados a eventos da Fundação Luz & Amor.

## Índice

- [EventCard](#eventcard)
- [EventsSection](#eventssection)
- [EventGallery](#eventgallery)

---

## EventCard

Componente de card para exibição de eventos. Pode ser usado tanto para eventos futuros quanto passados.

### Importação

```typescript
import { EventCard } from "@/components/events";
```

### Props

| Prop              | Tipo      | Obrigatório | Padrão  | Descrição                                      |
| ----------------- | --------- | ----------- | ------- | ---------------------------------------------- |
| `event`           | `Event`   | ✅          | -       | Objeto do evento com todas as informações      |
| `showGalleryIcon` | `boolean` | ❌          | `false` | Exibe badge com quantidade de fotos na galeria |

### Interface Event

```typescript
interface Event {
  _id: string;
  title: string;
  shortDescription: string; // Máximo 200 caracteres
  slug: { current: string };
  coverImage: {
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
  description: PortableTextBlock[];
  category:
    | "cultural"
    | "educacional"
    | "social"
    | "arrecadacao"
    | "celebracao"
    | "esportivo"
    | "arte"
    | "musical"
    | "literario"
    | "outro";
  eventDate: string; // ISO 8601 datetime
  ticketPrice: {
    free: boolean;
    value?: number;
  };
  cta: {
    enabled: boolean;
    buttonText?: string;
    type?: "link" | "whatsapp" | "email";
    link?: string;
    whatsapp?: string;
    whatsappMessage?: string;
    email?: string;
  };
  location?: {
    name?: string;
    address?: string;
    mapLink?: string;
  };
  gallery?: {
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  }[];
  featured: boolean;
  active: boolean;
}
```

### Exemplos de Uso

#### Evento Futuro Simples

```tsx
<EventCard event={upcomingEvent} />
```

#### Evento Passado com Badge de Galeria

```tsx
<EventCard event={pastEvent} showGalleryIcon />
```

#### Grid de Eventos

```tsx
import { Grid } from "@/components/ui";
import { EventCard } from "@/components/events";

<Grid cols={3} gap="lg">
  {events.map((event) => (
    <EventCard key={event._id} event={event} />
  ))}
</Grid>;
```

### Elementos Visuais

O componente exibe automaticamente:

- **Badge de Data**: Dia, mês e ano no canto superior esquerdo
- **Badge de Categoria**: Nome da categoria no canto inferior esquerdo da imagem
- **Badge de Galeria** (se `showGalleryIcon={true}` e galeria existe): Ícone de foto + quantidade no canto superior direito
- **Informações do Evento**:
  - Título (com truncate em 2 linhas)
  - Descrição (com truncate em 2 linhas)
  - Dia da semana
  - Horário
  - Local (se disponível)
  - Preço (gratuito ou valor)

### Mapeamento de Categorias

```typescript
const CATEGORY_LABELS: Record<string, string> = {
  cultural: "Cultural",
  educacional: "Educacional",
  social: "Social",
  arrecadacao: "Arrecadação",
  celebracao: "Celebração",
  esportivo: "Esportivo",
  arte: "Arte",
  musical: "Musical",
  literario: "Literário",
  outro: "Outro",
};
```

### Comportamento

- **Hover**: Aumenta sombra e zoom na imagem
- **Click**: Navega para `/evento/[slug]` (página de detalhes)
- **Responsividade**: Ajusta automaticamente para mobile/tablet/desktop

### Formatação de Data

O componente formata automaticamente a data do evento:

```typescript
// Input: "2026-04-15T14:00:00.000Z"
// Output Visual:
// Badge: "15 / ABR / 2026"
// Dia da semana: "quarta-feira"
// Horário: "14:00" (ou "11:00" dependendo do timezone)
```

### Acessibilidade

- Imagens com texto alternativo
- Links semânticos
- Cores com contraste adequado
- Texto legível em diferentes tamanhos

---

## EventsSection

Componente de seção da home que exibe os próximos 3 eventos ativos. Utiliza o padrão de click handlers separados para navegação e ação.

### Importação

```typescript
import { EventsSection } from "@/components/home";
```

### Props

| Prop      | Tipo           | Obrigatório | Padrão | Descrição                    |
| --------- | -------------- | ----------- | ------ | ---------------------------- |
| `data`    | `Event[]`      | ✅          | -      | Array com até 3 eventos      |
| `section` | `HomeSection`  | ❌          | `null` | Configuração da seção do CMS |

### Interface HomeSection

```typescript
interface HomeSection {
  _id: string;
  _type: "secaoHome";
  name: string;
  tag?: string;
  title?: string;
  description?: string;
  active: boolean;
}
```

### Exemplos de Uso

#### Uso Básico (com dados do CMS)

```tsx
<EventsSection data={upcomingEvents} section={eventsSection} />
```

#### Com Fallbacks

```tsx
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";

// Se CMS falhar, usa fallbacks
<EventsSection 
  data={events} 
  section={null} // Usará TEXT_FALLBACKS.events
/>
```

### Elementos Visuais

O componente exibe para cada evento:

- **Badge de Categoria**: Tag branco com texto em verde primário
- **Imagem de Capa**: Otimizada e responsiva
- **Título**: Truncado em 2 linhas
- **Descrição Curta**: Preview do evento
- **Data e Horário**: Em itálico
- **Local**: Nome do local com ícone de mapa (MapPin)
- **Preço**: Formatado em pt-BR (R$ 50,00) ou "Gratuito"
- **Botão CTA**: Se configurado no evento

### Comportamento de Clique (Critical)

O EventsSection implementa **dois handlers de clique independentes**:

#### 1. Click no Card (Navegação)

```tsx
// Link wrapper = navega para página do evento
<Link href={`/evento/${event.slug.current}`}>
  {/* Todo o conteúdo do card */}
</Link>
```

- **Ação**: Navega para `/evento/{slug}`
- **Comportamento**: Navegação padrão do Next.js
- **UX**: Usuário visualiza detalhes completos do evento

#### 2. Click no Botão CTA (Ação)

```tsx
// Botão interno = executa ação do CTA
<button onClick={(e) => handleCTA(event, e)}>
  {event.cta.buttonText || "Garantir meu lugar"}
</button>
```

- **Ação**: Executa ação configurada no CMS (WhatsApp, email ou link)
- **Comportamento**: `e.preventDefault()` e `e.stopPropagation()` para não propagar ao card
- **UX**: Usuário toma ação imediata sem sair da página

#### Lógica do handleCTA

```typescript
const handleCTA = (event: Event, e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation(); // Evita propagação para o Link do card

  if (!event.cta.enabled) return;

  const whatsappNumber = event.cta.whatsapp || EVENT_DETAIL_FALLBACKS.globalWhatsapp;

  switch (event.cta.type) {
    case "whatsapp":
      const message = encodeURIComponent(event.cta.whatsappMessage || "");
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      break;
    
    case "email":
      const mailtoLink = `mailto:${event.cta.email || ""}`;
      const anchor = document.createElement("a");
      anchor.href = mailtoLink;
      anchor.click();
      break;
    
    case "link":
      window.open(event.cta.link, "_blank");
      break;
  }
};
```

### Formatação de Preço

```typescript
const formatPrice = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

// Uso:
{event.ticketPrice.free
  ? "Gratuito"
  : formatPrice(event.ticketPrice.value || 0)
}
// Output: "R$ 50,00"
```

### Fallbacks

Usa `TEXT_FALLBACKS.events` quando `section` é null:

```typescript
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";

const tag = section?.tag || TEXT_FALLBACKS.events.tag;
const title = section?.title || TEXT_FALLBACKS.events.title;
const description = section?.description || TEXT_FALLBACKS.events.description;
```

### Responsividade

| Breakpoint      | Grid     | Gap  |
| --------------- | -------- | ---- |
| Mobile (< 768px)| 1 coluna | 1rem |
| Tablet/Desktop  | 3 colunas| 1.5rem |

### Animações

Utiliza Framer Motion com variantes do `lib/animations.ts`:

```typescript
import { staggerContainerVariants, fadeInVariants } from "@/lib/animations";

<motion.div
  variants={staggerContainerVariants}
  initial="hidden"
  animate="visible"
>
  {events.map((event) => (
    <motion.div key={event._id} variants={fadeInVariants}>
      {/* Card */}
    </motion.div>
  ))}
</motion.div>
```

### Casos Especiais

#### Sem Eventos

```typescript
// Componente retorna null automaticamente
if (!data || data.length === 0) return null;
```

#### Evento sem Local

```typescript
// Local não é renderizado
{event.location?.name && (
  <div className="flex items-center gap-2">
    <MapPin className="w-4 h-4" />
    <span>{event.location.name}</span>
  </div>
)}
```

#### CTA sem WhatsApp Configurado

```typescript
// Usa fallback global do EVENT_DETAIL_FALLBACKS
const whatsappNumber = event.cta.whatsapp || EVENT_DETAIL_FALLBACKS.globalWhatsapp;
```

### Testes

```bash
npm test -- components/home/__tests__/EventsSection
```

Cobertura essencial:

- ✅ Renderização de eventos
- ✅ Exibição de local quando presente
- ✅ Formatação de preço pt-BR
- ✅ Click no card navega (Link)
- ✅ Click no CTA executa ação (preventDefault/stopPropagation)
- ✅ Fallback para WhatsApp global
- ✅ Retorna null quando sem dados

---

## EventGallery

Componente de galeria de fotos com lightbox modal para visualização detalhada.

### Importação

```typescript
import { EventGallery } from "@/components/events";
```

### Props

| Prop         | Tipo             | Obrigatório | Padrão | Descrição                                        |
| ------------ | ---------------- | ----------- | ------ | ------------------------------------------------ |
| `images`     | `GalleryImage[]` | ✅          | -      | Array de imagens da galeria                      |
| `eventTitle` | `string`         | ✅          | -      | Título do evento (usado em alt text de fallback) |

### Interface GalleryImage

```typescript
interface GalleryImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}
```

### Exemplos de Uso

#### Galeria Simples

```tsx
<EventGallery images={event.gallery} eventTitle={event.title} />
```

#### Com Validação

```tsx
{
  event.gallery && event.gallery.length > 0 && (
    <EventGallery images={event.gallery} eventTitle={event.title} />
  );
}
```

#### Com Toggle (Expandir/Recolher)

```tsx
const [showGallery, setShowGallery] = useState(false);

{
  showGallery ? (
    <>
      <EventGallery images={event.gallery} eventTitle={event.title} />
      <button onClick={() => setShowGallery(false)}>Ocultar galeria</button>
    </>
  ) : (
    <button onClick={() => setShowGallery(true)}>
      Ver galeria ({event.gallery.length} fotos)
    </button>
  );
}
```

### Características

#### Grid de Thumbnails

- **Layout**: Responsivo 2/3/4 colunas
- **Aspect Ratio**: Square (1:1)
- **Hover Effect**: Opacity reduzida + legenda aparece
- **Click**: Abre lightbox modal

#### Lightbox Modal

- **Fundo**: Preto semi-transparente (95%)
- **Navegação**: Setas esquerda/direita
- **Close**: Botão X no canto superior direito
- **Contador**: "1 / 10" no canto inferior central
- **Legenda**: Abaixo da imagem (se disponível)

### Navegação

#### Mouse/Touch

- Click na thumbnail → Abre lightbox naquela imagem
- Click nas setas → Próxima/anterior
- Click no X ou fundo → Fecha lightbox

#### Teclado

- `ArrowLeft` → Imagem anterior
- `ArrowRight` → Próxima imagem
- `Escape` → Fecha lightbox

#### Comportamento Circular

- Na última imagem, próxima → volta para primeira
- Na primeira imagem, anterior → vai para última

### Efeitos Colaterais

Quando o lightbox é aberto:

```typescript
document.body.style.overflow = "hidden"; // Bloqueia scroll
```

Quando é fechado:

```typescript
document.body.style.overflow = "unset"; // Restaura scroll
```

### Responsividade

| Breakpoint          | Colunas | Gap  |
| ------------------- | ------- | ---- |
| Mobile (< 768px)    | 2       | 1rem |
| Tablet (768-1200px) | 3       | 1rem |
| Desktop (> 1200px)  | 4       | 1rem |

### Otimização de Imagens

```tsx
// Thumbnails
<Image
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  // ...
/>

// Lightbox
<Image
  sizes="100vw"
  priority
  // ...
/>
```

### Acessibilidade

- **Alt Text**: Usa `image.alt` ou fallback `"${eventTitle} - Foto ${index + 1}"`
- **ARIA Labels**: Botões com `aria-label` descritivos
- **Navegação por Teclado**: Suporte completo
- **Focus Management**: Lightbox recebe foco ao abrir

### Animações

Utiliza Framer Motion:

```typescript
// Thumbnail hover
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Lightbox modal
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}

// Lightbox content
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}
```

### Casos de Uso

#### Sem Imagens

```tsx
// Componente retorna null automaticamente
{
  event.gallery && event.gallery.length > 0 && (
    <EventGallery images={event.gallery} eventTitle={event.title} />
  );
}
```

#### Uma Única Imagem

- Grid exibe 1 item
- Lightbox não exibe setas de navegação
- Contador: "1 / 1"

#### Múltiplas Imagens

- Grid exibe todas
- Lightbox com navegação completa
- Contador dinâmico

---

## Padrões de Uso Recomendados

### Eventos Futuros

```tsx
<EventCard event={upcomingEvent} />
// Não mostra galeria (eventos futuros não têm fotos)
```

### Eventos Passados - List View

```tsx
<div className="grid md:grid-cols-3 gap-6">
  <div className="md:col-span-1">
    <EventCard event={pastEvent} showGalleryIcon />
  </div>
  <div className="md:col-span-2">
    <Heading level={3}>{pastEvent.title}</Heading>
    <Text>{description}</Text>

    {pastEvent.gallery && pastEvent.gallery.length > 0 && (
      <EventGallery images={pastEvent.gallery} eventTitle={pastEvent.title} />
    )}
  </div>
</div>
```

### Grid de Eventos

```tsx
<Grid cols={3} gap="lg">
  {events.map((event) => (
    <EventCard key={event._id} event={event} />
  ))}
</Grid>
```

---

## Testes

### EventCard

```bash
npm test -- components/events/__tests__/EventCard
```

Cobertura:

- ✅ Renderização de dados
- ✅ Formatação de data/hora
- ✅ Preços gratuito/pago
- ✅ Badge de galeria
- ✅ Links corretos
- ✅ Imagens com alt

### EventGallery

```bash
npm test -- components/events/__tests__/EventGallery
```

Cobertura:

- ✅ Grid de imagens
- ✅ Lightbox open/close
- ✅ Navegação anterior/próxima
- ✅ Wrap-around circular
- ✅ Legendas
- ✅ Contador
- ✅ Caso de 1 imagem
- ✅ Array vazio retorna null

---

## Troubleshooting

### EventCard

**Problema**: Imagem não carrega

```typescript
// Verificar se buildSanityImageUrl está correto
const imageUrl = buildSanityImageUrl(event.coverImage.asset._ref);
console.log(imageUrl); // https://cdn.sanity.io/images/...
```

**Problema**: Data no timezone errado

```typescript
// JavaScript usa timezone local do navegador
const date = new Date(event.eventDate);
// Testes podem mostrar horários diferentes
```

**Problema**: Categoria não traduzida

```typescript
// Verificar se categoria existe no mapeamento
const CATEGORY_LABELS: Record<string, string> = { ... };
```

### EventGallery

**Problema**: Lightbox não fecha

```typescript
// Verificar se AnimatePresence está mockado nos testes
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));
```

**Problema**: Scroll não volta ao normal

```typescript
// Componente deve restaurar overflow ao desmontar
useEffect(() => {
  return () => {
    document.body.style.overflow = "unset";
  };
}, []);
```

**Problema**: Imagens muito grandes

```typescript
// Sanity otimiza automaticamente, mas pode especificar:
buildSanityImageUrl(ref).width(800).height(600).quality(80).url();
```
