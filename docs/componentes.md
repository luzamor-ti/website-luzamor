# Documentação de Componentes

Este documento descreve os componentes reutilizáveis do projeto, organizados seguindo princípios de **Design Atômico** para garantir manutenibilidade e consistência.

## 📦 Estrutura de Componentes

```
components/
├── ui/                    # Componentes atômicos e moleculares
│   ├── Section.tsx       # Container de seção com animações
│   ├── SectionHeader.tsx # Cabeçalho de seção padronizado
│   ├── Button.tsx        # Botão com múltiplas variantes
│   ├── Card.tsx          # Card reutilizável
│   ├── Grid.tsx          # Sistema de grid responsivo
│   ├── Ticker.tsx        # Rolagem horizontal infinita
│   ├── Accordion.tsx     # Acordeão expansível (FAQ)
│   ├── Icon.tsx          # Wrapper para ícones Lucide React
│   ├── Typography.tsx    # Componentes de tipografia
│   └── index.ts          # Exportações centralizadas
├── home/                 # Componentes específicos da homepage
└── animations/           # Componentes de animação
```

---

## 🎨 Componentes UI (Atômicos e Moleculares)

### Section

Container de seção com animações automáticas usando Framer Motion.

**Uso:**

```tsx
import { Section } from "@/components/ui";

<Section className="bg-white" id="sobre">
  {/* Conteúdo da seção */}
</Section>;
```

**Props:**

- `children`: ReactNode - Conteúdo da seção
- `className?`: string - Classes CSS adicionais
- `id?`: string - ID para navegação/âncoras

**Características:**

- Animação de entrada ao scroll
- Container com largura máxima (max-w-6xl)
- Padding vertical padrão (py-20 px-4)

---

### SectionHeader

Cabeçalho padronizado para seções com tag opcional, título e descrição.

**Uso:**

```tsx
import { SectionHeader } from "@/components/ui";

<SectionHeader
  tag="Nosso trabalho"
  title="Transformando vidas"
  description="Descrição opcional da seção"
  align="center"
/>;
```

**Props:**

- `tag?`: string - Tag pequena acima do título
- `title`: string | ReactNode - Título principal da seção
- `description?`: string - Descrição opcional abaixo do título
- `align?`: "left" | "center" - Alinhamento do texto (padrão: "left")

**Características:**

- Tag com círculo da cor primária (16px) + texto em Camel Case
- Gap de 8px entre círculo e texto
- Título responsivo (text-4xl md:text-5xl)
- Animação de entrada
- Margem inferior padrão (mb-16)
- Texto da tag automaticamente convertido para Camel Case

---

### Button

Botão reutilizável com múltiplas variantes e tamanhos.

**Uso:**

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" href="/contato">
  Entre em contato
  <span>&rarr;</span>
</Button>

<Button variant="outline" onClick={handleClick}>
  Saiba mais
</Button>
```

**Props:**

- `children`: ReactNode - Conteúdo do botão
- `href?`: string - Se fornecido, renderiza como link (`<a>`)
- `onClick?`: () => void - Handler de click (quando não é link)
- `variant?`: "primary" | "secondary" | "outline" | "ghost" - Estilo visual
- `size?`: "sm" | "md" | "lg" - Tamanho do botão
- `fullWidth?`: boolean - Se true, ocupa 100% da largura
- `className?`: string - Classes CSS adicionais

**Variantes:**

- **primary**: Fundo cor primária, texto branco
- **secondary**: Fundo cor secundária, texto branco
- **outline**: Borda cinza, fundo branco
- **ghost**: Transparente com texto primário

**Tamanhos:**

- **sm**: py-2 px-4 text-sm
- **md**: py-3 px-6 text-base (padrão)
- **lg**: py-4 px-8 text-lg

---

### Card

Card reutilizável com bordas, sombras e animação.

**Uso:**

```tsx
import { Card } from "@/components/ui";

<Card padding="lg" hover={true} className="text-center">
  <h3>Título do Card</h3>
  <p>Conteúdo do card</p>
</Card>;
```

**Props:**

- `children`: ReactNode - Conteúdo do card
- `className?`: string - Classes CSS adicionais
- `hover?`: boolean - Ativa efeito hover (padrão: true)
- `padding?`: "sm" | "md" | "lg" - Tamanho do padding interno

**Características:**

- Fundo branco com borda sutil
- Sombra elevada
- Bordas arredondadas (rounded-xl)
- Animação de entrada
- Efeito hover opcional

---

### Grid

Sistema de grid responsivo com animação.

**Uso:**

```tsx
import { Grid } from "@/components/ui";

<Grid cols={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>;
```

**Props:**

- `children`: ReactNode - Itens do grid
- `cols?`: 1 | 2 | 3 | 4 - Número de colunas (padrão: 3)
- `gap?`: "sm" | "md" | "lg" - Espaçamento entre itens
- `className?`: string - Classes CSS adicionais

**Breakpoints responsivos:**

- **cols={1}**: 1 coluna em todos os tamanhos
- **cols={2}**: 1 coluna mobile, 2 no desktop
- **cols={3}**: 1 coluna mobile, 3 no desktop
- **cols={4}**: 1 coluna mobile, 2 em tablet, 4 no desktop

---

### Ticker

Componente de rolagem horizontal infinita para exibir logos, badges ou qualquer conteúdo.

**Uso:**

```tsx
import { Ticker } from "@/components/ui";

<Ticker speed="normal" pauseOnHover={true}>
  <img src="/logo1.png" alt="Logo 1" />
  <img src="/logo2.png" alt="Logo 2" />
  <img src="/logo3.png" alt="Logo 3" />
</Ticker>;
```

**Props:**

- `children`: ReactNode - Conteúdo a ser exibido no ticker
- `speed?`: "slow" | "normal" | "fast" - Velocidade da animação (padrão: "normal")
- `direction?`: "left" | "right" - Direção do movimento (padrão: "left")
- `pauseOnHover?`: boolean - Pausa a animação ao passar o mouse (padrão: true)
- `className?`: string - Classes CSS adicionais

**Velocidades:**

- **slow**: 60 segundos para completar o loop
- **normal**: 40 segundos para completar o loop
- **fast**: 20 segundos para completar o loop

**Características:**

- Loop infinito suave e contínuo
- **Duplicação inteligente**: Multiplica automaticamente os elementos até ter quantidade suficiente para scroll infinito, mesmo com poucos itens
- Calcula dinamicamente quantas cópias são necessárias baseado na largura da tela
- Adapta-se automaticamente ao redimensionamento da janela
- Animação CSS performática com requestAnimationFrame
- Responsivo e acessível
- Funciona com qualquer conteúdo (imagens, texto, componentes)

**Exemplo com logos de patrocinadores:**

```tsx
import { Ticker } from "@/components/ui";
import Image from "next/image";

function SponsorsSection() {
  const sponsors = [...]; // array de patrocinadores

  return (
    <Ticker speed="slow" pauseOnHover={true}>
      {sponsors.map((sponsor) => (
        <div
          key={sponsor.id}
          className="min-w-[200px] h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
        >
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={160}
            height={80}
            className="object-contain"
          />
        </div>
      ))}
    </Ticker>
  );
}
```

**Exemplo no rodapé:**

```tsx
<Ticker
  speed="fast"
  direction="right"
  pauseOnHover={false}
  className="bg-gray-900 py-4"
>
  <span className="text-white">Badge 1</span>
  <span className="text-white">Badge 2</span>
  <span className="text-white">Badge 3</span>
</Ticker>
```

---

### Icon

Wrapper padronizado para ícones do Lucide React (baseado no Feather Icons).

**Uso:**

```tsx
import { Icon } from "@/components/ui";
import { Heart, ArrowRight, Menu } from "lucide-react";

// Uso básico
<Icon icon={Heart} size={24} />

// Com classes customizadas
<Icon icon={ArrowRight} size={20} className="text-primary" />

// Uso direto do Lucide React
<Heart size={24} className="text-red-500" />
```

**Props:**

- `icon`: LucideIcon - Componente de ícone do lucide-react
- `size?`: number - Tamanho do ícone em pixels (padrão: 24)
- `className?`: string - Classes CSS adicionais

**Características:**

- Stroke padrão: 2px
- Tamanho padrão: 24px
- Totalmente customizável via className
- Acesso a todos os +1000 ícones do Lucide React

**Ícones mais usados:**

```tsx
import {
  ArrowRight, // Setas
  Heart, // Coração
  Handshake, // Parceria
  DollarSign, // Doação
  GraduationCap, // Educação
  Menu, // Menu
  X, // Fechar
  ChevronDown, // Dropdown
  Mail, // Email
  Phone, // Telefone
  MapPin, // Localização
  Calendar, // Calendário
  Users, // Usuários/Equipe
  Award, // Prêmios/Conquistas
} from "lucide-react";
```

**Exemplo em botões:**

```tsx
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

<Button variant="primary">
  Saiba mais
  <ArrowRight size={20} />
</Button>;
```

**Exemplo em cards:**

```tsx
import { Card, Icon } from "@/components/ui";
import { Heart } from "lucide-react";

<Card>
  <div className="flex justify-center mb-4">
    <Icon icon={Heart} size={48} className="text-primary" />
  </div>
  <h3>Título do Card</h3>
</Card>;
```

**Recursos:**

- [Lucide React - Galeria completa de ícones](https://lucide.dev/icons/)
- Baseado no Feather Icons com melhorias
- Totalmente tree-shakeable (apenas ícones usados são incluídos no bundle)

---

### Accordion

Componente de acordeão expansível para FAQs, seções de conteúdo colapsáveis, etc.

**Uso:**

```tsx
import { Accordion, Text } from "@/components/ui";

function FaqComponent() {
  const items = [
    {
      id: "1",
      title: "Como faço para participar?",
      content: <Text>Você pode se inscrever através do nosso site.</Text>,
    },
    {
      id: "2",
      title: "Quais são os horários?",
      content: <Text>Funcionamos de segunda a sexta, das 9h às 18h.</Text>,
    },
    {
      id: "3",
      title: "Quanto custa?",
      content: <Text>Todos os nossos cursos são gratuitos.</Text>,
    },
  ];

  return <Accordion items={items} allowMultiple={false} />;
}
```

**Props:**

- `items`: AccordionItemType[] - Array de itens do accordion
  - `id`: string - ID único do item
  - `title`: string - Título visível do item
  - `content`: ReactNode - Conteúdo expansível
- `allowMultiple?`: boolean - Permite múltiplos itens abertos simultaneamente (padrão: false)
- `className?`: string - Classes CSS adicionais

**Características:**

- Animação suave de expansão/colapso (Framer Motion)
- Controle de estado automático
- Modo single (apenas um aberto) ou multiple (vários abertos)
- Acessível com teclado
- Ícone + rotaciona ao abrir (transforma em X)
- Estilo consistente com tema do projeto

**Exemplo com conteúdo complexo:**

```tsx
import { Accordion, Heading, Text, Link } from "@/components/ui";

const items = [
  {
    id: "1",
    title: "Informações sobre o curso",
    content: (
      <div>
        <Heading level={6} className="mb-2">
          Duração e formato
        </Heading>
        <Text className="mb-4">
          O curso tem duração de 3 meses com aulas semanais.
        </Text>
        <Link href="/cursos" variant="primary">
          Ver mais detalhes &rarr;
        </Link>
      </div>
    ),
  },
];

<Accordion items={items} allowMultiple={true} />;
```

**Exemplo com allowMultiple:**

```tsx
// Permite abrir várias seções ao mesmo tempo
<Accordion items={items} allowMultiple={true} />

// Modo padrão: apenas uma seção aberta por vez
<Accordion items={items} allowMultiple={false} />
```

---

### Typography

Componentes de tipografia para garantir consistência.

#### Heading

**Uso:**

```tsx
import { Heading } from "@/components/ui";

<Heading level={2}>Título da Seção</Heading>
<Heading level={3} className="text-white">Subtítulo</Heading>
```

**Props:**

- `children`: ReactNode - Texto do título
- `level?`: 1 | 2 | 3 | 4 | 5 | 6 - Nível do heading (padrão: 2)
- `className?`: string - Classes CSS adicionais

**Estilos por nível:**

- **h1**: text-5xl md:text-6xl font-bold
- **h2**: text-4xl md:text-5xl font-bold
- **h3**: text-3xl md:text-4xl font-bold
- **h4**: text-2xl md:text-3xl font-bold
- **h5**: text-xl md:text-2xl font-semibold
- **h6**: text-lg md:text-xl font-semibold

#### Text

**Uso:**

```tsx
import { Text } from "@/components/ui";

<Text variant="body">Texto padrão</Text>
<Text variant="muted">Texto secundário</Text>
<Text variant="large">Texto destacado</Text>
```

**Props:**

- `children`: ReactNode - Conteúdo do texto
- `variant?`: "body" | "small" | "large" | "muted" - Estilo visual
- `className?`: string - Classes CSS adicionais

**Variantes:**

- **body**: text-base text-gray-700 (padrão)
- **small**: text-sm text-gray-600
- **large**: text-lg text-gray-700
- **muted**: text-base text-gray-500

#### Link

**Uso:**

```tsx
import { Link } from "@/components/ui";

<Link href="/sobre" variant="primary">
  Saiba mais &rarr;
</Link>;
```

**Props:**

- `children`: ReactNode - Texto do link
- `href`: string - URL de destino
- `variant?`: "primary" | "default" - Estilo visual
- `className?`: string - Classes CSS adicionais

**Variantes:**

- **primary**: text-primary font-semibold
- **default**: text-gray-700 com underline

#### Tag

**Uso:**

```tsx
import { Tag } from "@/components/ui";

<Tag>Novidade</Tag>
<Tag className="mb-4">Categoria</Tag>
```

**Props:**

- `children`: ReactNode - Texto da tag
- `className?`: string - Classes CSS adicionais

**Características:**

- Texto em cor primária
- Uppercase com tracking
- Font semibold
- Texto pequeno (text-sm)

---

## 🎨 Sistema de Cores

O projeto utiliza variáveis CSS dinâmicas que vêm do CMS Sanity:

### Variáveis CSS

```css
--color-primary    /* Cor principal (#00B749) */
--color-secondary  /* Cor secundária (#7B1FA2) */
--color-accent     /* Cor de destaque (#C32F2F) */
--color-bg         /* Cor de fundo (#F0F1F2) */
--color-text       /* Cor do texto (#444444) */
```

### Classes Tailwind Customizadas

Criadas em `app/globals.css` para usar as variáveis do CMS:

```css
/* Backgrounds */
.bg-primary
.bg-secondary
.bg-accent

/* Textos */
.text-primary
.text-secondary
.text-accent

/* Bordas */
.border-primary
.border-secondary
.border-accent

/* Hover states */
.hover:bg-primary:hover
.hover:text-primary:hover
.hover:border-primary:hover
```

**Uso:**

```tsx
<div className="bg-primary text-white">Usando cor primária do CMS</div>
<p className="text-primary">Texto na cor primária</p>
<button className="border-primary hover:bg-primary">Botão com hover</button>
```

---

## 🎬 Animações

As animações são gerenciadas pelo Framer Motion através de variantes predefinidas em `lib/animations.ts`:

### Variantes Disponíveis

```tsx
import {
  staggerContainerVariants,
  staggerItemVariants,
  slideUpVariants,
  hoverLiftVariants,
} from "@/lib/animations";
```

- **staggerContainerVariants**: Para containers que animam filhos em sequência
- **staggerItemVariants**: Para itens dentro de containers stagger
- **slideUpVariants**: Animação de deslizar para cima
- **hoverLiftVariants**: Efeito de elevação no hover

### Uso com Componentes UI

Os componentes `Section`, `Grid`, `Card` e `SectionHeader` já incluem animações automaticamente. Para adicionar animações customizadas:

```tsx
import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";

<motion.div variants={staggerItemVariants}>Conteúdo animado</motion.div>;
```

---

## 📋 Exemplos Práticos

### Exemplo 1: Seção Simples

```tsx
import { Section, SectionHeader, Text, Button } from "@/components/ui";

function SobreSection() {
  return (
    <Section className="bg-white">
      <SectionHeader
        tag="Sobre nós"
        title="Uma fundação que transforma"
        description="Conectando pessoas através da cultura"
      />
      <Text variant="large" className="mb-8">
        Somos uma instituição dedicada à cultura e educação.
      </Text>
      <Button variant="primary" href="/sobre">
        Conhecer mais &rarr;
      </Button>
    </Section>
  );
}
```

### Exemplo 2: Grid de Cards

```tsx
import { Section, SectionHeader, Card, Grid, Heading, Text } from "@/components/ui";

function ProdutosSection() {
  const produtos = [...]; // dados

  return (
    <Section className="bg-gray-50">
      <SectionHeader
        tag="Nossos produtos"
        title="Conheça nossas soluções"
        align="center"
      />
      <Grid cols={3} gap="lg">
        {produtos.map((produto) => (
          <Card key={produto.id} padding="lg">
            <Heading level={4} className="mb-3">
              {produto.nome}
            </Heading>
            <Text variant="muted">{produto.descricao}</Text>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
```

### Exemplo 3: Seção com Layout Customizado

```tsx
import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { Section, Tag, Heading, Text, Button } from "@/components/ui";

function CallToActionSection() {
  return (
    <Section className="bg-primary text-white">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-8"
        variants={staggerItemVariants}
      >
        <div>
          <Tag className="text-white mb-4">Transforme o futuro</Tag>
          <Heading level={2} className="text-white mb-4">
            Faça parte dessa mudança
          </Heading>
          <Text className="text-white/90">
            Junte-se a nós nessa jornada de transformação
          </Text>
        </div>
        <Button variant="outline" size="lg" href="/contato">
          Entre em contato
        </Button>
      </motion.div>
    </Section>
  );
}
```

---

## 🎯 Boas Práticas

### 1. Sempre use componentes UI quando possível

❌ **Evite:**

```tsx
<div className="bg-white border border-gray-100 rounded-xl shadow-md p-6">
  <h3 className="text-2xl font-bold mb-3">Título</h3>
  <p className="text-gray-600">Descrição</p>
</div>
```

✅ **Prefira:**

```tsx
<Card padding="md">
  <Heading level={4} className="mb-3">
    Título
  </Heading>
  <Text variant="muted">Descrição</Text>
</Card>
```

### 2. Use as cores do CMS

❌ **Evite cores fixas:**

```tsx
<div className="bg-green-500">...</div>
```

✅ **Use as variáveis do CMS:**

```tsx
<div className="bg-primary">...</div>
```

### 3. Mantenha consistência visual

Use sempre os mesmos componentes para elementos similares. Isso garante:

- Aparência consistente
- Fácil manutenção
- Mudanças globais mais simples

### 4. Componentes devem ser composíveis

Prefira combinar componentes pequenos a criar componentes grandes e monolíticos.

---

## 📝 Extensões Futuras

Componentes que podem ser adicionados conforme necessário:

- **Modal**: Dialog/modal reutilizável
- **Tabs**: Navegação por abas
- **Accordion**: Conteúdo expansível
- **Toast**: Notificações temporárias
- **Breadcrumb**: Navegação hierárquica
- **Badge**: Etiquetas e contadores
- **Avatar**: Imagem de perfil circular
- **Input**: Campos de formulário padronizados
- **Select**: Dropdown customizado
- **Checkbox/Radio**: Controles de formulário

---

## 🔧 Manutenção

### Adicionando Novos Componentes

1. Crie o componente em `components/ui/`
2. Documente props e uso neste arquivo
3. Exporte no `components/ui/index.ts`
4. Adicione exemplos práticos
5. Atualize componentes existentes para usar o novo componente, se aplicável

### Modificando Componentes Existentes

1. Verifique onde o componente é utilizado
2. Certifique-se de que mudanças não quebram implementações existentes
3. Atualize a documentação se necessário
4. Teste em diferentes contextos (mobile, desktop, temas escuros)

---

## 📚 Recursos

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Design Atômico](https://bradfrost.com/blog/post/atomic-web-design/)
- [React Patterns](https://reactpatterns.com/)

---

Atualizado em: 24 de fevereiro de 2026
