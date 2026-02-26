# Sistema de Cores - Fundação Luzamor

## 📌 Visão Geral

O site utiliza um sistema de cores **configurável via CMS** para elementos de marca, mantendo cores estruturais fixas para consistência do design.

### ⚡ Estratégia 60-30-10 (Ultra Colorido)

O design segue a **regra 60-30-10** para criar um site vibrante e equilibrado:

- **60%** - Fundos suaves com toques coloridos (gradientes sutis: `from-primary/5`, `via-secondary/5`, `to-accent/10`)
- **30%** - Elementos secundários e decorativos (bordas coloridas, overlays gradientes, shadows vibrantes)
- **10%** - Destaques vibrantes (CTAs com gradientes, badges coloridos, ícones animados)

**Aplicação prática nas seções:**

| Seção    | 60% (Base)                                   | 30% (Secundário)                                | 10% (Destaque)              |
| -------- | -------------------------------------------- | ----------------------------------------------- | --------------------------- |
| Hero     | Overlay gradiente                            | `from-primary/80 via-secondary/60 to-accent/70` | CTAs gradiente              |
| Intro    | `from-primary/5 to-secondary/5`              | Decorações coloridas                            | Button gradiente            |
| Impact   | `from-secondary/5 via-accent/5 to-primary/5` | Overlay gradiente                               | Counter primary             |
| Projects | Branco                                       | Bordas `secondary/20` + hover `accent`          | Badge `accent→primary`      |
| Events   | `from-accent/10 to-secondary/10`             | Bordas hover `primary/20`                       | Categorias vibrantes        |
| Courses  | `from-primary/5 to-secondary/10`             | Bordas hover `accent/30`                        | Overlay `primary→secondary` |

---

## 🎨 Cores Configuráveis (CMS)

Estas cores podem ser alteradas em **Sanity Studio → Configuração Global → Tema Visual**:

### 1. **Cor Primária** (`primaryColor`)

- **Padrão**: `#00B749` (verde Luzamor)
- **Onde é usada**:
  - Botões principais
  - Links e CTAs
  - Ícones de destaque
  - Badges e tags
  - Efeitos de hover em títulos
  - Bordas de foco/ativo
- **Classes CSS**: `.bg-primary`, `.text-primary`, `.border-primary`
- **Variável CSS**: `var(--color-primary)`

### 2. **Cor Secundária** (`secondaryColor`)

- **Padrão**: `#8b5cf6` (roxo)
- **Onde é usada**:
  - Botões secundários
  - Elementos de apoio
- **Classes CSS**: `.bg-secondary`, `.text-secondary`, `.border-secondary`
- **Variável CSS**: `var(--color-secondary)`

### 3. **Cor de Destaque** (`accentColor`)

- **Padrão**: `#10b981` (verde esmeralda)
- **Onde é usada**:
  - Elementos que precisam chamar atenção
  - Notificações de sucesso
  - Indicadores especiais
- **Classes CSS**: `.bg-accent`, `.text-accent`, `.border-accent`
- **Variável CSS**: `var(--color-accent)`

### 4. **Cor de Fundo** (`backgroundColor`)

- **Padrão**: `#ffffff` (branco)
- **Onde é usada**:
  - Fundo padrão do body
- **Variável CSS**: `var(--color-bg)`

### 5. **Cor de Texto** (`textColor`)

- **Padrão**: `#1f2937` (cinza escuro)
- **Onde é usada**:
  - Cor padrão de texto do body
- **Variável CSS**: `var(--color-text)`

---

## 🔧 Cores Estruturais (Fixas)

Estas cores **NÃO** são configuráveis e fazem parte do design system:

### Fundos Neutros

- `bg-white` - Fundo branco
- `bg-gray-50` - Fundo cinza muito claro (seções alternadas)
- `bg-gray-900` - Fundo escuro (seções de destaque)
- `bg-gradient-to-b from-white via-gray-50/50 to-white` - Gradientes sutis

### Textos Neutros

- `text-gray-900` - Títulos e textos principais
- `text-gray-600` - Textos secundários e descrições
- `text-gray-500` - Labels e textos terciários
- `text-white` - Texto em fundos escuros

### Bordas e Divisores

- `border-gray-100` - Bordas sutis
- `border-gray-200` - Divisores horizontais
- `border-gray-300` - Bordas de campos de formulário

---

## 🎯 Cores de Categorias (Eventos)

As cores de categorias de eventos são **intencionalmente variadas** para diferenciar visualmente os tipos:

| Categoria   | Cor      | Classe          |
| ----------- | -------- | --------------- |
| Cultural    | Roxo     | `bg-purple-500` |
| Educacional | Azul     | `bg-blue-500`   |
| Social      | Verde    | `bg-green-500`  |
| Arrecadação | Amarelo  | `bg-yellow-500` |
| Celebração  | Rosa     | `bg-pink-500`   |
| Esportivo   | Vermelho | `bg-red-500`    |
| Arte        | Índigo   | `bg-indigo-500` |
| Musical     | Violeta  | `bg-violet-500` |
| Literário   | Ciano    | `bg-cyan-500`   |
| Outro       | Cinza    | `bg-gray-500`   |

---

## � Referência Técnica: Classes CSS

### Utility Classes Disponíveis

**Método 1: CSS Variables (Definidas em `app/globals.css`)**

```css
/* Background */
.bg-primary         → var(--color-primary)
.bg-secondary       → var(--color-secondary)
.bg-accent          → var(--color-accent)

/* Text */
.text-primary       → var(--color-primary)
.text-secondary     → var(--color-secondary)
.text-accent        → var(--color-accent)

/* Border */
.border-primary     → var(--color-primary)
.border-secondary   → var(--color-secondary)
.border-accent      → var(--color-accent)

/* Hover States */
.hover\:bg-primary:hover
.hover\:text-primary:hover
.hover\:border-primary:hover
```

**Método 2: Tailwind Extended Colors (Definidas em `tailwind.config.ts`)**

Além das utility classes acima, o Tailwind também expõe as cores:

```tsx
// Backgrounds
className = "bg-primary"; // #00B749 (padrão)
className = "bg-primary-dark"; // #005A23 (variante escura)
className = "bg-secondary"; // #8b5cf6 (padrão)
className = "bg-accent"; // #10b981 (padrão)

// Text
className = "text-primary";
className = "text-primary-dark";

// Borders
className = "border-primary";

// Ring (Focus states)
className = "ring-primary"; // focus:ring-primary
className = "ring-offset-primary";

// Divide (Divisores entre elementos)
className = "divide-primary";

// Opacity variants (funcionam automaticamente)
className = "bg-primary/90"; // 90% de opacidade
className = "bg-primary/50"; // 50% de opacidade
className = "hover:bg-primary/80"; // hover com opacidade
```

### Variáveis CSS Disponíveis

Use em `style` props ou arquivos CSS:

```tsx
// Em componentes React
<div style={{
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-text)'
}}>
  Conteúdo
</div>

// Em arquivos CSS
.meu-componente {
  background-color: var(--color-primary);
  border: 2px solid var(--color-secondary);
}
```

Variáveis disponíveis:

- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-bg`
- `--color-text`

---

## �👨‍💻 Guia para Desenvolvedores

### Como Usar Cores Configuráveis

```tsx
// ✅ CORRETO - Usar classes utilitárias
<button className="bg-primary text-white hover:bg-primary/90">
  Clique aqui
</button>

// ✅ CORRETO - Usar variável CSS
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Conteúdo
</div>

// ❌ ERRADO - Hardcoded quando deveria ser configurável
<button className="bg-green-600 text-white">
  Botão
</button>
```

### Quando Usar Cores Configuráveis vs Fixas

**Use cores configuráveis (bg-primary, text-primary):**

- Elementos de marca e identidade visual
- CTAs e botões principais
- Links e elementos interativos importantes
- Ícones de destaque

**Use cores fixas (bg-gray-50, text-gray-600):**

- Fundos de seções e estrutura do layout
- Textos de corpo e descrições
- Bordas e divisores
- Elementos neutros que não fazem parte da identidade

### Adicionando Novas Variantes

Se precisar de variantes (ex: primary/90 para hover):

```tsx
// Variantes de opacidade funcionam automaticamente
<button className="bg-primary hover:bg-primary/90">
  Hover com 90% de opacidade
</button>
```

---

## 🎨 Componentes UI Coloridos

### Button Component (components/ui/Button.tsx)

Os botões agora usam **gradientes vibrantes** seguindo a estratégia 60-30-10:

```tsx
// Primary - Gradiente verde (primary → accent)
<Button variant="primary">
  Inscreva-se
</Button>
// Resultado: bg-gradient-to-r from-primary to-accent

// Secondary - Gradiente roxo (secondary → primary)
<Button variant="secondary">
  Saiba mais
</Button>
// Resultado: bg-gradient-to-r from-secondary to-primary

// Outline - Borda colorida com hover
<Button variant="outline">
  Ver mais
</Button>
// Resultado: border-primary/40 hover:border-accent

// Ghost - Transparente com hover gradiente
<Button variant="ghost">
  Cancelar
</Button>
// Resultado: hover:from-primary hover:to-accent
```

### SectionHeader Component (components/ui/SectionHeader.tsx)

Títulos com **gradiente text vibrante**:

```tsx
<SectionHeader
  tag="Nossos Eventos"
  title="Participe das Atividades"
  description="Venha fazer parte da nossa comunidade"
  layout="split"
  variant="light"
/>
// Título terá: bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text
```

### Card Components

Cards em seções usam bordas coloridas e efeitos hover:

```tsx
// ProjectsSection
border-2 border-secondary/20 hover:border-accent/40

// EventsSection
border-2 border-transparent hover:border-primary/20

// CoursesSection
border-2 border-transparent hover:border-accent/30

// ContactSection
border-2 border-primary/20 hover:border-accent/40
```

---

## 📋 Checklist de Cores (Estratégia 60-30-10)

Ao criar novos componentes, verifique:

**60% - Base (Fundos suaves):**

- [ ] Seções usam gradientes sutis? (`from-primary/5 via-white to-secondary/5`)
- [ ] Fundos brancos têm toques de cor para evitar monotonia?
- [ ] Gradientes são suaves e não agressivos? (opacidade 5-10%)

**30% - Secundário (Decoração):**

- [ ] Cards têm bordas coloridas? (`border-primary/20`, `border-secondary/20`)
- [ ] Borders mudam no hover? (`hover:border-accent/40`)
- [ ] Overlays usam gradientes coloridos? (`from-primary/60 to-secondary/20`)
- [ ] Shadows têm cores vibrantes? (`shadow-primary`, `shadow-accent`)

**10% - Destaque (Vibrante):**

- [ ] Botões primários usam gradientes? (`from-primary to-accent`)
- [ ] Badges e tags são coloridos? (gradientes ou cores sólidas vibrantes)
- [ ] Links importantes usam `text-primary` ou `hover:text-primary`?
- [ ] Ícones de destaque usam cores vibrantes?
- [ ] CTAs se destacam com cores fortes?

**Geral:**

- [ ] Há equilíbrio visual entre as 3 categorias de cores?
- [ ] Nenhuma cor domina mais de 60% da tela?
- [ ] Gradientes são suaves e não causam fadiga visual?
- [ ] Cores mantêm bom contraste para acessibilidade (WCAG AA)?

---

## 🔄 Como Configurar no CMS

1. Acesse **Sanity Studio** em `/fundacao-cms`
2. Navegue até **Configuração Global**
3. Edite a seção **Tema Visual**
4. Insira cores em formato hexadecimal (ex: `#00B749`)
5. **Publique** as alterações
6. As cores serão aplicadas automaticamente no site

### Cores Recomendadas

Para manter harmonia visual, use ferramentas como:

- [Coolors.co](https://coolors.co) - Gerador de paletas
- [Adobe Color](https://color.adobe.com) - Harmonias de cores
- Contraste WCAG (mínimo 4.5:1 para texto normal)

### Exemplo de Paleta

```
Cor Primária: #00B749    (verde Luzamor)
Cor Secundária: #005A23  (verde escuro)
Cor de Destaque: #FFC700 (amarelo dourado)
Cor de Fundo: #FFFFFF    (branco)
Cor de Texto: #1F2937    (cinza escuro)
```

---

## 🎨 Implementação Técnica

### CSS Variables (globals.css)

```css
body {
  --color-primary: #00b749; /* Do CMS */
  --color-secondary: #8b5cf6; /* Do CMS */
  --color-accent: #10b981; /* Do CMS */
  --color-bg: #ffffff; /* Do CMS */
  --color-text: #1f2937; /* Do CMS */
}
```

### Classes Utilitárias (globals.css)

```css
.bg-primary {
  background-color: var(--color-primary);
}
.text-primary {
  color: var(--color-primary);
}
.border-primary {
  border-color: var(--color-primary);
}
/* ... e variantes de hover */
```

### Tailwind Config (tailwind.config.ts)

O Tailwind também expõe as cores para uso em ring, shadow, divide, etc:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00B749", // padrão
          dark: "#005A23", // variante mais escura
        },
        secondary: {
          DEFAULT: "#8b5cf6",
        },
        accent: {
          DEFAULT: "#10b981",
        },
      },
    },
  },
};
```

Isso permite usar:

- `ring-primary` para focus states
- `shadow-primary` para sombras
- `bg-primary-dark` para variantes
- `divide-primary` para divisores

### TypeScript Interface

```typescript
export interface ThemeColors {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
}
```

---

## 🐛 Troubleshooting

### Cores não aparecem após mudança no CMS

1. Verifique se publicou as alterações no Sanity
2. Limpe o cache do navegador (Ctrl + Shift + R)
3. Reinicie o servidor de desenvolvimento
4. Verifique se o formato é hexadecimal correto (#000000)

### Cor aparece em alguns lugares mas não em outros

- Verifique se o componente está usando classes corretas (`.bg-primary` vs `.bg-green-600`)
- Algumas cores podem estar hardcoded intencionalmente (categorias de eventos, por exemplo)

---

## 📚 Referências

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
