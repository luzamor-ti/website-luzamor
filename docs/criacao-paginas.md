# Guia de Criação de Páginas

Este documento fornece um guia passo a passo para criar novas páginas no projeto, seguindo os padrões estabelecidos e utilizando os componentes UI reutilizáveis.

---

## 📋 Índice

1. [Estrutura Básica](#estrutura-básica)
2. [Padrão de Composição](#padrão-de-composição)
3. [Seções Comuns](#seções-comuns)
4. [Integração com Sanity CMS](#integração-com-sanity-cms)
5. [Animações](#animações)
6. [Boas Práticas](#boas-práticas)
7. [Exemplos Completos](#exemplos-completos)

---

## Estrutura Básica

### 1. Criar o arquivo da página

As páginas ficam em `app/[slug]/page.tsx` ou diretamente em `app/page.tsx`.

```tsx
// app/sobre/page.tsx
export default function SobrePage() {
  return <main>{/* Seções da página */}</main>;
}
```

### 2. Adicionar metadados (SEO)

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós - Fundação Luz Amor",
  description: "Conheça nossa história e missão",
};

export default function SobrePage() {
  return <main>{/* ... */}</main>;
}
```

---

## Padrão de Composição

### Estrutura Recomendada

As páginas devem ser compostas por **seções independentes** que utilizam os **componentes UI**:

```tsx
import {
  Section,
  SectionHeader,
  Button,
  Card,
  Grid,
  Heading,
  Text,
  Link,
} from "@/components/ui";

export default function MinhaPage() {
  return (
    <main>
      {/* Seção Hero */}
      <section className="min-h-screen flex items-center justify-center p-10">
        <Heading level={1}>Título da Página</Heading>
      </section>

      {/* Seção de Conteúdo 1 */}
      <Section>
        <SectionHeader tag="Categoria" title="Título da Seção" />
        {/* Conteúdo */}
      </Section>

      {/* Seção de Conteúdo 2 */}
      <Section className="bg-gray-50">{/* Conteúdo */}</Section>
    </main>
  );
}
```

### Hierarquia de Componentes

```
Página (page.tsx)
└── Seções (<Section> ou <section>)
    ├── Cabeçalho (<SectionHeader>)
    ├── Layout (<Grid>, containers)
    │   └── Conteúdo (<Card>, <Text>, <Heading>)
    └── Ações (<Button>, <Link>)
```

---

## Seções Comuns

### 1. Hero Section (Topo da Página)

```tsx
import { Heading, Text, Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-b from-gray-50 to-white">
      <Heading level={1} className="text-center mb-6">
        Título Principal
      </Heading>
      <Text variant="large" className="text-center max-w-2xl mb-8">
        Descrição ou subtítulo explicativo
      </Text>
      <Button variant="primary" size="lg" href="#content">
        Call to Action
        <ArrowRight size={20} />
      </Button>
    </section>
  );
}
```

### 2. Seção de Introdução (Texto + Imagem)

```tsx
import { Section, SectionHeader, Text, Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

function IntroSection() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader tag="Sobre" title="Nossa História" />
          <Text variant="large" className="mb-6">
            Texto explicativo sobre o tema.
          </Text>
          <Text className="mb-8">Mais detalhes e contexto.</Text>
          <Button variant="outline" href="/sobre">
            Saiba mais
            <ArrowRight size={20} />
          </Button>
        </div>
        <div>
          <img
            src="/imagem.jpg"
            alt="Descrição"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </div>
    </Section>
  );
}
```

### 3. Seção de Cards (Grid)

```tsx
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Heading,
  Text,
} from "@/components/ui";

function CardsSection() {
  const items = [
    { title: "Item 1", description: "Descrição 1" },
    { title: "Item 2", description: "Descrição 2" },
    { title: "Item 3", description: "Descrição 3" },
  ];

  return (
    <Section className="bg-gray-50">
      <SectionHeader
        tag="Nossos serviços"
        title="O que oferecemos"
        align="center"
      />
      <Grid cols={3} gap="lg">
        {items.map((item, index) => (
          <Card key={index} padding="lg" hover={true}>
            <Heading level={4} className="mb-3">
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
```

### 4. Seção de FAQ

```tsx
import { Section, SectionHeader, Accordion, Text } from "@/components/ui";

function FaqSection() {
  const faqs = [
    { id: "1", title: "Pergunta 1?", content: <Text>Resposta 1</Text> },
    { id: "2", title: "Pergunta 2?", content: <Text>Resposta 2</Text> },
    { id: "3", title: "Pergunta 3?", content: <Text>Resposta 3</Text> },
  ];

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag="Dúvidas"
          title="Perguntas Frequentes"
          align="center"
        />
        <Accordion items={faqs} allowMultiple={false} />
      </div>
    </Section>
  );
}
```

### 5. Seção de CTA (Call to Action)

```tsx
import { Section, Heading, Text, Button } from "@/components/ui";

function CtaSection() {
  return (
    <Section className="bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto">
        <Heading level={2} className="text-white mb-6">
          Pronto para começar?
        </Heading>
        <Text variant="large" className="text-white/90 mb-8">
          Junte-se a nós e faça parte dessa transformação.
        </Text>
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" size="lg" href="/contato">
            Entre em contato
          </Button>
          <Button variant="ghost" size="lg" href="/sobre">
            Saiba mais
          </Button>
        </div>
      </div>
    </Section>
  );
}
```

### 6. Seção com Ticker (Logos, Badges)

```tsx
import { Section, SectionHeader, Ticker } from "@/components/ui";

function SponsorsSection() {
  const sponsors = [
    /* array de patrocinadores */
  ];

  return (
    <Section className="bg-gray-50">
      <SectionHeader tag="Parceiros" title="Quem nos apoia" align="center" />
      <Ticker speed="normal" pauseOnHover={true}>
        {sponsors.map((sponsor) => (
          <img
            key={sponsor.id}
            src={sponsor.logo}
            alt={sponsor.name}
            className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
          />
        ))}
      </Ticker>
    </Section>
  );
}
```

---

## Integração com Sanity CMS

### 1. Criar o serviço de dados

```tsx
// sanity/lib/services/minhaService.ts
import { sanityFetch } from "../client";
import { MINHA_QUERY } from "../queries/minhaQuery";
import { MeuTipo } from "../types/meuTipo";

export async function getMeusDados(): Promise<MeuTipo[]> {
  return sanityFetch<MeuTipo[]>({
    query: MINHA_QUERY,
    tags: ["meu-tipo"],
  });
}
```

### 2. Buscar dados na página

```tsx
// app/minha-pagina/page.tsx
import { getMeusDados } from "@/sanity/lib/services/minhaService";

export default async function MinhaPagina() {
  const dados = await getMeusDados();

  return (
    <main>
      {/* Usar os dados nas seções */}
      <MinhaSection data={dados} />
    </main>
  );
}
```

### 3. Criar o componente de seção

```tsx
// components/home/MinhaSection.tsx
"use client";

import { MeuTipo } from "@/sanity/lib/types/meuTipo";
import { Section, SectionHeader, Grid, Card } from "@/components/ui";

interface MinhaSectionProps {
  data: MeuTipo[];
}

export function MinhaSection({ data }: MinhaSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeader tag="Tag" title="Título" />
      <Grid cols={3} gap="lg">
        {data.map((item) => (
          <Card key={item._id}>{/* Conteúdo do item */}</Card>
        ))}
      </Grid>
    </Section>
  );
}
```

---

## Animações

### Uso Básico (Automático)

Os componentes `Section`, `Grid`, `Card`, `SectionHeader` já incluem animações automáticas. Não é necessário adicionar código extra.

### Animações Customizadas

Se precisar de animações específicas, use Framer Motion:

```tsx
"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";

function AnimatedContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Conteúdo animado
    </motion.div>
  );
}
```

### Animações Disponíveis

Veja o arquivo `lib/animations.ts` para variantes pré-definidas:

- `staggerContainerVariants` - Container com stagger
- `staggerItemVariants` - Itens dentro de stagger
- `slideUpVariants` - Deslizar para cima
- `hoverLiftVariants` - Elevação no hover

---

## Ícones

O projeto utiliza **Lucide React** (baseado no Feather Icons) para todos os ícones.

### Instalação

O pacote já está instalado no projeto:

```bash
npm install lucide-react
```

### Uso Básico

```tsx
import { Heart, ArrowRight, Menu, X } from "lucide-react";

// Uso direto
<Heart size={24} className="text-primary" />;

// Com o wrapper Icon (opcional)
import { Icon } from "@/components/ui";
<Icon icon={Heart} size={24} className="text-primary" />;
```

### Ícones Comuns no Projeto

```tsx
import {
  // Navegação
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,

  // Ações
  Heart,
  Handshake,
  DollarSign,
  GraduationCap,

  // Contato
  Mail,
  Phone,
  MapPin,

  // Social
  Facebook,
  Instagram,
  Twitter,
  Linkedin,

  // Outros
  Calendar,
  Users,
  Award,
  Star,
} from "lucide-react";
```

### Em Botões e Links

```tsx
import { Button, Link } from "@/components/ui";
import { ArrowRight, ExternalLink } from "lucide-react";

// Botão com ícone
<Button variant="primary" href="/contato">
  Entre em contato
  <ArrowRight size={20} />
</Button>

// Link com ícone
<Link href="https://exemplo.com" variant="primary">
  Visitar site
  <ExternalLink size={16} />
</Link>
```

### Em Cards

```tsx
import { Card, Icon } from "@/components/ui";
import { Heart, Handshake, Award } from "lucide-react";

<Card>
  <div className="flex justify-center mb-4">
    <Icon icon={Heart} size={48} className="text-primary" />
  </div>
  <h3>Título</h3>
  <p>Descrição</p>
</Card>;
```

### Tamanhos Recomendados

- **Ícones em botões**: 16px - 20px
- **Ícones em cards**: 32px - 48px
- **Ícones em navegação**: 20px - 24px
- **Ícones decorativos grandes**: 64px+

### Recursos

- [Galeria completa de ícones Lucide](https://lucide.dev/icons/)
- Mais de 1000 ícones disponíveis
- Totalmente customizáveis via props e className
- Tree-shakeable (apenas ícones usados são incluídos)

---

## Boas Práticas

### ✅ Faça

1. **Use componentes UI sempre que possível**
   - Mantém consistência visual
   - Facilita manutenção
   - Reduz código duplicado

2. **Componente = Uma responsabilidade**
   - Seções devem ser componentes separados
   - Cada componente deve ter um propósito claro

3. **Use as cores do CMS**

   ```tsx
   <div className="bg-primary text-white">...</div>
   ```

4. **Mantenha hierarquia clara**
   - Section → SectionHeader → Content → Actions

5. **Trate casos vazios**

   ```tsx
   if (!data || data.length === 0) return null;
   ```

6. **Use TypeScript**
   - Defina interfaces para props
   - Importe tipos do Sanity

### ❌ Evite

1. **Não crie estilos inline complexos**

   ```tsx
   // ❌ Evite
   <div style={{ padding: "20px", margin: "10px", ... }}>

   // ✅ Prefira
   <Section >
   ```

2. **Não duplique código**

   ```tsx
   // ❌ Evite copiar/colar HTML similar

   // ✅ Crie um componente reutilizável
   ```

3. **Não use cores fixas**

   ```tsx
   // ❌ Evite
   <div className="bg-green-500">

   // ✅ Use
   <div className="bg-primary">
   ```

4. **Não ignore acessibilidade**
   - Use alt em imagens
   - Use elementos semânticos corretos
   - Adicione aria-labels quando necessário

---

## Exemplos Completos

### Exemplo 1: Página Simples (Sobre)

```tsx
// app/sobre/page.tsx
import { Metadata } from "next";
import {
  Section,
  SectionHeader,
  Heading,
  Text,
  Button,
  Grid,
  Card,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre Nós - Fundação Luz Amor",
  description: "Conheça nossa história e missão",
};

export default function SobrePage() {
  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center p-10">
        <div className="max-w-4xl text-center">
          <Heading level={1} className="mb-6">
            Nossa História
          </Heading>
          <Text variant="large">
            Uma fundação dedicada à cultura e educação desde 1995.
          </Text>
        </div>
      </section>

      {/* Missão */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <SectionHeader tag="Missão" title="O que nos move" />
            <Text variant="large" className="mb-4">
              Transformar vidas através da cultura e educação.
            </Text>
            <Text>
              Nossa missão é promover o acesso à cultura e educação de qualidade
              para todos.
            </Text>
          </div>
          <div className="bg-gray-200 rounded-2xl h-96"></div>
        </div>
      </Section>

      {/* Valores */}
      <Section className="bg-gray-50">
        <SectionHeader
          tag="Valores"
          title="No que acreditamos"
          align="center"
        />
        <Grid cols={3} gap="lg">
          <Card padding="lg" className="text-center">
            <Heading level={5} className="mb-3">
              Inclusão
            </Heading>
            <Text>Cultura para todos, sem exceção.</Text>
          </Card>
          <Card padding="lg" className="text-center">
            <Heading level={5} className="mb-3">
              Excelência
            </Heading>
            <Text>Qualidade em tudo que fazemos.</Text>
          </Card>
          <Card padding="lg" className="text-center">
            <Heading level={5} className="mb-3">
              Transformação
            </Heading>
            <Text>Mudando vidas através da educação.</Text>
          </Card>
        </Grid>
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-white text-center">
        <Heading level={2} className="text-white mb-6">
          Junte-se a nós
        </Heading>
        <Text variant="large" className="text-white/90 mb-8">
          Faça parte dessa transformação
        </Text>
        <Button variant="secondary" size="lg" href="/contato">
          Entre em contato
        </Button>
      </Section>
    </main>
  );
}
```

### Exemplo 2: Página com Dados do CMS

```tsx
// app/cursos/page.tsx
import { Metadata } from "next";
import { getCursos } from "@/sanity/lib/services/cursosService";
import { CursosSection } from "@/components/cursos/CursosSection";

export const metadata: Metadata = {
  title: "Cursos - Fundação Luz Amor",
  description: "Conheça nossos cursos e programas educacionais",
};

export default async function CursosPage() {
  const cursos = await getCursos();

  return (
    <main>
      <section className="min-h-[60vh] flex items-center justify-center p-10 bg-gradient-to-b from-primary/10 to-white">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nossos Cursos</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Desenvolvendo talentos e transformando vidas através da educação
          </p>
        </div>
      </section>

      <CursosSection data={cursos} />
    </main>
  );
}
```

```tsx
// components/cursos/CursosSection.tsx
"use client";

import { Curso } from "@/sanity/lib/types/curso";
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Heading,
  Text,
  Button,
} from "@/components/ui";

interface CursosSectionProps {
  data: Curso[];
}

export function CursosSection({ data }: CursosSectionProps) {
  if (!data || data.length === 0) {
    return (
      <Section>
        <Text className="text-center text-gray-500">
          Nenhum curso disponível no momento.
        </Text>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        tag="Educação"
        title="Cursos Disponíveis"
        description="Escolha o curso ideal para você"
        align="center"
      />
      <Grid cols={3} gap="lg">
        {data.map((curso) => (
          <Card key={curso._id} padding="lg" hover={true}>
            {curso.imagem && (
              <img
                src={curso.imagem}
                alt={curso.titulo}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <Heading level={4} className="mb-2">
              {curso.titulo}
            </Heading>
            <Text variant="small" className="text-gray-600 mb-4">
              {curso.descricao}
            </Text>
            <div className="flex items-center justify-between">
              <Text variant="small" className="text-gray-500">
                {curso.duracao}
              </Text>
              <Button
                variant="primary"
                size="sm"
                href={`/cursos/${curso.slug}`}
              >
                Saiba mais
              </Button>
            </div>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
```

---

## Gerenciamento de Rotas

### Constante de Rotas Centralizada

**SEMPRE** utilize a constante `routesPath` localizada em `constants/routesPath.ts` para referenciar URLs internas:

```typescript
import { routesPath } from "@/constants/routesPath";

// ✅ CORRETO
<Button href={routesPath.about}>Sobre Nós</Button>
<Link href={routesPath.projects}>Ver Projetos</Link>

// ❌ ERRADO - Nunca use strings hardcoded
<Button href="/sobre-nos">Sobre Nós</Button>
```

### Rotas Disponíveis

```typescript
routesPath = {
  home: "/",
  about: "/sobre-nos",
  projects: "/projetos",
  contact: "/contato",
  courses: "/cursos",
  events: "/calendario-eventos",
  classrooms: "/salas-aula",
  auditorium: "/auditorio",
  board: "/diretoria",
  presidentWord: "/palavra-presidente",
  sponsor: "/patrocinador",
};
```

### Por Que Usar a Constante?

1. **Manutenção Centralizada**: Mudanças de URL em um único lugar
2. **TypeScript Safety**: Autocomplete e verificação de tipos
3. **Refatoração Segura**: Encontre todas as referências facilmente
4. **Evita Erros**: Sem typos em URLs
5. **Documentação**: Todas as rotas visíveis em um arquivo

### Exemplo Completo

```tsx
import { routesPath } from "@/constants/routesPath";
import { Button, Link } from "@/components/ui";

function Navigation() {
  return (
    <nav>
      <Link href={routesPath.home}>Home</Link>
      <Link href={routesPath.about}>Sobre</Link>
      <Link href={routesPath.projects}>Projetos</Link>

      {/* Botão CTA */}
      <Button href={routesPath.contact} variant="primary">
        Entre em Contato
      </Button>
    </nav>
  );
}
```

---

## Checklist de Criação de Página

Antes de finalizar sua página, verifique:

- [ ] Metadados (title, description) configurados
- [ ] Componentes UI utilizados corretamente
- [ ] **Rotas internas usando `routesPath` (nunca strings hardcoded)**
- [ ] Cores vêm do CMS (bg-primary, text-primary, etc.)
- [ ] Animações funcionando (ou desabilitadas intencionalmente)
- [ ] Responsivo em mobile, tablet e desktop
- [ ] Dados do Sanity sendo carregados corretamente
- [ ] Tratamento de casos vazios (sem dados)
- [ ] Imagens com alt text apropriado
- [ ] Links funcionando corretamente
- [ ] Performance otimizada (imagens, componentes)
- [ ] TypeScript sem erros
- [ ] Código limpo e bem organizado

---

## Recursos Adicionais

- [Documentação de Componentes](./componentes.md)
- [Guia de Animações](../ANIMATIONS_GUIDE.md)
- [Arquitetura da Home](../HOME_ARCHITECTURE.md)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Next.js 15](https://nextjs.org/)
- [Sanity.io](https://www.sanity.io/)

---

**Data de Criação:** 24 de fevereiro de 2026  
**Última Atualização:** 24 de fevereiro de 2026
