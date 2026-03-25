# Página de Manutenção - Guia de Uso

## Visão Geral

O site agora possui um sistema integrado de manutenção que permite ativar/desativar uma página de manutenção através das configurações globais no Sanity CMS. Quando ativo, todos os visitantes (exceto o Sanity Studio e APIs) serão redirecionados para uma página de manutenção elegante.

## Como Usar

### 1. Acessar as Configurações Globais

No Sanity Studio:

1. Clique em **"Configuração Global"** no menu lateral
2. Você verá um novo grupo chamado **"Manutenção"**

### 2. Ativar o Modo de Manutenção

Na seção **"Manutenção":**

- **Toggle "Site em Manutenção"**: Alterne para `ativado` para mostrar a página de manutenção
- **Campo "Mensagem de Manutenção"**: Customize a mensagem que aparecerá aos visitantes
  - Padrão: _"Desculpe! O site está em manutenção. Em breve estaremos de volta."_
  - Exemplo customizado: _"Estamos atualizando nossos serviços. Voltaremos em 2 horas!"_

### 3. Publicar as Mudanças

Clique em **"Publicar"** para que as mudanças entrem em efeito imediatamente. O redirecionamento é quase instantâneo.

## Comportamento

### Quando em Manutenção

- ✅ Todos os visitantes são redirecionados para `/maintenance`
- ✅ A página mostra:
  - Uma ilustração animada na cor primary do seu site
  - O título "Manutenção"
  - A mensagem customizada
  - Um loader animado com 3 pontinhos
  - Efeitos de background com blur da cor primary
- ✅ A página usa `robots: noindex, nofollow` para não ser indexada por buscadores
- ✅ Animações suaves com Framer Motion

### Exceções (Não são Bloqueados)

Os seguintes acessos continuam funcionando normalmente:

- 🔧 `/maintenance` - A própria página de manutenção
- 🎯 `/fundacao-cms` - Sanity Studio (você pode continuar editando o site)
- 🔌 `/api/*` - Todas as chamadas de API
- 📄 Recursos estáticos (`/_next`, `/favicon.ico`, etc.)

Isso permite que você continue trabalhandando no CMS enquanto o site está em manutenção.

## Arquivos Modificados/Criados

### Schema (CMS)

- **`sanity/schemaTypes/configuracaoGlobal.ts`**
  - Adicionado grupo "Manutenção"
  - Campo `emManutencao` (boolean)
  - Campo `mensagemManutencao` (texto customizado)

### Queries e Tipos

- **`sanity/lib/queries/configuracao.ts`**
  - Adicionados campos `isUnderMaintenance` e `maintenanceMessage` à query GROQ

- **`sanity/lib/types/configuration.ts`**
  - Adicionados tipos para manutenção à interface `GlobalConfiguration`

### Middleware

- **`middleware.ts`** (novo)
  - Verifica status de manutenção em cada requisição
  - Redireciona para `/maintenance` se ativo
  - Exclui rotas necessárias (CMS, APIs, etc.)

### API Route

- **`app/api/maintenance-check/route.ts`** (novo)
  - Endpoint que verifica o status de manutenção
  - Retorna JSON com `isUnderMaintenance`

### Componentes

- **`components/MaintenancePage.tsx`** (novo)
  - Componente client-side da página de manutenção
  - Inclui animações, gradientes e mensagem customizável

- **`components/MaintenanceIllustration.tsx`** (novo)
  - Ilustração SVG animada de uma chave inglesa
  - Cores dinâmicas (cor primary do site)
  - Includes sparkles e detalhes visuais

### Página

- **`app/maintenance/page.tsx`** (novo)
  - Page Route do Next.js
  - Busca configuração global
  - Passa dados para o componente MaintenancePage

## Tecnologias Utilizadas

- ✨ **Framer Motion** - Animações suaves
- 🎨 **Tailwind CSS** - Estilos responsivos
- 🔍 **Next.js Middleware** - Redirecionamento automático
- 📡 **API Routes** - Verificação de status

## Fluxo de Dados

```
Sanity CMS (Configuração Global)
  ↓
configuracaoGlobalQuery (GROQ)
  ↓
configuracaoService.getGlobalConfiguration()
  ↓
┌─────────────────────────────────────┐
│  API Route: /api/maintenance-check  │
│  └→ Middleware verifica status      │
└─────────────────────────────────────┘
  ↓
Se em manutenção: Redireciona para /maintenance
  ↓
MaintenancePage.tsx → MaintenanceIllustration.tsx
```

## Exemplo de Uso Real

### Cenário: Manutenção urgente descoberta

1. Acesse o Sanity Studio
2. Vá para "Configuração Global" > "Manutenção"
3. Ative "Site em Manutenção"
4. Customize a mensagem: _"Detectamos um problema de segurança. Estamos trabalhando para corrigi-lo. Obrigado!"_
5. Clique "Publicar"
6. Instantaneamente, todos os visitantes veem a página de manutenção
7. Você continua trabalhando no Sanity Studio sem problemas
8. Quando corrigir, desative o toggle e publique novamente

## Notas Importantes

⚠️ **Aviso de Deprecação**: Next.js está migrando middleware para "Proxy". A middleware atual funciona perfeitamente em produção. Quando Next.js descontinuar suporte, a sintaxe será atualizada.

🔄 **Cache**: Em caso de cache agressivo, o status de manutenção pode levar alguns segundos para propagar. Isso é normal.

🎨 **Cores**: A ilustração da página de manutenção usa automaticamente a cor primária do seu site (configurada em "Cores e Aparência").

## Troubleshooting

**P: A página de manutenção não aparece logo que ativo?**
R: Pode haver cache no navegador. Recarregue a página em modo incógnito ou limpe o cache.

**P: Quero ajustar a aparência da página de manutenção**
R: Edite `components/MaintenancePage.tsx` e `components/MaintenanceIllustration.tsx`. Ambos usam Tailwind CSS e Framer Motion.

**P: Como voltar ao site normal?**
R: Desative o toggle "Site em Manutenção" na Configuração Global e publique.

---

**Última atualização:** 24 de março de 2026
