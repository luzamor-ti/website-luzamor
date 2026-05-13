# Fundação Luzamor Website

A documentação principal do projeto agora vive em [docs/index.html](docs/index.html).

## Começar

1. Abra [docs/index.html](docs/index.html) para a visão geral canônica do projeto.
2. Use [docs/](docs/) para acessar os guias detalhados.
3. Rode `npm run dev` para desenvolver localmente.

## Visão rápida

Este repositório usa Next.js + Sanity + TypeScript. O fluxo base é CMS → serviços → páginas → componentes.

## Leituras essenciais

- [docs/index.html](docs/index.html)
- [docs/criacao-paginas.md](docs/criacao-paginas.md)
- [docs/componentes.md](docs/componentes.md)
- [docs/home-architecture.md](docs/home-architecture.md)
- [docs/testes.md](docs/testes.md)

Run tests before every commit:

```bash
npm run verify
```

## 🚀 CI/CD & Deployment

### Pipeline Overview

```
Push to main → CI (Tests + Lint) → Build → Deploy (Vercel + GitHub Pages)
```

### GitHub Actions Workflows

#### 1. **CI - Tests and Lint** (`.github/workflows/ci.yml`)

Runs on every push and PR:

- ✅ ESLint code quality check
- ✅ All 200 unit tests
- ✅ Coverage reports
- ✅ Production build test

#### 2. **Deploy Storybook** (`.github/workflows/deploy-storybook.yml`)

Auto-deploys Storybook to GitHub Pages on main branch updates.

**Storybook URL:** `https://luzamor-ti.github.io/website-luzamor/`

### Vercel Deployment

**Automatic:** Every push to `main` triggers Vercel deployment.

**Build Process:**

1. ✅ Run ESLint
2. ✅ Run all tests (200 tests must pass)
3. ✅ Build Next.js application
4. ✅ Deploy to Vercel

**⚠️ Deploy is blocked if tests or lint fail.**

#### Environment Variables (Vercel)

Required in Vercel dashboard:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-11
```

#### Setup Instructions

1. **GitHub Pages** (for Storybook):
   - Go to repo **Settings** → **Pages**
   - Source: **GitHub Actions**
   - Storybook auto-deploys on push to main

2. **Vercel**:
   - Import GitHub repository
   - Add environment variables
   - Deploy automatically configured via `vercel.json`

3. **Sanity CORS**:
   - Add Vercel domain to [Sanity CORS settings](https://www.sanity.io/manage)
   - Add: `https://your-project.vercel.app`

See detailed guide: [docs/deploy-vercel.md](docs/deploy-vercel.md)

### Manual Build

Build production bundle locally:

```bash
npm run build:verify  # Run tests + build
npm start             # Start production server
```

## 🤝 Contributing

1. Create feature branch
2. Make changes following code style
3. Test thoroughly
4. Submit pull request

## 📄 License

© 2024 Fundação Luzamor. All rights reserved.

---

Built with ❤️ for Fundação Luzamor
