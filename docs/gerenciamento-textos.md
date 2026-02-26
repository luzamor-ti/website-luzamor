# Sistema de Gerenciamento de Textos

Este documento explica como funciona o sistema de gerenciamento de textos estáticos e dinâmicos do projeto.

## Estrutura

### 1. Constantes de Fallback (`constants/textFallbacks.ts`)

Arquivo que contém todos os textos fallback usados quando o CMS não retorna dados. Estes textos servem como **prevenção de erro** e não devem ser editados diretamente para alterações de conteúdo.

**Estrutura:**

```typescript
export const TEXT_FALLBACKS = {
  intro: {
    tag: "Texto da tag",
    titulo: "Título da seção",
    descricao: "Descrição...",
    // ...
  },
  // outras seções...
};
```

### 2. Schema CMS (`sanity/schemaTypes/secaoHome.ts`)

Schema que define como os textos são gerenciados no Sanity CMS. Cada seção da home pode ter:

- **nome**: Identificador da seção (não alterar após criar)
- **tag**: Subtítulo pequeno acima do título
- **titulo**: Título principal da seção
- **descricao**: Texto descritivo
- **textoBotao**: Texto do botão principal
- **urlBotao**: Link do botão
- **textoLink**: Texto de links secundários
- **urlLink**: Link secundário
- **cards**: Array de cards/itens da seção
- **labels**: Rótulos específicos (ex: Email, Telefone)
- **ativa**: Define se a seção aparece na página

### 3. Seções Disponíveis

As seguintes seções podem ser gerenciadas via CMS:

| Nome          | Descrição                            | Componente         |
| ------------- | ------------------------------------ | ------------------ |
| `intro`       | Seção de introdução                  | IntroSection       |
| `projects`    | Títulos da seção de projetos         | ProjectsSection    |
| `members`     | Títulos da seção de membros          | MembersSection     |
| `supporters`  | Títulos da seção de apoiadores       | SupportersSection  |
| `faq`         | Títulos da seção de FAQ              | FaqSection         |
| `contact`     | Títulos e labels da seção de contato | ContactSection     |
| `impact`      | Seção de impacto com cards           | ImpactSection      |
| `initiatives` | Seção de iniciativas com cards       | InitiativesSection |
| `howToHelp`   | Seção "Como Ajudar" com cards        | HowToHelpSection   |

## Como Usar

### Editar Textos via CMS

1. Acesse o Sanity Studio em `/fundacao-cms`
2. Vá em "Seções da Home"
3. Crie ou edite uma seção existente
4. Preencha os campos desejados
5. Marque "Seção Ativa" como true
6. Publique as alterações

### Cards com Ícones

Para seções que usam cards com ícones (HowToHelp), os ícones disponíveis são:

- `Handshake` - Aperto de mãos
- `DollarSign` - Cifrão
- `GraduationCap` - Capelo de formatura
- `Heart` - Coração

### Cards de Impacto

Para a seção de impacto, cada card deve ter:

```typescript
{
  numero: "652+",        // Métrica a ser exibida
  titulo: "Projetos realizados",
  descricao: "Descrição do card"
}
```

### Iniciativas com Imagens

Para a seção de iniciativas, cada card pode ter:

```typescript
{
  titulo: "Nome da iniciativa",
  subtitulo: "Data ou instrutor",
  imagem: /* Upload de imagem */,
  url: "/link-para-detalhes"
}
```

## Fluxo de Dados

```
CMS (Sanity)
    ↓
Queries (sanity/lib/queries/secaoHome.ts)
    ↓
Services (sanity/lib/services/secaoHomeService.ts)
    ↓
Page (app/page.tsx)
    ↓
Components (components/home/*)
    ↓
Fallbacks (constants/textFallbacks.ts)
```

## Prioridade de Dados

1. **Dados do CMS** - Se disponíveis, são usados
2. **Fallbacks** - Se CMS não retornar, usa constantes
3. **Seção Oculta** - Se `ativa: false`, seção não renderiza

## Boas Práticas

### ✅ Fazer

- Editar textos através do CMS
- Manter fallbacks atualizados como backup
- Usar campos apropriados (tag, titulo, descricao)
- Marcar seções como ativas/inativas conforme necessário

### ❌ Não Fazer

- Hardcodar textos diretamente nos componentes
- Alterar o campo "nome" após criar uma seção
- Usar fallbacks para edições de conteúdo
- Deletar seções sem verificar dependências

## Tipos TypeScript

Todos os tipos estão definidos em:

- `sanity/lib/types/secaoHome.ts`

```typescript
interface SecaoHome {
  _id: string;
  nome: NomeSecao;
  tag?: string;
  titulo: string;
  descricao?: string;
  textoBotao?: string;
  urlBotao?: string;
  textoLink?: string;
  urlLink?: string;
  cards?: SecaoHomeCard[];
  labels?: SecaoHomeLabels;
  ativa: boolean;
}
```

## Exemplos de Uso

### Criar Nova Seção de Impacto

1. No CMS, criar documento "Seções da Home"
2. Selecionar nome: "Impacto"
3. Preencher:
   - Tag: "Nosso impacto"
   - Título: "Transformando vidas através da cultura"
4. Adicionar cards com:
   - Número: "652+"
   - Título: "Projetos realizados"
   - Descrição: "Promovendo a cultura..."
5. Marcar como ativa
6. Publicar

### Atualizar Texto de Botão

1. Editar seção existente no CMS
2. Alterar campo "Texto do Botão"
3. Salvar e publicar
4. Mudança reflete automaticamente no site

## Troubleshooting

**Problema**: Seção não aparece no site

- Verificar se `ativa: true`
- Verificar se há dados publicados no CMS
- Checar console para erros

**Problema**: Usando texto de fallback

- CMS pode não ter retornado dados
- Verificar conexão com Sanity
- Verificar se documento está publicado

**Problema**: Cards sem ícone

- Verificar se nome do ícone está correto
- Ícones disponíveis estão no componente
- Adicionar novos ícones no `iconMap` se necessário
