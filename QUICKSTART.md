# 🚀 Quickstart Guide - Fundação Luzamor Website

## Desenvolvimento Local (5 minutos)

### 1. Clone e Instale

```bash
git clone https://github.com/luzamor-ti/website-luzamor.git
cd website-luzamor
npm install
```

### 2. Configure Variáveis de Ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione suas credenciais do Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-11
```

### 3. Rode o Projeto

```bash
npm run dev
```

Acesse:
- **Website**: http://localhost:3000
- **Sanity Studio (CMS)**: http://localhost:3000/fundacao-cms
- **Storybook**: http://localhost:6006 (rode `npm run storybook`)

## Deploy em Produção

### GitHub Pages (Storybook)

1. Vá em **Settings** → **Pages** do repositório
2. Em **Source**, selecione **GitHub Actions**
3. Push para `main` - o Storybook será deployado automaticamente

**URL:** `https://luzamor-ti.github.io/website-luzamor/`

### Vercel (Website)

1. Importe o repositório no [Vercel](https://vercel.com)
2. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
3. Deploy automático está configurado! ✅

**⚠️ O deploy só acontece se todos os testes e lint passarem.**

### Sanity CORS

Para o Studio funcionar na Vercel, adicione o domínio nas configurações de CORS do Sanity:

1. Acesse https://www.sanity.io/manage
2. **Settings** → **API** → **CORS Origins**
3. Adicione: `https://your-project.vercel.app`

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Next.js dev server
npm run storybook        # Storybook dev

# Testes (200 testes, 84% cobertura)
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Com relatório de cobertura

# Build
npm run build            # Build Next.js
npm run build:verify     # Lint + Tests + Build (usado pela Vercel)

# Quality
npm run lint             # ESLint
npm run verify           # Lint + Tests
```

## Estrutura Básica

```
app/                     # Next.js pages (English)
components/
  ├── home/             # Home sections
  ├── page-templates/   # Page templates
  └── ui/               # Reusable components
sanity/
  ├── schemaTypes/      # CMS schemas (Portuguese labels)
  └── lib/
      ├── types/        # TypeScript types (English)
      ├── queries/      # GROQ queries
      └── services/     # Data fetching
constants/
  └── textFallbacks.ts  # Fallback content
docs/                   # Documentation
```

## Fluxo de Trabalho

1. **Desenvolvimento Local**
   - Rode `npm run dev` para Next.js
   - Rode `npm run storybook` para componentes isolados
   - Acesse CMS em `/fundacao-cms`

2. **Antes de Commit**
   ```bash
   npm run verify  # Lint + Tests
   ```

3. **Push para Main**
   - GitHub Actions roda CI (testes + lint)
   - Storybook é deployado no GitHub Pages
   - Vercel faz build e deploy do site
   - Tudo automático! 🎉

## Troubleshooting

### "Missing environment variable"
✅ Verifique se `.env.local` está configurado corretamente

### Testes falhando
✅ Rode `npm run test:coverage` para ver o que falhou
✅ Corrija e rode `npm run verify` antes de commitar

### Erro 500 no Sanity Studio
✅ Verifique variáveis de ambiente na Vercel
✅ Verifique CORS no Sanity

## Próximos Passos

- 📚 Leia [docs/componentes.md](docs/componentes.md) para entender os componentes
- 🏗️ Veja [docs/home-architecture.md](docs/home-architecture.md) para a arquitetura da home
- 🚀 Confira [docs/deploy-vercel.md](docs/deploy-vercel.md) para detalhes de deploy
- 🎨 Explore [docs/zod-storybook.md](docs/zod-storybook.md) para documentação de componentes

## Links Importantes

- **Documentação do Projeto**: [docs/](docs/)
- **Sanity Dashboard**: https://www.sanity.io/manage
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Storybook (Produção)**: https://luzamor-ti.github.io/website-luzamor/

---

**Precisa de ajuda?** Consulte a [documentação completa](docs/) ou abra uma issue.
