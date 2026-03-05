# Documentação — Página de Patrocinadores

## Visão Geral

A página **Patrocinadores** (`/patrocinador`) lista todos os apoiadores da Fundação Luzamor, organizados por tipo e categoria. Todo o conteúdo textual e visual é gerenciado via CMS (Sanity), com fallbacks em código para garantir que a página funcione antes de qualquer cadastro.

---

## Estrutura da Página

```
Hero Section
    ↓
CTA Principal (3 botões)
    ↓
Seção de Parceiros (Tabs 2026 / Anteriores)
    ↓ ↓
  Patrocinadores   Apoiadores
  (por categoria)  (por categoria)
    ↓
Apoiadores Individuais
    ↓
CTA Final
    ↓
Doadores (Mensais / Pontuais)
```

---

## Seções

### 1. Hero Section

**Campos CMS** (`paginaParceiros.hero`):

| Campo           | Tipo     | Descrição                                     |
| --------------- | -------- | --------------------------------------------- |
| `tag`           | `string` | Tag acima do título (ex: "Transparência e Gratidão") |
| `titulo`        | `string` | Título principal da página                    |
| `descricao`     | `text`   | Parágrafo introdutório                        |
| `imagemFundo`   | `image`  | Imagem full-width de fundo com hotspot        |

Quando `imagemFundo` está preenchida, a seção exibe um overlay gradiente escuro e textos em branco. Sem imagem, usa fundo gradiente verde/roxo claro.

---

### 2. CTA Principal

**Campos CMS** (`paginaParceiros.ctaPrincipal`):

| Campo                | Tipo     | Fallback                        |
| -------------------- | -------- | ------------------------------- |
| `titulo`             | `string` | "Faça Parte da Mudança"         |
| `descricao`          | `text`   | Texto genérico de apoio         |
| `botaoPatrocinador`  | `string` | "Seja um Patrocinador"          |
| `botaoApoiador`      | `string` | "Seja um Apoiador"              |
| `botaoDoador`        | `string` | "Faça uma Doação"               |

Todos os três botões apontam para `/contato`.

---

### 3. Seção de Parceiros (Tabs)

Exibida apenas quando há pelo menos um patrocinador ou apoiador cadastrado (2026 ou anteriores).

**Campos CMS** (`paginaParceiros.secaoParceiros`):

| Campo                       | Tipo     | Fallback                                          |
| --------------------------- | -------- | -------------------------------------------------- |
| `tag`                       | `string` | "Parceiros"                                        |
| `titulo`                    | `string` | "Patrocinadores e Apoiadores"                      |
| `descricao`                 | `text`   | Texto genérico                                     |
| `labelAba2026`              | `string` | "Parceiros de 2026"                                |
| `labelAbaAnteriores`        | `string` | "Parceiros Anteriores"                             |
| `mensagemVazioAtual`        | `string` | "Nenhuma parceria cadastrada para 2026 ainda."     |
| `mensagemVazioAnteriores`   | `string` | "Nenhuma parceria anterior cadastrada."            |

#### Comportamento das Abas

- **Estado preservado**: ambos os painéis ficam montados no DOM — a ocultação é feita via CSS (`hidden`/`block`), preservando o estado aberto/fechado do Accordion ao trocar de aba.
- Aba `2026` é a padrão.

#### Categorias (Accordion)

Cada categoria (schema `categoriaParceria`) vira um item de Accordion. O Accordion começa fechado; clicar no nome da categoria expande a lista de parceiros.

---

### 4. Apoiadores Individuais

Exibida apenas quando há `apoiadorIndividual` cadastrados.

**Campos CMS** (`paginaParceiros.secaoIndividuais`):

| Campo       | Tipo     | Fallback                                                   |
| ----------- | -------- | ---------------------------------------------------------- |
| `tag`       | `string` | "Pessoas que fazem a diferença"                            |
| `titulo`    | `string` | "Apoiadores Individuais"                                   |
| `descricao` | `text`   | "Pessoas físicas que contribuem com ..."                   |

Cards com foto circular e link externo quando `site` está preenchido.

---

### 5. CTA Final

Sempre renderizado (não depende de dados de parceiros).

**Campos CMS** (`paginaParceiros.ctaFinal`):

| Campo         | Tipo     | Fallback                        |
| ------------- | -------- | ------------------------------- |
| `titulo`      | `string` | "Sua empresa pode estar aqui"   |
| `descricao`   | `text`   | Texto genérico de convite       |
| `textoBotao`  | `string` | "Entrar em Contato"             |

Seção com fundo na cor primária (`bg-primary`), botão aponta para `/contato`.

---

### 6. Doadores

Exibida apenas quando há `doadorMensal` ou `doadorPontual` cadastrados.

**Campos CMS** (`paginaParceiros.secaoDoadores`):

| Campo           | Tipo     | Fallback               |
| --------------- | -------- | ---------------------- |
| `tag`           | `string` | "Gratidão"             |
| `titulo`        | `string` | "Nossos Doadores"      |
| `descricao`     | `text`   | Texto genérico         |
| `tituloMensais` | `string` | "Doadores Mensais"     |
| `tituloPontuais`| `string` | "Doadores Pontuais"    |

Dois grupos lado a lado (mobile: coluna única, desktop: 2 colunas). Cards com foto circular.

---

## Schemas CMS

### `apoiador` (documento)

| Campo        | Tipo        | Obrigatório | Notas                                                     |
| ------------ | ----------- | ----------- | --------------------------------------------------------- |
| `nome`       | `string`    | ✓           |                                                           |
| `logo`       | `image`     |             | Hotspot habilitado                                        |
| `site`       | `url`       |             | Gera link externo no card                                 |
| `tipo`       | `string`    | ✓           | `patrocinador`, `apoiador`, `apoiadorIndividual`, `doadorMensal`, `doadorPontual` |
| `ano`        | `number`    | ✓           | Oculto para doadores; padrão: 2026                        |
| `categoria`  | `reference` | *           | Referência a `categoriaParceria`; obrigatório para patrocinadores/apoiadores |
| `destaque`   | `boolean`   |             | Exibe na homepage                                         |
| `ordem`      | `number`    |             | Ordenação dentro da categoria                             |

### `categoriaParceria` (documento)

| Campo    | Tipo     | Obrigatório | Notas                                  |
| -------- | -------- | ----------- | -------------------------------------- |
| `titulo` | `string` | ✓           | Ex: "Lei Rouanet", "Edital Estadual"   |
| `ordem`  | `number` |             | Ordenação entre categorias             |

### `paginaParceiros` (singleton)

Schema com campos para todas as seções descritas acima. Acesse via **Sanity Studio** → **Página de Parceiros**.

---

## Arquitetura de Dados

```
app/[slug]/page.tsx (Server Component)
    ↓ slug === "patrocinador"
getPartnersPageData()  ←  partnerService.ts
    ↓ Promise.all (8 fetches paralelos via sanityFetch)
    ├── PARTNERS_PAGE_CONFIG_QUERY   → pageConfig
    ├── PARTNER_CATEGORIES_QUERY     → sponsors2026
    ├── PARTNER_CATEGORIES_QUERY     → supporters2026
    ├── PAST_PARTNER_CATEGORIES_QUERY → pastSponsors
    ├── PAST_PARTNER_CATEGORIES_QUERY → pastSupporters
    ├── INDIVIDUAL_PARTNERS_QUERY    → individualSupporters
    ├── INDIVIDUAL_PARTNERS_QUERY    → monthlyDonors
    └── INDIVIDUAL_PARTNERS_QUERY    → punctualDonors
    ↓
PatrocinadorTemplate (Client Component)
```

O serviço usa `sanityFetch` (Live Content API) — mudanças publicadas no Studio aparecem imediatamente sem reiniciar o servidor.

---

## Tipos TypeScript

| Arquivo                                    | Exporta                                                        |
| ------------------------------------------ | -------------------------------------------------------------- |
| `sanity/lib/types/supporter.ts`            | `Supporter`, `SupporterCategory`, `SupporterType`, `PartnersPageData` |
| `sanity/lib/types/partnersPage.ts`         | `PartnersPageConfig`                                           |

---

## Queries GROQ

| Constante                        | Arquivo                          | Parâmetros                         |
| -------------------------------- | -------------------------------- | ---------------------------------- |
| `PARTNERS_PAGE_CONFIG_QUERY`     | `queries/partner.ts`             | nenhum                             |
| `PARTNER_CATEGORIES_QUERY`       | `queries/partner.ts`             | `$tipo`, `$ano`                    |
| `PAST_PARTNER_CATEGORIES_QUERY`  | `queries/partner.ts`             | `$tipo`, `$currentYear`            |
| `INDIVIDUAL_PARTNERS_QUERY`      | `queries/partner.ts`             | `$tipo`                            |

---

## Testes

| Arquivo                                                                         | Cobertura                                            |
| ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `components/page-templates/__tests__/PatrocinadorTemplate.test.tsx`             | Hero, CTA, abas, accordion, individuais, doadores, CTA final, fallbacks |
| `sanity/lib/services/__tests__/partnerService.test.ts`                          | Queries corretas, parâmetros, fallbacks de erro, paralelismo |

Execute com:

```bash
npx vitest run components/page-templates/__tests__/PatrocinadorTemplate.test.tsx
npx vitest run sanity/lib/services/__tests__/partnerService.test.ts
```

---

## Adicionando Novos Parceiros no CMS

1. Acesse `/fundacao-cms` → **Apoiador / Patrocinador** → **Novo documento**
2. Preencha `nome`, `tipo` e `logo`
3. Para **Patrocinadores** e **Apoiadores**: selecione ou crie uma **Categoria de Parceria** e informe o **Ano**
4. Para **Doadores**: não é necessário `categoria` nem `ano`
5. Publique o documento — a página atualiza automaticamente (Live Content API)

---

## Adicionando Novas Categorias

1. Acesse `/fundacao-cms` → **Categoria de Parceria** → **Novo documento**
2. Preencha `titulo` (ex: "Fundo Municipal de Cultura") e `ordem`
3. Publique — a categoria já aparece para seleção nos documentos `apoiador`
