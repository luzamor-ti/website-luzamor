# Website Fundação Luzamor

Site institucional da Fundação Luzamor construído com **Next.js 16** (App Router), **Sanity CMS** e **Framer Motion**.

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Pré-requisitos e Instalação](#pré-requisitos-e-instalação)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Estrutura de Diretórios](#estrutura-de-diretórios)
6. [Arquitetura e Fluxo de Dados](#arquitetura-e-fluxo-de-dados)
7. [Páginas e Rotas](#páginas-e-rotas)
8. [Componentes](#componentes)
9. [Sistema de Animações](#sistema-de-animações)
10. [Integração com Sanity CMS](#integração-com-sanity-cms)
11. [Schemas do Sanity](#schemas-do-sanity)
12. [Queries GROQ](#queries-groq)
13. [Camada de Serviços](#camada-de-serviços)
14. [Tipos TypeScript](#tipos-typescript)
15. [Configuração de Estilos](#configuração-de-estilos)
16. [Configuração do Layout Raiz](#configuração-do-layout-raiz)
17. [Configurações do Projeto](#configurações-do-projeto)
18. [Scripts Disponíveis](#scripts-disponíveis)

---

## Visão Geral

Este é o site institucional da Fundação Luzamor. Ele apresenta:

- **Hero** com título e subtítulo configuráveis via CMS
- **Seção de Projetos** com cards e informações de arrecadação
- **Seção de Membros** da equipe
- **Seção de Apoiadores** com logos e links externos
- **FAQ** com acordeão animado
- **Contato** com informações de email, telefone e endereço
- **Sanity Studio** embutido na rota `/fundacao-luzamor-cms` para edição de conteúdo

Todo o conteúdo é gerenciado pelo Sanity CMS e servido via SSR (Server-Side Rendering) sem cache explícito por padrão.

---

## Stack Tecnológica

| Tecnologia            | Versão  | Papel                                           |
| --------------------- | ------- | ----------------------------------------------- |
| **Next.js**           | 16.1.6  | Framework principal (App Router, SSR)           |
| **React**             | 19.2.3  | Camada de UI                                    |
| **TypeScript**        | 5       | Tipagem estática                                |
| **Tailwind CSS**      | 4.2.0   | Estilização utility-first                       |
| **Framer Motion**     | 12.34.2 | Animações declarativas                          |
| **Sanity**            | 4.22.0  | Headless CMS (Content Lake)                     |
| **next-sanity**       | 11.6.12 | Integração Next.js ↔ Sanity                     |
| **@sanity/client**    | 7.15.0  | Cliente da API do Sanity                        |
| **@sanity/image-url** | 1.2.0   | Geração de URLs de imagens otimizadas           |
| **@sanity/vision**    | 4.22.0  | Plugin para testar queries GROQ no Studio       |
| **styled-components** | 6.3.10  | CSS-in-JS (instalado, não utilizado ativamente) |
| **uuid**              | 13.0.0  | Geração de IDs únicos                           |

**Node.js**: v24.12.0 (definido em `.nvmrc`)

---

## Pré-requisitos e Instalação

```bash
# 1. Clonar o repositório
git clone <url-do-repo>
cd website-luzamor

# 2. Usar a versão correta do Node (requer nvm)
nvm use

# 3. Instalar dependências
npm install

# 4. Configurar variáveis de ambiente
cp .env.example .env.local
# editar .env.local com os valores corretos

# 5. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` para ver o site.
Acesse `http://localhost:3000/fundacao-luzamor-cms` para o Sanity Studio.

---

## Variáveis de Ambiente

O arquivo `.env.local` deve conter:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="ost5j43h"
NEXT_PUBLIC_SANITY_DATASET="production"
```

| Variável                         | Obrigatória | Descrição                            |
| -------------------------------- | ----------- | ------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sim         | ID do projeto no Sanity (`ost5j43h`) |
| `NEXT_PUBLIC_SANITY_DATASET`     | Sim         | Dataset do Sanity (`production`)     |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Não         | Versão da API (padrão: `2026-02-11`) |

Todas as variáveis são prefixadas com `NEXT_PUBLIC_` pois são seguras para exposição no client-side (não contêm segredos).

---

## Estrutura de Diretórios

```
website-luzamor/
│
├── app/                                         # App Router do Next.js
│   ├── page.tsx                                 # Página inicial (SSR)
│   ├── layout.tsx                               # Layout raiz com tema e metadados
│   ├── globals.css                              # Estilos globais
│   ├── favicon.ico
│   ├── [slug]/
│   │   └── page.tsx                             # Rota dinâmica por slug (placeholder vazio)
│   └── fundacao-luzamor-cms/
│       └── [[...tool]]/
│           └── page.tsx                         # Sanity Studio embarcado
│
├── components/
│   ├── home/                                    # Seções da página inicial
│   │   ├── HeroSection.tsx
│   │   ├── ProjetosSection.tsx
│   │   ├── MembrosSection.tsx
│   │   ├── ApoiadoresSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── ContatoSection.tsx
│   │   └── index.ts                             # Re-exports centralizados
│   └── animations/
│       └── FadeIn.tsx                           # Wrapper genérico de fade-in
│
├── lib/
│   └── animations.ts                            # Biblioteca de variantes Framer Motion
│
├── sanity/
│   ├── env.ts                                   # Leitura das env vars do Sanity
│   ├── config.ts                                # Configuração do Sanity Studio
│   ├── structure.ts                             # Estrutura do painel do Studio
│   ├── sanity.config.ts                         # (raiz) Config do Sanity CLI
│   │
│   ├── lib/
│   │   ├── client.ts                            # Instância do createClient
│   │   ├── image.ts                             # Builder de URLs de imagem
│   │   ├── live.ts                              # API de conteúdo ao vivo
│   │   ├── index.ts                             # Exports públicos da lib
│   │   │
│   │   ├── queries/                             # Queries GROQ puras
│   │   │   ├── projeto.ts
│   │   │   ├── membro.ts
│   │   │   ├── apoiador.ts
│   │   │   ├── faq.ts
│   │   │   ├── contato.ts
│   │   │   ├── configuracao.ts
│   │   │   ├── pagina.ts
│   │   │   └── trabalho.ts
│   │   │
│   │   ├── services/                            # Funções de busca de dados
│   │   │   ├── homeService.ts                   # Orquestrador da página inicial
│   │   │   ├── projetoService.ts
│   │   │   ├── membroService.ts
│   │   │   ├── apoiadorService.ts
│   │   │   ├── faqService.ts
│   │   │   ├── contatoService.ts
│   │   │   ├── configuracaoService.ts
│   │   │   ├── paginaService.ts
│   │   │   └── trabalhoService.ts
│   │   │
│   │   └── types/                               # Interfaces TypeScript dos documentos
│   │       ├── projeto.ts
│   │       ├── membro.ts
│   │       ├── apoiador.ts
│   │       ├── faq.ts
│   │       ├── contato.ts
│   │       ├── configuracao.ts
│   │       ├── pagina.ts
│   │       └── trabalho.ts
│   │
│   └── schemaTypes/                             # Schemas de conteúdo do Sanity
│       ├── projeto.ts
│       ├── membro.ts
│       ├── apoiador.ts
│       ├── faq.ts
│       ├── trabalho.ts
│       ├── configuracaoGlobal.ts
│       ├── navbar.ts
│       └── rodape.ts
│
├── public/                                      # Assets estáticos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .env.local                                   # Variáveis de ambiente locais
├── .nvmrc                                       # Versão do Node (24.12.0)
├── next.config.ts                               # Configuração do Next.js
├── tailwind.config.ts                           # Configuração do Tailwind CSS
├── postcss.config.mjs                           # Configuração do PostCSS
├── tsconfig.json                                # Configuração do TypeScript
├── sanity.cli.ts                                # Configuração do Sanity CLI
├── eslint.config.mjs                            # Configuração do ESLint
└── package.json
```

---

## Arquitetura e Fluxo de Dados

O projeto segue uma arquitetura em camadas para separar responsabilidades:

```
Sanity Content Lake (banco de dados na nuvem)
        │
        │  GROQ Queries (sanity/lib/queries/)
        ▼
Sanity Client (sanity/lib/client.ts)
        │
        │  fetch() calls
        ▼
Services (sanity/lib/services/)
        │
        │  Promise.all() em homeService.ts
        ▼
Page (app/page.tsx) — Server Component (SSR)
        │
        │  props
        ▼
Section Components (components/home/)
        │
        │  Framer Motion (lib/animations.ts)
        ▼
Browser (HTML renderizado com animações)
```

### Fluxo detalhado da página inicial

1. O usuário acessa `/`.
2. `app/page.tsx` é um **Server Component assíncrono** — executa no servidor a cada requisição.
3. Chama `getHomeData()` do `homeService.ts`.
4. O `homeService.ts` dispara **6 queries em paralelo** via `Promise.all()`:
   - `getProjetosHome()` — 3 projetos ativos mais recentes
   - `getMembrosHome()` — 4 primeiros membros por ordem
   - `getApoiadoresDestaque()` — apoiadores com `destaque: true`
   - `getFaqResumo()` — primeiras 6 perguntas
   - `getContatos()` — todos os contatos
   - `getConfiguracaoGlobal()` — configuração global (cores, hero)
5. Os dados chegam como objeto `HomeData` tipado.
6. `app/page.tsx` distribui cada array para seu respectivo componente de seção via props.
7. Os componentes renderizam com animações Framer Motion (client-side, via `'use client'`).

**Por que `Promise.all()`?**
O tempo de espera é o da query mais lenta, não a soma de todas. Exemplo: 6 queries de 200ms cada levam ~200ms em paralelo, versus ~1200ms em série.

---

## Páginas e Rotas

| Rota                              | Arquivo                                         | Tipo                   | Descrição                                               |
| --------------------------------- | ----------------------------------------------- | ---------------------- | ------------------------------------------------------- |
| `/`                               | `app/page.tsx`                                  | Server Component (SSR) | Página principal com todas as seções                    |
| `/[slug]`                         | `app/[slug]/page.tsx`                           | Server Component       | Rota dinâmica para páginas por slug (placeholder vazio) |
| `/fundacao-luzamor-cms`           | `app/fundacao-luzamor-cms/[[...tool]]/page.tsx` | Client Component       | Sanity Studio embutido                                  |
| `/fundacao-luzamor-cms/[...tool]` | mesma rota acima                                | Client Component       | Subcaminhos do Studio (desk, vision, etc.)              |

### `app/page.tsx`

```tsx
// Server Component — executa no servidor, sem estado local
export default async function Home() {
  const { projetos, membros, apoiadores, faq, contatos, configuracao } =
    await getHomeData();

  return (
    <main>
      <HeroSection data={configuracao} />
      <ProjetosSection data={projetos} />
      <MembrosSection data={membros} />
      <ApoiadoresSection data={apoiadores} />
      <FaqSection data={faq} />
      <ContatoSection data={contatos} />
    </main>
  );
}
```

### `app/fundacao-luzamor-cms/[[...tool]]/page.tsx`

```tsx
// Monta o Sanity Studio completo dentro da aplicação Next.js
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

---

## Componentes

### `components/home/index.ts`

Re-exporta todos os componentes de seção para importação limpa:

```ts
export { HeroSection } from "./HeroSection";
export { ProjetosSection } from "./ProjetosSection";
export { MembrosSection } from "./MembrosSection";
export { ApoiadoresSection } from "./ApoiadoresSection";
export { FaqSection } from "./FaqSection";
export { ContatoSection } from "./ContatoSection";
```

### `HeroSection`

- **Props:** `data: ConfiguracaoGlobal | null`
- **Função:** Exibe o banner principal com título (`tituloHero`) e subtítulo (`subtituloHero`) vindos do CMS.
- **Animação:** Stagger container + itens com `slideUpVariants`. Executa ao carregar a página (sem `whileInView`, pois já está visível).

### `ProjetosSection`

- **Props:** `data: Projeto[]`
- **Função:** Grid de 3 colunas exibindo cards de projetos com imagem de capa e descrição curta.
- **Animação:** `scrollRevealVariants` com `whileInView` — cada card revela ao entrar na viewport. Hover com `hoverLiftVariants` (sobe -8px).
- **Condicional:** Retorna `null` se `data` estiver vazio.

### `MembrosSection`

- **Props:** `data: Membro[]`
- **Função:** Grid de 4 colunas exibindo foto, nome e cargo de cada membro.
- **Estilo:** Seção com fundo cinza (`bg-gray-100`).
- **Animação:** `scaleInVariants` para cada card, acionado por scroll.

### `ApoiadoresSection`

- **Props:** `data: Apoiador[]`
- **Função:** Exibe logos dos apoiadores em linha. Se o apoiador tiver `site`, o logo é um link externo (`target="_blank"`).
- **Animação:** `hoverLiftVariants` em cada item. Seção revela com `scrollRevealVariants`.

### `FaqSection`

- **Props:** `data: Faq[]`
- **Função:** Acordeão de perguntas e respostas. Apenas uma pergunta pode estar aberta por vez.
- **Estado interno:** `openId: string | null` — ID da pergunta aberta. Togglado pelo botão.
- **Animação:**
  - Stagger container/item para entrada dos cards.
  - `AnimatePresence` do Framer Motion controla a entrada/saída do conteúdo.
  - O `+` do botão rotaciona 45° (vira `×`) quando aberto.
  - A altura do painel expande de `height: 0` para `height: "auto"`.
- **Condicional:** Retorna `null` se `data` estiver vazio.

### `ContatoSection`

- **Props:** `data: Contato[]`
- **Função:** Exibe cards de contato (email, telefone, endereço).
- **Animação:** Itens alternados — índice par usa `slideInFromLeftVariants`, ímpar usa `slideInFromRightVariants`.

### `components/animations/FadeIn.tsx`

Wrapper genérico reutilizável:

```tsx
"use client";
// Envolve qualquer filho com uma animação de fade + slide-up ao montar
function FadeIn({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Sistema de Animações

Arquivo: `lib/animations.ts`

Todos os componentes de animação usam `'use client'` e são baseados **apenas em `opacity` e `transform`** (propriedades GPU-accelerated). Nunca se anima `width`, `height`, `padding` ou `margin` para evitar reflow/layout shift.

### Variantes disponíveis

| Export                     | Estado inicial            | Estado final           | Uso                            |
| -------------------------- | ------------------------- | ---------------------- | ------------------------------ |
| `fadeInVariants`           | `opacity: 0`              | `opacity: 1`           | Fade simples                   |
| `slideUpVariants`          | `opacity: 0, y: 20`       | `opacity: 1, y: 0`     | Entrada de baixo para cima     |
| `slideInFromLeftVariants`  | `opacity: 0, x: -40`      | `opacity: 1, x: 0`     | Entrada da esquerda            |
| `slideInFromRightVariants` | `opacity: 0, x: 40`       | `opacity: 1, x: 0`     | Entrada da direita             |
| `scaleInVariants`          | `opacity: 0, scale: 0.95` | `opacity: 1, scale: 1` | Aparecimento com escala        |
| `scrollRevealVariants`     | `opacity: 0, y: 40`       | `opacity: 1, y: 0`     | Reveal ao entrar na viewport   |
| `staggerContainerVariants` | `opacity: 0`              | `opacity: 1`           | Container pai para stagger     |
| `staggerItemVariants`      | `opacity: 0, y: 20`       | `opacity: 1, y: 0`     | Filhos do stagger              |
| `hoverLiftVariants`        | `y: 0`                    | `y: -8` (hover)        | Cards que sobem no hover       |
| `hoverScaleVariants`       | `scale: 1`                | `scale: 1.05` (hover)  | Elementos que crescem no hover |
| `numberCounterVariants`    | `opacity: 0`              | `opacity: 1`           | Para contadores numéricos      |
| `parallaxVariants`         | `y: 0`                    | `y: 10`                | Parallax suave no scroll       |

### Configurações de transição

```ts
export const easeConfig = {
  smooth: [0.25, 0.46, 0.45, 0.94], // Curva cúbica suave
  spring: { type: "spring", stiffness: 100, damping: 15 }, // Mola suave
  bouncy: { type: "spring", stiffness: 120, damping: 12 }, // Mola com bounce
};
```

### Presets de delay

```ts
export const delayPresets = {
  none: 0,
  xs: 0.1,
  sm: 0.2,
  md: 0.3,
  lg: 0.4,
  xl: 0.5,
};
```

### Padrão de uso com scroll

```tsx
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainerVariants}
>
  {items.map((item) => (
    <motion.div key={item._id} variants={staggerItemVariants}>
      {/* conteúdo */}
    </motion.div>
  ))}
</motion.section>
```

- `once: true` — a animação dispara apenas uma vez por página
- `margin: "-100px"` — começa 100px antes do elemento ser totalmente visível
- `staggerChildren: 0.1` — 100ms de intervalo entre cada filho

---

## Integração com Sanity CMS

### Configuração do cliente

**`sanity/lib/client.ts`**

```ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ost5j43h",
  dataset: "production",
  apiVersion: "2026-02-11",
  useCdn: true, // CDN ativada para leituras públicas
});
```

- `useCdn: true` usa a rede de borda do Sanity para respostas mais rápidas em produção.
- A `apiVersion` garante comportamento estável da API mesmo em futuras atualizações.

### Builder de imagens

**`sanity/lib/image.ts`**

```ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
```

Uso nos componentes:

```tsx
<img src={urlFor(projeto.imagemCapa).width(400).url()} alt={projeto.titulo} />
```

### Live Content API

**`sanity/lib/live.ts`** — exporta o helper `sanityFetch` e `SanityLive` do `next-sanity` para conteúdo revalidado automaticamente (Sanity Content Lake Webhooks / React cache).

### Configuração do Studio

**`sanity.config.ts`** (raiz do projeto):

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Fundação Luzamor",
  projectId: "ost5j43h",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

O `visionTool` adiciona uma aba no Studio para testar queries GROQ interativamente.

---

## Schemas do Sanity

Os schemas definem a estrutura dos documentos no CMS. Ficam em `sanity/schemaTypes/`.

### `projeto`

Representa um projeto da fundação.

| Campo             | Tipo            | Obrigatório | Descrição                               |
| ----------------- | --------------- | ----------- | --------------------------------------- |
| `titulo`          | `string`        | Sim         | Título do projeto                       |
| `slug`            | `slug`          | Não         | URL amigável, gerado a partir do título |
| `imagemCapa`      | `image`         | Não         | Imagem de capa                          |
| `descricaoCurta`  | `text`          | Não         | Descrição para listagem                 |
| `conteudo`        | `array` (block) | Não         | Conteúdo rico (rich text)               |
| `valorMeta`       | `number`        | Não         | Meta de arrecadação                     |
| `valorArrecadado` | `number`        | Não         | Valor já arrecadado                     |
| `ativo`           | `boolean`       | Não         | Se aparece no site (padrão: `true`)     |

### `membro`

Representa um integrante da equipe.

| Campo         | Tipo            | Obrigatório | Descrição           |
| ------------- | --------------- | ----------- | ------------------- |
| `nome`        | `string`        | Sim         | Nome completo       |
| `cargo`       | `string`        | Não         | Cargo ou função     |
| `foto`        | `image`         | Não         | Foto de perfil      |
| `bioCurta`    | `text`          | Não         | Bio para cards      |
| `bioCompleta` | `array` (block) | Não         | Bio detalhada       |
| `ordem`       | `number`        | Não         | Posição na listagem |

### `apoiador`

Representa um apoiador ou patrocinador.

| Campo      | Tipo      | Obrigatório | Descrição                            |
| ---------- | --------- | ----------- | ------------------------------------ |
| `nome`     | `string`  | Sim         | Nome do apoiador                     |
| `logo`     | `image`   | Não         | Logo da empresa/pessoa               |
| `site`     | `url`     | Não         | Website externo                      |
| `destaque` | `boolean` | Não         | Se aparece na home (padrão: `false`) |
| `ordem`    | `number`  | Não         | Posição na listagem                  |

### `faq`

Representa uma pergunta frequente.

| Campo       | Tipo            | Obrigatório | Descrição                        |
| ----------- | --------------- | ----------- | -------------------------------- |
| `pergunta`  | `string`        | Sim         | Texto da pergunta                |
| `resposta`  | `array` (block) | Sim         | Resposta em rich text            |
| `categoria` | `string`        | Não         | Agrupamento                      |
| `ordem`     | `number`        | Não         | Ordem de exibição                |
| `ativo`     | `boolean`       | Não         | Se está visível (padrão: `true`) |

### `trabalho`

Representa um trabalho, evento ou curso.

| Campo       | Tipo            | Obrigatório | Descrição          |
| ----------- | --------------- | ----------- | ------------------ |
| `titulo`    | `string`        | Sim         | Título             |
| `slug`      | `slug`          | Não         | URL amigável       |
| `imagem`    | `image`         | Não         | Imagem de destaque |
| `descricao` | `text`          | Não         | Descrição curta    |
| `conteudo`  | `array` (block) | Não         | Conteúdo completo  |
| `categoria` | `string`        | Não         | Classificação      |

### `configuracaoGlobal`

Documento singleton com configurações gerais do site.

| Campo                | Tipo     | Descrição              |
| -------------------- | -------- | ---------------------- |
| `nomeSite`           | `string` | Nome do site           |
| `descricaoSite`      | `text`   | Meta description       |
| `logo`               | `image`  | Logo da fundação       |
| `tituloHero`         | `string` | Título do hero da home |
| `subtituloHero`      | `text`   | Subtítulo do hero      |
| `contato.email`      | `string` | Email principal        |
| `contato.telefone`   | `string` | Telefone               |
| `contato.endereco`   | `text`   | Endereço               |
| `contato.facebook`   | `url`    | Link Facebook          |
| `contato.instagram`  | `url`    | Link Instagram         |
| `contato.linkedin`   | `url`    | Link LinkedIn          |
| `tema.corPrimaria`   | `string` | Cor primária (hex)     |
| `tema.corSecundaria` | `string` | Cor secundária (hex)   |
| `tema.corDestaque`   | `string` | Cor de destaque        |
| `tema.corFundo`      | `string` | Cor de fundo           |
| `tema.corTexto`      | `string` | Cor do texto           |

As cores do `tema` são injetadas como CSS custom properties no `<body>` via `layout.tsx` e consumidas pelo Tailwind.

### `navbar`

Configuração do menu de navegação.

| Campo                         | Tipo        | Descrição                           |
| ----------------------------- | ----------- | ----------------------------------- |
| `itens`                       | `array`     | Lista de itens do menu              |
| `itens[].tituloPersonalizado` | `string`    | Label exibido                       |
| `itens[].pagina`              | `reference` | Referência a uma página (comentado) |
| `itens[].submenu`             | `array`     | Subitens com mesma estrutura        |

### `rodape`

Configuração do rodapé do site.

| Campo                   | Tipo     | Descrição                        |
| ----------------------- | -------- | -------------------------------- |
| `slogan`                | `string` | Texto de slogan                  |
| `sejaApoiadorTitulo`    | `string` | Título da CTA de apoio           |
| `sejaApoiadorSubtitulo` | `text`   | Subtítulo da CTA                 |
| `emailDestino`          | `string` | Email para formulário de contato |
| `contatos.email`        | `string` | Email exibido                    |
| `contatos.telefone`     | `string` | Telefone exibido                 |
| `contatos.endereco`     | `string` | Endereço exibido                 |
| `contatos.linkMaps`     | `url`    | Link para Google Maps            |

---

## Queries GROQ

Ficam em `sanity/lib/queries/`. Cada arquivo exporta strings de query GROQ nomeadas.

### `queries/projeto.ts`

```groq
// Top 3 projetos ativos, mais recentes primeiro
*[_type == "projeto" && ativo == true] | order(_createdAt desc) [0...3]

// Todos os projetos ativos
*[_type == "projeto" && ativo == true] | order(_createdAt desc)

// Projeto por slug
*[_type == "projeto" && slug.current == $slug][0]
```

### `queries/membro.ts`

```groq
// Primeiros 4 membros por campo "ordem"
*[_type == "membro"] | order(ordem asc) [0...4]

// Todos os membros
*[_type == "membro"] | order(ordem asc)
```

### `queries/apoiador.ts`

```groq
// Apenas apoiadores em destaque, por ordem
*[_type == "apoiador" && destaque == true] | order(ordem asc)
```

### `queries/faq.ts`

```groq
// Todas as FAQs ativas, por ordem
*[_type == "faq" && ativo == true] | order(ordem asc)

// Primeiras 6 FAQs (resumo para home)
*[_type == "faq" && ativo == true] | order(ordem asc) [0...6]
```

### `queries/contato.ts`

```groq
// Primeiro documento de contato
*[_type == "contato"][0]

// Todos os documentos de contato
*[_type == "contato"]
```

### `queries/configuracao.ts`

```groq
// Documento singleton de configuração global
*[_type == "configuracaoGlobal"][0]
```

### `queries/pagina.ts`

```groq
// Página por slug (para rota dinâmica [slug])
*[_type == "pagina" && slug.current == $slug][0]
```

### `queries/trabalho.ts`

```groq
// Todos os trabalhos, mais recentes primeiro
*[_type == "trabalho"] | order(_createdAt desc)
```

---

## Camada de Serviços

Ficam em `sanity/lib/services/`. Cada arquivo exporta funções assíncronas que encapsulam `client.fetch()`.

### `homeService.ts` — Orquestrador Principal

```ts
export interface HomeData {
  projetos: Projeto[];
  membros: Membro[];
  apoiadores: Apoiador[];
  faq: Faq[];
  contatos: Contato[];
  configuracao: ConfiguracaoGlobal | null;
}

export async function getHomeData(): Promise<HomeData> {
  const [projetos, membros, apoiadores, faq, contatos, configuracao] =
    await Promise.all([
      getProjetosHome(),
      getMembrosHome(),
      getApoiadoresDestaque(),
      getFaqResumo(),
      getContatos(),
      getConfiguracaoGlobal(),
    ]);

  return { projetos, membros, apoiadores, faq, contatos, configuracao };
}
```

Este é o único ponto de entrada da página inicial. Ao modificar o que a home consome, apenas este arquivo precisa ser alterado.

### Demais services

Cada service individual segue o padrão:

```ts
// Exemplo: projetoService.ts
import { client } from "../client";
import {
  projetosHomeQuery,
  projetosPageQuery,
  projetoBySlugQuery,
} from "../queries/projeto";
import { Projeto } from "../types/projeto";

export async function getProjetosHome(): Promise<Projeto[]> {
  return client.fetch(projetosHomeQuery);
}

export async function getProjetos(): Promise<Projeto[]> {
  return client.fetch(projetosPageQuery);
}

export async function getProjetoBySlug(slug: string): Promise<Projeto | null> {
  return client.fetch(projetoBySlugQuery, { slug });
}
```

---

## Tipos TypeScript

Ficam em `sanity/lib/types/`. Espelham a estrutura dos schemas do Sanity.

```ts
// tipos/projeto.ts
export interface Projeto {
  _id: string;
  titulo: string;
  slug: string;
  imagemCapa: any; // SanityImageSource
  descricaoCurta?: string;
  conteudo?: any; // PortableText blocks
  valorMeta?: number;
  valorArrecadado?: number;
}

// tipos/membro.ts
export interface Membro {
  _id: string;
  nome: string;
  cargo: string;
  foto: any;
  bioCurta?: string;
  bioCompleta?: string;
  ordem?: number;
}

// tipos/apoiador.ts
export interface Apoiador {
  _id: string;
  nome: string;
  logo: any;
  site?: string;
  destaque?: boolean;
  ordem?: number;
}

// tipos/faq.ts
export interface Faq {
  _id: string;
  pergunta: string;
  resposta: string; // Convertido de rich text para string no service
  ordem?: number;
}

// tipos/contato.ts
export interface Contato {
  _id: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

// tipos/configuracao.ts
export interface ConfiguracaoGlobal {
  _id: string;
  tituloHero?: string;
  subtituloHero?: string;
  logo?: any;
  corPrimaria?: string;
  corSecundaria?: string;
}

// tipos/pagina.ts
export interface Pagina {
  _id: string;
  titulo: string;
  slug: string;
  conteudo?: any;
}

// tipos/trabalho.ts
export interface Trabalho {
  _id: string;
  titulo: string;
  descricao?: string;
}
```

> **Nota:** Os campos de imagem (`imagemCapa`, `foto`, `logo`) são tipados como `any` para compatibilidade com `@sanity/image-url`. Em projetos maiores, podem ser tipados como `SanityImageSource` do `@sanity/image-url`.

---

## Configuração de Estilos

### `tailwind.config.ts`

```ts
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, #6366f1)",
        secondary: "var(--color-secondary, #8b5cf6)",
        bg: "var(--color-bg, #ffffff)",
        text: "var(--color-text, #1f2937)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
};
```

As classes `text-primary`, `bg-secondary`, etc. leem diretamente os CSS custom properties injetados pelo `layout.tsx`. Isso permite que o tema seja alterado via Sanity Studio sem redeploy.

### `app/globals.css`

Importa o Tailwind v4 via `@import "tailwindcss"` e define reset/base styles globais.

### `postcss.config.mjs`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## Configuração do Layout Raiz

**`app/layout.tsx`** — Executa no servidor a cada requisição.

**Responsabilidades:**

1. **Fontes:** Carrega `Geist` e `Geist_Mono` do Google Fonts via `next/font` e injeta como CSS variables `--font-geist-sans` e `--font-geist-mono`.
2. **Metadados:** Define `title`, `description`, `metadataBase` e `openGraph` para SEO e compartilhamento social.
3. **Tema dinâmico:** Busca `configuracaoGlobal` do Sanity e injeta as cores como CSS custom properties inline no `<body>`:
   ```tsx
   style={{
     "--color-primary": tema.corPrimaria,
     "--color-secondary": tema.corSecundaria,
     "--color-accent": tema.corDestaque,
     "--color-bg": tema.corFundo,
     "--color-text": tema.corTexto,
   } as React.CSSProperties}
   ```
4. **Navbar e Rodapé:** Busca dados de `navbar` e `rodape` do Sanity (disponíveis para uso futuro — atualmente não renderizados).
5. **Idioma:** Define `<html lang="pt-BR">`.

---

## Configurações do Projeto

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./*"] }
  }
}
```

O alias `@/` mapeia para a raiz do projeto. Use `@/components/...`, `@/sanity/...`, `@/lib/...` em todos os imports.

### `next.config.ts`

Configuração mínima, sem customizações ativas.

### `sanity.cli.ts`

```ts
import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: { projectId: "ost5j43h", dataset: "production" },
});
```

Usado pelos comandos `sanity deploy`, `sanity manage`, etc.

### `eslint.config.mjs`

Usa as presets `next/core-web-vitals` e `next/typescript`. Ignora `.next/`, `out/`, `build/`.

---

## Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento em localhost:3000
npm run build    # Gera o build de produção otimizado
npm run start    # Inicia o servidor de produção (requer build)
npm run lint     # Executa o ESLint em todos os arquivos
```

---

## Decisões Arquiteturais

| Decisão                                         | Justificativa                                                              |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| `homeService` como orquestrador único           | Centraliza a lógica de dados da home em um único ponto de mudança          |
| `Promise.all()` para queries paralelas          | Tempo = query mais lenta, não soma de todas                                |
| Queries separadas dos services                  | Queries são strings puras (testáveis no Vision), services gerenciam fetch  |
| Types em pasta dedicada                         | Reutilização entre services e components sem duplicação                    |
| Apenas `opacity` e `transform` nas animações    | GPU-accelerated: 60fps estáveis sem layout thrashing                       |
| `viewport: { once: true }`                      | Animações disparam uma vez só — não re-executa ao scrollar de volta        |
| CSS variables para tema                         | Cores mudam pelo CMS sem necessidade de redeploy                           |
| Server Components + `'use client'` nos sections | SSR para SEO e performance inicial; client para interatividade e animações |
| `useCdn: true` no client                        | Leituras via CDN de borda — menor latência para usuários finais            |
