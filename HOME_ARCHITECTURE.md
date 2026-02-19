# 🏗 Arquitetura da Home - Estratégia em Camadas

## 📋 Visão Geral

A Home foi estruturada seguindo uma estratégia profissional de separação de responsabilidades:

```
app/page.tsx
    ↓
homeService (orquestra)
    ↓
Múltiplos services específicos
    ↓
Queries GROQ + Client Sanity
    ↓
Componentes de seção (UI pura)
```

## 🏢 Estrutura de Pastas

```
/app
  page.tsx                    # Home limpa e declarativa

/components/home
  HeroSection.tsx            # Seção hero
  ProjetosSection.tsx        # Lista de projetos
  MembrosSection.tsx         # Equipe
  ApoiadoresSection.tsx      # Apoiadores
  FaqSection.tsx             # FAQ com accordion
  ContatoSection.tsx         # Informações de contato
  index.ts                   # Exports centralizados

/sanity/lib
  /queries
    configuracao.ts          # GROQ para configuração global
    projeto.ts
    membro.ts
    apoiador.ts
    faq.ts
    contato.ts

  /services
    configuracaoService.ts   # Busca configuração
    projetoService.ts
    membroService.ts
    apoiadorService.ts
    faqService.ts
    contatoService.ts
    homeService.ts           # ⭐ NOVO - Orquestrador

  /types
    configuracao.ts
    projeto.ts
    membro.ts
    apoiador.ts
    faq.ts
    contato.ts
```

## 🧠 Como Funciona

### 1. **homeService.ts** - O Orquestrador

```typescript
export async function getHomeData(): Promise<HomeData> {
  const [projetos, membros, apoiadores, faq, contatos, configuracao] =
    await Promise.all([
      getProjetosHome(),
      getMembrosHome(),
      getApoiadoresDestaque(),
      getFaqResumo(),
      getContatos(),
      getConfiguracaoGlobal(),
    ]);

  return { projetos, membros, apoiadores, faq, contatos, configuracao };
}
```

**Por que Promise.all?**

- Executa todas as queries em **paralelo**
- Muito mais rápido do que awaits sequenciais
- A home aguarda o tempo da query mais lenta, não a soma de todas

### 2. **Componentes de Seção** - UI Pura

Cada componente:

- É um cliente (`'use client'`)
- Recebe dados como props
- Não faz fetch
- Pode ter state local (ex: accordion FAQ)
- Responsável apenas por renderizar

Exemplo:

```typescript
interface ProjetosSectionProps {
  data: Projeto[]
}

export function ProjetosSection({ data }: ProjetosSectionProps) {
  return (
    <section className="py-20 px-4">
      {data.map(projeto => (
        <div key={projeto._id}>
          <h3>{projeto.titulo}</h3>
          <p>{projeto.descricaoCurta}</p>
        </div>
      ))}
    </section>
  )
}
```

### 3. **Home Page** - Apenas Composição

```typescript
export default async function Home() {
  const { projetos, membros, apoiadores, faq, contatos, configuracao } =
    await getHomeData();

  return (
    <main>
      <HeroSection data={configuracao} />
      <ProjetosSection data={projetos} />
      <MembrosSection data={membros} />
      <ApoiadoresSection data={apoiadores} />
      <FaqSection data={faq} />
      <ContatoSection data={contatos} />
    </main>
  )
}
```

**Vantagens:**

- ✅ Limpa e declarativa
- ✅ Fácil de ler
- ✅ Fácil de manter
- ✅ Fácil de testar

## 🎯 Benefícios da Arquitetura

| Aspecto            | Benefício                                                       |
| ------------------ | --------------------------------------------------------------- |
| **Performance**    | Promise.all executa queries em paralelo                         |
| **Manutenção**     | Componentes pequenos e focados                                  |
| **Tipagem**        | Tipos fortes em toda a stack                                    |
| **Reutilização**   | Componentes podem ser usados em outras páginas                  |
| **Testabilidade**  | Services e componentes são puros e testáveis                    |
| **Escalabilidade** | Adicionar nova seção = criar novo componente + adicionar à home |

## 📝 Adicionando Nova Seção

Se quiser adicionar uma nova seção (ex: Blog):

1. **Criar o componente:**

   ```typescript
   // /components/home/BlogSection.tsx
   export function BlogSection({ data }: BlogSectionProps) { ... }
   ```

2. **Criar o service:**

   ```typescript
   // /sanity/lib/services/blogService.ts
   export async function getBlogResumo() { ... }
   ```

3. **Adicionar ao homeService:**

   ```typescript
   const blog = await getBlogResumo();
   return { ..., blog };
   ```

4. **Usar na Home:**
   ```typescript
   <BlogSection data={blog} />
   ```

## 🚀 Próximos Passos

- [ ] Ajustar Tailwind classes para o design da fundação
- [ ] Adicionar imagens nos componentes
- [ ] Implementar animações (Framer Motion)
- [ ] Adicionar páginas dinâmicas (projetos, membros, etc)
- [ ] Implementar cache e ISR
