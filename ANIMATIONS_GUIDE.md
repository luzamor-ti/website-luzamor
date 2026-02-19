# 🎬 Animações Otimizadas - Fundação Luzamor

## 📊 Sumário das Animações Implementadas

Todas as animações foram implementadas com **Framer Motion** usando apenas propriedades aceleradas por GPU para máxima performance.

### ✅ Tipos de Animações

| Seção          | Tipo                       | Descrição                                                       |
| -------------- | -------------------------- | --------------------------------------------------------------- |
| **Hero**       | Stagger + Slide Up         | Título e subtítulo aparecem em cascata                          |
| **Projetos**   | Scroll Reveal + Hover Lift | Cards aparecem ao entrar na viewport com efeito de levantamento |
| **Membros**    | Scale In + Stagger         | Membros aparecem com crescimento suave em cascata               |
| **Apoiadores** | Scroll Reveal + Hover Lift | Logos aparecem ao rolar com efeito hover                        |
| **FAQ**        | Scroll Reveal + Accordion  | Perguntas aparecem com animação de abertura suave               |
| **Contato**    | Slide In Alternado         | Cards deslizam alternando esquerda/direita                      |

## 🚀 Otimizações Implementadas

### 1. **GPU-Accelerated Properties**

- ✅ Apenas `opacity` e `transform` (translate, scale, rotate)
- ✅ Sem animação de `width`, `height`, `padding`, etc.
- ✅ Máxima performance mesmo em dispositivos lentos

### 2. **Viewport-Based Animations**

```typescript
whileInView="visible"
viewport={{ once: true, margin: "-100px" }}
```

- ✅ Anima apenas quando o elemento entra na viewport
- ✅ `once: true` executa apenas uma vez
- ✅ Margin de -100px para começar antes de aparecer na tela

### 3. **Stagger Optimization**

```typescript
staggerChildren: 0.1; // 100ms entre cada filho
delayChildren: 0.3; // Espera 300ms antes de começar
```

- ✅ Cria efeito cascata sem executar tudo simultaneamente
- ✅ Baixo impacto de performance

### 4. **AnimatePresence para Accordion**

```typescript
<AnimatePresence>
  {openId === item._id && (
    <motion.div>...</motion.div>
  )}
</AnimatePresence>
```

- ✅ Anima entrada e saída de elementos
- ✅ Não causa layout shift

### 5. **Durations Curtas**

- ✅ 0.3-0.6 segundos (não menos)
- ✅ Sente-se responsivo
- ✅ Não é intrusivo

## 📈 Performance Metrics

### Lighthouse Performance Esperado

| Métrica                            | Esperado |
| ---------------------------------- | -------- |
| **FCP** (First Contentful Paint)   | < 1.5s   |
| **LCP** (Largest Contentful Paint) | < 2.5s   |
| **CLS** (Cumulative Layout Shift)  | < 0.1    |
| **TTI** (Time to Interactive)      | < 3.8s   |

### Por que essas métricas?

1. **Sem layout shifts** - Apenas transform, nada muda o layout
2. **Lazy animations** - Só anima o que é visível
3. **Efficient re-renders** - Framer Motion otimiza automaticamente

## 💡 Padrões de Animação Usados

### 1. **Fade In Variants**

```typescript
fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
```

### 2. **Slide Up Variants**

```typescript
slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
```

### 3. **Stagger Container**

```typescript
staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};
```

### 4. **Scroll Reveal**

```typescript
whileInView="visible"
viewport={{ once: true, margin: "-100px" }}
```

## 🔧 Como Usar em Novos Componentes

### Exemplo Básico

```tsx
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

export function NewSection({ data }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
    >
      <motion.h2 variants={staggerItemVariants}>Título</motion.h2>
      {data.map((item) => (
        <motion.div key={item.id} variants={staggerItemVariants}>
          {item.name}
        </motion.div>
      ))}
    </motion.section>
  );
}
```

## 🎯 Checklist para Novas Animações

- [ ] Usar apenas `opacity` e `transform`
- [ ] Adicionar `whileInView` para scroll reveal
- [ ] Usar `once: true` para executar uma única vez
- [ ] Adicionar `margin: "-100px"` para começar antes
- [ ] Usar `staggerChildren` para cascata
- [ ] Durations entre 0.3-0.6 segundos
- [ ] Testar em dispositivos móveis/lentos

## 🔍 Monitoramento de Performance

### Para verificar performance:

```bash
# Build para produção
npm run build

# Analisar com Lighthouse
# Chrome DevTools → Lighthouse → Generate report
```

### Ferramentas recomendadas:

- Chrome DevTools (Performance tab)
- WebPageTest.org
- GTmetrix

## 📚 Referências

- [Framer Motion Docs](https://www.framer.com/motion)
- [Web Vitals](https://web.dev/vitals/)
- [GPU Accelerated Properties](https://www.smashingmagazine.com/2019/05/responsive-component-library/)

---

**Última atualização:** Fevereiro 2026  
**Versão:** 1.0
