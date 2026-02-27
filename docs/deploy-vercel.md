# Guia de Deploy na Vercel - Sanity Studio

## ⚠️ Problema Resolvido

O erro 500 no Studio do Sanity estava acontecendo porque a rota estava configurada como `force-static`, mas o Sanity Studio **deve ser dinâmico**.

### Correções Aplicadas

#### 1. Client Component (CRÍTICO)
Adicionado `'use client'` em `app/fundacao-cms/[[...tool]]/page.tsx`:

```typescript
// page.tsx DEVE ser um Client Component
'use client'

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**Importante:** Removido `export const dynamic` e `export { metadata, viewport }` pois Client Components não podem exportá-los.

#### 2. Sanity Config sem 'use client'
O arquivo `sanity.config.ts` NÃO deve ter `'use client'` no topo.

#### 3. Transpile Packages
Adicionado em `next.config.ts`:
```typescript
transpilePackages: ["next-sanity", "@sanity/vision"]
```

## 📋 Checklist de Deploy na Vercel

### 1. Variáveis de Ambiente Obrigatórias

No painel da Vercel, configure estas variáveis de ambiente:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-11
```

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

## 📝 Referências

- [Sanity + Next.js Documentation](https://www.sanity.io/docs/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
