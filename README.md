# Fundação Luzamor Website

Modern website for Fundação Luzamor built with Next.js 15, Sanity CMS, and TypeScript.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **CMS**: [Sanity](https://www.sanity.io/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

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

### Migration Status

⚠️ **Currently migrating from Portuguese to English naming conventions**

See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for details.

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual Build

Build production bundle:

```bash
npm run build
npm start
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
