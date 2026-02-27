# Copilot Instructions - Website Luzamor

## Architecture Overview

Next.js 16 (App Router) + Sanity CMS for a Brazilian foundation website. **Critical**: Strict language separation - all code/types/files in **English**, all CMS schemas/content in **Portuguese**.

### Data Flow Pattern

```
Sanity CMS → Services (parallel fetch) → Server Components → Client Components
                ↓
         Fallbacks (constants/textFallbacks.ts)
```

## Core Patterns

### 1. Service Layer Architecture

**Never fetch directly in components**. Use service pattern:

```typescript
// sanity/lib/services/entityService.ts
import { client } from "../client";
import { ENTITY_QUERY } from "../queries/entity";

export async function getEntityData() {
  return await client.fetch(ENTITY_QUERY);
}
```

**Home orchestrator** (`sanity/lib/services/homeService.ts`) uses `Promise.all()` for parallel fetching:

```typescript
const [projects, courses, events] = await Promise.all([
  getProjectsHome(),
  getCourses(),
  getUpcomingEvents(),
]);
```

### 2. Fallback System (Critical)

All dynamic content requires fallbacks in `constants/textFallbacks.ts`. If CMS fails, fallback prevents crashes:

```typescript
export const TEXT_FALLBACKS: Record<SectionName, SectionFallback> = {
  projects: {
    tag: "Projetos",
    title: "Nossos Projetos",
    description: "...",
  },
};
```

Components use: `section?.title || TEXT_FALLBACKS.projects.title`

### 3. Component Hierarchy

**Three layers**:

1. **UI Components** (`components/ui/`) - Building blocks (Button, Section, Card, Grid)
2. **Section Components** (`components/home/`) - Client components receiving props, no fetching
3. **Page Components** (`app/`) - Server components, fetch via services

**Example Section Component**:

```tsx
"use client";

interface ProjectsSectionProps {
  data: Project[];
  section: HomeSection | null;
}

export function ProjectsSection({ data, section }: ProjectsSectionProps) {
  const title = section?.title || TEXT_FALLBACKS.projects.title;
  // Component never fetches - receives data as props
}
```

### 4. Static Page Routing

Pages are **code-defined**, not CMS entities. See `app/[slug]/page.tsx`:

```typescript
const pageConfig: Record<string, { component, pageType, title }> = {
  'projetos': { component: ProjetosTemplate, pageType: 'projetos', ... },
  'sobre-nos': { component: SobreNosTemplate, pageType: 'sobre-nos', ... },
};
```

To add a page: (1) Create template in `components/page-templates/`, (2) Add to `pageConfig`, (3) Export from index.

### 5. Sanity Schema & Types Pattern

**Schema** (`sanity/schemaTypes/`) in Portuguese with `defineType`:

```typescript
export default defineType({
  name: "projeto",
  title: "Projetos",
  fields: [defineField({ name: "titulo", title: "Título", type: "string" })],
});
```

**Types** (`sanity/lib/types/`) in English:

```typescript
export interface Project {
  _id: string;
  title: string; // Maps to 'titulo' in schema
  description?: string;
}
```

### 6. Animation System

Use pre-defined variants from `lib/animations.ts` (GPU-optimized):

```tsx
import { staggerContainerVariants, fadeInVariants } from "@/lib/animations";
import { motion } from "framer-motion";

<motion.div
  variants={staggerContainerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={fadeInVariants}>...</motion.div>
</motion.div>;
```

Available: `fadeInVariants`, `slideUpVariants`, `staggerContainerVariants`, `scaleInVariants`.

## Development Workflows

### Adding a New Section

1. **Schema**: Create in `sanity/schemaTypes/` (Portuguese labels)
2. **Type**: Define interface in `sanity/lib/types/` (English)
3. **Query**: Write GROQ in `sanity/lib/queries/`
4. **Service**: Create service in `sanity/lib/services/`
5. **Fallback**: Add to `constants/textFallbacks.ts`
6. **Component**: Create in `components/home/` (client component)
7. **Orchestrate**: Add to `homeService.ts` and `app/page.tsx`

### Working with Images

Use Sanity's image builder:

```typescript
import { urlFor } from '@/sanity/lib/image';

<Image src={urlFor(image).width(800).height(600).url()} ... />
```

Configure domains in `next.config.ts`: `cdn.sanity.io` already allowed.

### Running Sanity Studio

Studio mounted at `/fundacao-cms` route. Config in `sanity.config.ts`:

- basePath: `/fundacao-cms`
- Accessible at `http://localhost:3000/fundacao-cms` in dev

## Key Files

- `app/page.tsx` - Home page, demonstrates service orchestration
- `sanity/lib/services/homeService.ts` - Parallel fetching pattern
- `constants/textFallbacks.ts` - Fallback values (never delete)
- `components/ui/index.ts` - Available UI building blocks
- `lib/animations.ts` - Animation variants library
- `docs/` - Detailed documentation (Portuguese):
  - `home-architecture.md` - Home architecture deep dive
  - `componentes.md` - Component usage guide
  - `criacao-paginas.md` - Page creation guide

## Common Pitfalls

- ❌ Fetching data in client components → ✅ Pass via props from server component
- ❌ Portuguese variable names → ✅ English code, Portuguese CMS only
- ❌ Hardcoded text in components → ✅ CMS + fallbacks
- ❌ Sequential `await` calls → ✅ `Promise.all()` for parallel fetching
- ❌ Creating file `componente-xyz.tsx` → ✅ `ComponentXyz.tsx` (English PascalCase)
- ❌ Inline animations → ✅ Use variants from `lib/animations.ts`

## Commands

```bash
npm run dev          # Next.js dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint
npm run storybook    # Storybook dev server (port 6006)
```

Studio access: Navigate to `/fundacao-cms` in browser after starting dev server.

## Component Documentation & Validation

### Zod Schemas

All UI components have Zod schemas in `lib/schemas/ui.ts` for prop validation:

```typescript
export const buttonPropsSchema = z.object({
  variant: z.enum(["primary", "secondary"]).default("primary"),
  size: z.enum(["sm", "md", "lg"]).default("md"),
  // ...
});

export type ButtonProps = z.infer<typeof buttonPropsSchema>;
```

### Storybook

Component documentation at http://localhost:6006 (run `npm run storybook`):

- Stories in `stories/ui/*.stories.tsx` (separated from components)
- Use Zod schemas for prop validation and type inference
- See `docs/zod-storybook.md` for complete guide
- See `stories/README.md` for organization guidelines

**Creating a new component with Zod + Storybook:**

1. Create component in `components/ui/NewComponent.tsx`
2. Add schema in `lib/schemas/ui.ts`
3. Create `stories/ui/NewComponent.stories.tsx` (import from `@/components/ui/`)
4. Define argTypes manually for Storybook controls (TypeScript compatibility)
