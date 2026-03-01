# Documentação - Página Sobre Nós

## Visão Geral

A página "Sobre Nós" (`/sobre-nos`) apresenta informações institucionais sobre a Fundação Luzamor, incluindo história, missão, visão, impactos e equipe.

## Estrutura da Página

### 1. Hero Section

**Componente:** `AboutHeroSection`
**Schema:** `sobreNos.hero`

- Imagem de fundo fullscreen com overlay
- Tag, título e subtítulo left-aligned
- Min-height: 600px (mobile), 700px (desktop)

**Campos CMS:**

- `imagemFundo` (image): Imagem de background com hotspot
- `tag` (string): Tag superior (ex: "Sobre Nós")
- `titulo` (string): Título principal
- `subtitulo` (string): Subtítulo/descrição

### 2. Impactos Section

**Componente:** `AboutImpactsSection`
**Schema:** `sobreNos.impactos`

Grid de 4 cards mostrando números de impacto com ícones.

**Campos CMS:**

- `textoIntrodutorio` (portable text): Texto introdutório com suporte a highlight
- `itens` (array): Lista de impactos
  - `numero` (string): Número destacado (ex: "5.000+")
  - `titulo` (string): Título do impacto
  - `descricao` (string): Descrição
  - `icone` (string): Nome do ícone Lucide (dropdown com 30+ opções)

**Layout:**

- Grid: 2 colunas (mobile) → 4 colunas (desktop)
- Cards com altura uniforme (items-stretch)
- Ícone dinâmico renderizado via `DynamicIcon`

### 3. Nossa História (Timeline)

**Componente:** `OurHistorySection`
**Schema:** `sobreNos.nossaHistoria`

Timeline animada com scroll-driven green line.

**Campos CMS:**

- `tagline` (string): Tag da seção
- `titulo` (string): Título da seção
- `descricao` (string): Descrição
- `timeline` (array): Items da timeline
  - `ano` (string): Ano do evento
  - `tagline` (string): Tagline do item
  - `titulo` (string): Título do item
  - `descricao` (string): Descrição
  - `imagem` (image): Imagem ilustrativa

**Layout Desktop:**

- Grid 3 colunas: conteúdo | ano | conteúdo (alternado)
- Linha verde vertical central com animação de scroll (useScroll + scaleY)
- Anos com background circular centralizado

**Layout Mobile:**

- Vertical stack com border-left primary
- Anos inline com conteúdo

**Animações:**

- Scroll bidirectional (once: false)
- Items aparecem conforme scroll

### 4. Nossa Missão

**Componente:** `ContentImageSection`
**Schema:** `sobreNos.nossaMissao`

Seção com imagem e texto lado a lado.

**Props:**

- `imagePosition: "right"` - Imagem à direita
- `backgroundColor: "white"` - Fundo branco

### 5. Nossa Visão

**Componente:** `ContentImageSection`
**Schema:** `sobreNos.nossaVisao`

**Props:**

- `imagePosition: "left"` - Imagem à esquerda
- `backgroundColor: "light"` - Fundo neutro claro

### 6. Nossos Apoiadores

**Componente:** `SupportersSection`
**Dados:** Busca via `getFeaturedSupporters()`

Ticker horizontal com logos de apoiadores destaque.

### 7. Nosso Time

**Componente:** `OurTeamSection`
**Schema:** `sobreNos.nossoTime`
**Dados:** Busca via `getMembersPage()`

Grid alternado de membros da equipe com visualização inline de detalhes.

**Campos CMS (seção):**

- `tag` (string): Tag da seção
- `titulo` (string): Título
- `descricao` (string/portable text): Descrição da seção

**Campos CMS (membros):**

- `nome` (string): Nome do membro
- `cargo` (string): Cargo/função
- `foto` (image): Foto do membro
- `bioCurta` (text): Bio resumida
- `bioCompleta` (portable text): Bio detalhada
- `palavra` (portable text): Palavras/citações do membro
- `ordem` (number): Ordem de exibição

**Layout:**

- Grid 3 colunas com padrão alternado:
  - Linha ímpar: primeiro card span-2, segundo span-1
  - Linha par: primeiro card span-1, segundo span-2
- Overlay gradient em cards
- Indicador "Ver mais" para membros com bio

**Interatividade:**

- Click no card expande detalhes inline (mesma seção)
- AnimatePresence com transições smooth
- Grid desaparece, detalhes aparecem com botão "Voltar"
- Se cargo = "Presidente": mostra botão para `/palavra-presidente`

**Detalhes do Membro:**

- Grid 2 colunas: foto grande (350px) + conteúdo
- Bio curta destacada com borda primária
- Bio completa e palavras em PortableText
- Botão CTA se for presidente

## Data Flow

```
aboutService.ts (Promise.all)
  ├─ getAboutPage() → GROQ aboutPageQuery
  ├─ getFeaturedSupporters()
  └─ getMembersPage()
      ↓
SobreNosTemplate (Server Component)
      ↓
Individual Sections (Client Components)
```

## Queries GROQ

### About Page Query

```groq
*[_type == "sobreNos"][0]{
  hero { imagemFundo, tag, titulo, subtitulo },
  impactos { textoIntrodutorio[], itens[]{ numero, titulo, descricao, icone } },
  nossaHistoria { tagline, titulo, descricao, timeline[]{ ano, tagline, titulo, descricao, imagem } },
  nossaMissao { tag, titulo, descricao, imagem },
  nossaVisao { tag, titulo, descricao, imagem },
  nossoTime { tag, titulo, descricao }
}
```

### Members Page Query

```groq
*[_type == "membro"] | order(ordem asc){
  _id,
  "name": nome,
  "role": cargo,
  "photo": foto,
  "shortBio": bioCurta,
  "fullBio": bioCompleta,
  "words": palavra
}
```

## Fallbacks

Todos os textos possuem fallbacks em `constants/textFallbacks.ts`:

```typescript
ABOUT_PAGE_FALLBACKS = {
  hero: { tag, title, subtitle },
  impacts: { introText, items[] },
  history: { tagline, title, description, timeline[] },
  mission: { tag, title, description },
  vision: { tag, title, description },
  team: { tag, title, description }
}
```

## Rotas

Utiliza constante centralizada em `constants/routesPath.ts`:

```typescript
routesPath.about; // "/sobre-nos"
routesPath.presidentWord; // "/palavra-presidente"
```

## Componentes Reutilizáveis

- `Section` - Wrapper com padding/container
- `SectionHeader` - Tag + título + descrição (layouts: center, left, split)
- `Button` - Botão animado com variants
- `DynamicIcon` - Renderiza ícones Lucide dinamicamente por nome
- `ContentImageSection` - Seção texto + imagem (reusada em missão/visão)

## Ícones Disponíveis

30+ ícones Lucide configurados em `constants/iconOptions.ts`:

- Heart, Users, Award, Target, TrendingUp, etc.
- Dropdown amigável no CMS com títulos em português

## Animações

- **Framer Motion** para todas as animações
- **Viewport triggers** com once: true/false conforme necessidade
- **AnimatePresence** para transições grid ↔ detalhes
- **Scroll-driven** na timeline (useScroll + useTransform)
- **Stagger animations** em cards e grids

## Mobile Responsive

- Timeline: layout vertical simplificado com borda esquerda
- Grid time: 1 coluna → 3 colunas com spans alternados
- Imagens: aspect ratios mantidos, max-width 100%
- Textos: font-sizes escalados (5xl → 7xl)

## Tipos TypeScript

**Interfaces principais:**

- `AboutPage` - Estrutura completa da página
- `AboutHero` - Hero section
- `ImpactsSection` - Seção de impactos
- `TimelineItem` - Item da timeline
- `OurTeam` - Seção equipe
- `Member` - Membro da equipe

Todos em `sanity/lib/types/about.ts` e `sanity/lib/types/member.ts`.

## Troubleshooting

### PortableText rendering errors

- Sempre usar `getDescription()` helper para extrair texto
- Verifica se campo é string ou PortableTextBlock[]
- Fallback para texto simples quando necessário

### AnimatePresence bugs

- mode="wait" evita conflitos de múltiplas animações
- key único para cada estado (grid vs details)
- Header fora do AnimatePresence para persistir

### Grid layout issues

- Usar `items-stretch` para altura uniforme de cards
- Mobile first: col-span-full → responsive breakpoints
- Auto-rows para altura consistente

## Melhorias Futuras

- [ ] Lazy load de imagens da timeline
- [ ] Animação de números (countup) nos impactos
- [ ] Filtro de membros por cargo/área
- [ ] Compartilhamento de perfil de membro
- [ ] Versão impressa da timeline
