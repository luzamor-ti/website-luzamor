# Guia de Deploy - Vercel & GitHub Pages

## 🚀 Pipeline de Deploy

Este projeto utiliza um pipeline automatizado de CI/CD com:

1. **Vercel** - Deploy do site Next.js em produção
2. **GitHub Pages** - Deploy do Storybook para documentação de componentes
3. **GitHub Actions** - Testes automatizados e validações

### Fluxo de Deploy

```
Push to main → CI Tests → Build & Tests Pass → Deploy Vercel + Storybook
```

## 📦 Scripts de Deploy

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Next.js dev server
npm run storybook             # Storybook dev server

# Build
npm run build                 # Build Next.js
npm run build-storybook       # Build Storybook localmente
npm run build-storybook:ci    # Build Storybook para CI

# Testes
npm test                      # Roda testes unitários
npm run test:coverage         # Testes com cobertura
npm run lint                  # Verifica código com ESLint

# Verificação (usado pelo CI)
npm run verify                # Lint + Testes
npm run build:verify          # Verify + Build (usado pela Vercel)
```

## 🔄 GitHub Actions Workflows

### 1. CI - Tests and Lint (`.github/workflows/ci.yml`)

**Trigger:** Push ou PR em `main` ou `develop`

**Jobs:**

- ✅ **Tests** (sempre executa):
  - Lint com ESLint
  - Testes unitários (200 tests)
  - Cobertura de testes
  - Upload para Codecov (opcional)
- ✅ **Build** (apenas em push para `main`):
  - Build do Next.js
  - Requer secrets do Sanity configurados

**Por que o build só roda em `main`?**
O build do Next.js precisa de conexão válida com o Sanity para pre-render das páginas. Em PRs, rodamos apenas lint + tests para validar o código sem precisar de secrets.

**Configuração necessária (apenas para branch `main`):**

- Secrets: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Opcional: `CODECOV_TOKEN` para upload de cobertura

### 2. Deploy Storybook (`.github/workflows/deploy-storybook.yml`)

**Trigger:**

- Push em `main` com mudanças em `components/`, `stories/`, `.storybook/`
- Execução manual via `workflow_dispatch`

**Jobs:**

- ✅ Build do Storybook
- ✅ Deploy no GitHub Pages

**URL do Storybook:** `https://[seu-usuario].github.io/[seu-repo]/`

### Habilitar GitHub Pages

1. Vá em **Settings** → **Pages** no repositório GitHub
2. Em **Source**, selecione **GitHub Actions**
3. Salve as configurações
4. O Storybook será automaticamente deployado a cada push em `main`

## 📋 Vercel - Configuração

### Build Command

O arquivo `vercel.json` está configurado com:

```json
{
  "buildCommand": "npm run build:verify",
  "framework": "nextjs"
}
```

Isso significa que **a cada deploy**, a Vercel irá:

1. ✅ Rodar `npm run lint` (ESLint)
2. ✅ Rodar `npm test` (todos os 200 testes unitários)
3. ✅ Se tudo passar, rodar `npm run build`

**⚠️ Se os testes ou lint falharem, o deploy é cancelado automaticamente.**

### 1. Variáveis de Ambiente Obrigatórias

**⚠️ IMPORTANTE:** As variáveis de ambiente devem ser configuradas **apenas no painel da Vercel**, não no arquivo `vercel.json`. O arquivo `vercel.json` não deve conter a seção `env`.

No painel da Vercel (`Settings` → `Environment Variables`), configure:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-11
```

**Passos para adicionar na Vercel:**

1. Vá no dashboard do seu projeto na Vercel
2. Clique em **Settings**
3. Vá em **Environment Variables**
4. Adicione cada variável:
   - Nome: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Valor: seu project ID do Sanity
   - Ambientes: Production, Preview, Development (selecione todos)
5. Repita para `NEXT_PUBLIC_SANITY_DATASET` e `NEXT_PUBLIC_SANITY_API_VERSION`
6. Salve e faça um novo deploy

**Como obter o Project ID:**

1. Acesse https://www.sanity.io/manage
2. Selecione seu projeto
3. Copie o Project ID que aparece no painel

**Para encontrar localmente:** verifique em `sanity.cli.ts` ou rode `npx sanity debug` no terminal.

### 2. Configurar CORS no Sanity

Para que o Studio funcione na Vercel, você precisa adicionar o domínio da Vercel nas configurações de CORS do Sanity:

1. Acesse https://www.sanity.io/manage
2. Vá em **Settings** → **API** → **CORS Origins**
3. Adicione:
   - `http://localhost:3000` (desenvolvimento)
   - `https://seu-projeto.vercel.app` (produção)
   - `https://*.vercel.app` (preview deploys - opcional)

### 3. Redeploy na Vercel

Depois de configurar as variáveis de ambiente:

1. Vá no dashboard da Vercel
2. Acesse seu projeto
3. Clique em **Deployments**
4. Clique nos três pontos do último deploy
5. Selecione **Redeploy**
6. Marque **Use existing Build Cache** se desejar deploy mais rápido

### 4. Verificar Funcionamento

Após o redeploy, acesse:

```
https://seu-projeto.vercel.app/fundacao-cms
```

Você deverá ver o Sanity Studio funcionando corretamente.

## 🔍 Troubleshooting

### Erro: "Missing environment variable"

- ✅ Verifique se todas as variáveis foram adicionadas na Vercel
- ✅ Certifique-se de que os nomes estão corretos (incluindo `NEXT_PUBLIC_`)
- ✅ Faça um novo deploy após adicionar as variáveis

### Erro: "CORS origin not allowed"

- ✅ Adicione o domínio da Vercel nas configurações de CORS do Sanity
- ✅ Aguarde alguns minutos para propagar
- ✅ Limpe o cache do navegador

### Erro 500 ou "createContext is not a function"

- ✅ **CRÍTICO**: Adicione `'use client'` no topo de `app/fundacao-cms/[[...tool]]/page.tsx`
- ✅ **CRÍTICO**: Remova `'use client'` do arquivo `sanity.config.ts`
- ✅ **CRÍTICO**: Remova `export const dynamic` e `export { metadata, viewport }` do page.tsx (Client Components não podem exportá-los)
- ✅ Verifique se `next.config.ts` tem `transpilePackages: ["next-sanity", "@sanity/vision"]`
- ✅ Limpe o cache do build na Vercel (Redeploy **SEM** "Use existing Build Cache")
- ✅ Verifique os logs no painel da Vercel (**Functions** → selecione a função com erro)
- ✅ Verifique se o build foi concluído com sucesso

### Studio carrega mas não salva

- ✅ Verifique permissões do token (se estiver usando)
- ✅ Confirme que o dataset está correto
- ✅ Verifique configurações de CORS

### Testes falhando no deploy

- ✅ Verifique os logs da Vercel para ver qual teste falhou
- ✅ Rode `npm run build:verify` localmente para reproduzir o erro
- ✅ Corrija o código e faça novo commit
- ✅ Alternativamente, desabilite temporariamente os testes no build modificando `vercel.json`:
  ```json
  {
    "buildCommand": "npm run build"
  }
  ```
  (Não recomendado para produção)

## 🎨 Sanity Studio

### Configuração Client Component

O Sanity Studio **DEVE** ser um Client Component. Configuração correta:

**`app/fundacao-cms/[[...tool]]/page.tsx`:**

```typescript
'use client'

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**`sanity.config.ts`:**

```typescript
// NÃO adicione 'use client' aqui
import { defineConfig } from "sanity";
// ... resto da configuração
```

**`next.config.ts`:**

```typescript
const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity", "@sanity/vision"],
  // ... outras configurações
};
```

### Acessando o Studio

- **Local:** `http://localhost:3000/fundacao-cms`
- **Produção:** `https://seu-projeto.vercel.app/fundacao-cms`

## � Troubleshooting

### Erro: "Environment Variable references Secret which does not exist"

**Sintoma:**

```
Environment Variable 'NEXT_PUBLIC_SANITY_PROJECT_ID' references Secret 'sanity-project-id', which does not exist
```

**Causa:**
O arquivo `vercel.json` estava usando a sintaxe `@nome-do-secret` que é específica para referenciar itens do **Vercel Secret Store** (secrets criptografados). Mas as variáveis de ambiente regulares não devem usar essa sintaxe.

**Solução:**

1. ❌ **NÃO faça:** Adicionar seção `env` no `vercel.json` com sintaxe `@`
2. ✅ **FAÇA:** Configure as variáveis **apenas no dashboard da Vercel**

O `vercel.json` **não deve** conter:

```json
{
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity-project-id" // ❌ ERRADO
  }
}
```

As variáveis devem estar **apenas no dashboard**:

- Settings → Environment Variables → Add Variable
- Nome: `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Valor: `abc123xyz` (sem o prefixo @)

**Quando usar @ syntax:**

- **SOMENTE** para referenciar secrets do Vercel Secret Store (dados sensíveis como chaves de API privadas)
- **NUNCA** para variáveis públicas ou de configuração normais

### Build Falhando em Pull Requests

**Sintoma:**

```
Error: Configuration is invalid for Sanity client. 'projectId' must be provided
```

**Causa:**
O comando `npm run build` tenta fazer pré-renderização de páginas que dependem do Sanity, mas as secrets não estão disponíveis em Pull Requests por segurança.

**Solução:**
O CI foi configurado para executar o build **apenas no branch main**:

```yaml
build:
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

Em Pull Requests, apenas os testes são executados (não necessitam secrets do Sanity).

## �📝 Referências

- [Sanity + Next.js Documentation](https://www.sanity.io/docs/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
