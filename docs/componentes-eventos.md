# Componentes de Eventos

Documentação de referência dos componentes relacionados a eventos da Fundação Luz & Amor.

## Índice

- [EventCard](#eventcard)
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
    additionalInfo?: string;
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
    caption?: string;
  }[];
  featured: boolean;
  active: boolean;
  highlightColor?: string;
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
  caption?: string;
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
