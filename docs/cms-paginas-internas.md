# 🗺️ Páginas Internas — Seletor de Navegação no CMS

## 🎯 O que é

O arquivo `sanity/schemaTypes/paginasInternas.ts` contém a **lista centralizada de todas as páginas internas do site**. Ele é importado pelos schemas do Sanity para transformar campos de URL em **dropdowns intuitivos**, eliminando a necessidade de digitar caminhos manualmente.

---

## 📋 Páginas Disponíveis

| Título (no CMS)              | Caminho (value)       |
| ---------------------------- | --------------------- |
| 🏠 Home                      | `/`                   |
| 📋 Sobre Nós                 | `/sobre-nos`          |
| 🎯 Projetos                  | `/projetos`           |
| 📅 Calendário de Eventos     | `/calendario-eventos` |
| 📚 Cursos                    | `/cursos`             |
| 🏫 Salas de Aula             | `/salas-aula`         |
| 🎤 Auditório                 | `/auditorio`          |
| 📞 Contato                   | `/contato`            |
| 👥 Diretoria                 | `/diretoria`          |
| 🗣️ Palavra do Presidente     | `/palavra-presidente` |
| 🤝 Patrocinador / Apoiadores | `/patrocinador`       |

---

## 🔗 Onde é Usado

### `sanity/schemaTypes/hero.ts`

Os dois botões CTA do Hero usam `paginasInternas`:

- **ctaPrimario.url** — Destino do botão verde principal
- **ctaSecundario.url** — Destino do botão outline secundário

### `sanity/schemaTypes/secaoHome.ts`

Quatro campos de URL nas seções da Home:

- **urlBotao** — Destino do botão CTA principal (seções: `intro`)
- **urlLink** — Destino do link secundário (seções: `projects`, `supporters`, `initiatives`, `howToHelp`)
- **cards[].url** — Destino de cards clicáveis (seções: `initiatives`, `howToHelp`)

---

## 🔄 Relação com `routesPath`

Os valores de `paginasInternas` são **exatamente iguais** aos definidos em `constants/routesPath.ts`. Esta consistência é verificada automaticamente pelos testes unitários.

```
paginasInternas[].value  ←→  routesPath.*
```

| paginasInternas value | routesPath                 |
| --------------------- | -------------------------- |
| `/`                   | `routesPath.home`          |
| `/sobre-nos`          | `routesPath.about`         |
| `/projetos`           | `routesPath.projects`      |
| `/calendario-eventos` | `routesPath.events`        |
| `/cursos`             | `routesPath.courses`       |
| `/salas-aula`         | `routesPath.classrooms`    |
| `/auditorio`          | `routesPath.auditorium`    |
| `/contato`            | `routesPath.contact`       |
| `/diretoria`          | `routesPath.board`         |
| `/palavra-presidente` | `routesPath.presidentWord` |
| `/patrocinador`       | `routesPath.sponsor`       |

> ⚠️ **Nota:** Rotas dinâmicas de tipos específicos (ex: `/projeto/:slug`, `/evento/:slug`) **não** estão na lista — o CMS não seleciona rotas individuais de conteúdo, apenas páginas de listagem/seção.

---

## ➕ Adicionando uma nova página

Ao criar uma nova página no site, você deve atualizar **três lugares**:

### 1. `constants/routesPath.ts`

```typescript
export const routesPath = {
  // ...existentes...
  novaPagina: "/nova-pagina", // ← adicione aqui
} as const;
```

### 2. `sanity/schemaTypes/paginasInternas.ts`

```typescript
export const paginasInternas = [
  // ...existentes...
  { title: "🆕 Nova Página", value: "/nova-pagina" }, // ← adicione aqui
];
```

### 3. `app/[slug]/page.tsx`

```typescript
const pageConfig = {
  // ...existentes...
  "nova-pagina": { component: NovaPaginaTemplate, ... },  // ← adicione aqui
};
```

---

## ❓ Por que não usar `routesPath` diretamente no schema Sanity?

Os schemas Sanity precisam de um array de `{ title, value }` para o campo `list`. A constante `routesPath` é um objeto, não um array, e usa `as const` que tornaria o array readonly — incompatível com o tipo esperado pelo Sanity.

`paginasInternas` resolve isso mantendo o formato correto sem `as const`.

---

## 📁 Separação de Responsabilidades

| Arquivo                                 | Uso                                              |
| --------------------------------------- | ------------------------------------------------ |
| `constants/routesPath.ts`               | Usado em componentes React para gerar `href`     |
| `sanity/schemaTypes/paginasInternas.ts` | Usado em schemas Sanity para dropdowns no Studio |
| `app/[slug]/page.tsx`                   | Mapeia slugs para componentes de página          |

---

**Criado em:** Janeiro/2025  
**Atualizado em:** Março/2026
