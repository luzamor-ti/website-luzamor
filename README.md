# Fundação Luzamor Website

Modern website for Fundação Luzamor built with Next.js 15, Sanity CMS, and TypeScript.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **CMS**: [Sanity](https://www.sanity.io/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod
- **Documentation**: Storybook 10
- **Analytics**: Vercel Analytics & Speed Insights

## 📂 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── [slug]/            # Dynamic pages
│   └── fundacao-cms/      # Sanity Studio
├── components/            # React components
│   ├── home/             # Home page sections
│   ├── page-templates/   # Page templates
│   └── ui/               # Reusable UI components
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # CMS schemas (Portuguese labels for editors)
│   └── lib/              # Sanity utilities
│       ├── types/        # TypeScript interfaces (English)
│       ├── queries/      # GROQ queries
│       └── services/     # Data fetching services
├── constants/            # Constant values and fallbacks
├── lib/                  # Utility functions
├── utils/                # Helper functions
└── docs/                 # Documentation
```

## 🏗️ Architecture

### Naming Convention

**Code (English)**: All code, variables, types, and file names use English.  
**CMS & Content (Portuguese)**: CMS schemas and user-facing content use Portuguese.

### Data Flow

```
CMS (Sanity) → Services → Pages → Components → UI
```

### Key Concepts

- **Static Page Mapping**: Pages are defined statically in code, not stored in CMS
- **Section Management**: Home page sections fully configurable through CMS
- **Fallback System**: All dynamic content has fallback values for error prevention

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

```bash
git clone https://github.com/luzamor-ti/website-luzamor.git
cd website-luzamor
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Add your Sanity configuration in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### Sanity Studio

Access the CMS at [http://localhost:3000/fundacao-cms](http://localhost:3000/fundacao-cms)

## 📝 Key Features

### Dynamic Sections

All home page sections are managed through CMS:

- Hero / Introduction
- Impact metrics
- Projects showcase
- Team members
- Supporters & Partners
- Initiatives
- FAQ
- Contact information

### Page Templates

Pre-built templates for common pages:

- Projects
- About Us
- Classrooms
- Auditorium
- Board of Directors
- President's Message
- Sponsors
- Event Calendar
- Courses

### Animations

- Scroll-based animations with Framer Motion
- Hover effects on interactive elements
- Smooth page transitions
- Custom animation variants

## 🎨 Styling

### Custom Theme

Color scheme defined in CSS variables ([globals.css](app/globals.css)):

- `--color-primary`: Main brand color (green #8CC63F)
- `--color-secondary`: Secondary color
- `--color-accent`: Accent color
- `--color-bg`: Background colors

### Component System

Reusable UI components in [components/ui](components/ui):

- Button with animated arrow
- Cards with hover effects
- Grid layouts
- Typography components
- Accordion for FAQ
- Navigation with dropdowns

## 📚 Documentation

Detailed documentation available in [docs/](docs):

- [Migration Guide](MIGRATION_GUIDE.md) - Portuguese to English refactoring
- [Home Architecture](docs/home-architecture.md) - Home page structure
- [Creating Pages](docs/criacao-paginas.md) - Page creation guide
- [Components Guide](docs/componentes.md) - Component documentation
- [CMS Data](docs/cms-data.md) - CMS data structure
- [Text Management](docs/gerenciamento-textos.md) - Text management system
- [Animations Guide](docs/animations-guide.md) - Animation patterns
- [Zod + Storybook](docs/zod-storybook.md) - Component validation and documentation

## 📖 Storybook

### Component Documentation

Interactive component documentation with Storybook:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view all components.

### Features

- **Interactive Examples**: Test different component variations
- **Props Validation**: Zod schemas for type-safe props
- **Accessibility Testing**: Built-in a11y checks
- **Auto-generated Docs**: Comprehensive documentation for all UI components

### Component Schemas

All UI components have Zod schemas for prop validation in `lib/schemas/`:

- Type safety at runtime
- Auto-generated controls in Storybook
- Clear validation errors in development

See [docs/zod-storybook.md](docs/zod-storybook.md) for detailed guide.

## 🔧 Development

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Next.js
- **Formatting**: Consistent code style

### Type Safety

All CMS data is typed with TypeScript interfaces found in [sanity/lib/types](sanity/lib/types)

### Services Layer

Data fetching abstracted into services ([sanity/lib/services](sanity/lib/services)) for:

- Projects
- Members
- Supporters
- Home sections
- Navigation
- Configuration

### Available Scripts

```bash
# Development
npm run dev              # Start Next.js development server
npm run storybook        # Start Storybook

# Build
npm run build            # Build for production
npm run build-storybook  # Build static Storybook

# Testing
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:ui          # Run tests with Vitest UI

# Quality Checks
npm run lint             # Run ESLint
npm run verify           # Run lint + tests
npm run build:verify     # Run verify + build (used by CI)
```

### Test Coverage

✅ **200 tests** with **84.64% coverage**

- Unit tests for all UI components
- Integration tests for sections
- Happy DOM for fast test execution
- Coverage reports in `coverage/` folder

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
