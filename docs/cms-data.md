# Dados do CMS - Sanity Studio

Este documento lista todos os tipos de conteúdo que podem ser cadastrados pelo cliente através do Sanity Studio.

## Índice

1. [Configurações Gerais](#configurações-gerais)
2. [Navegação e Estrutura](#navegação-e-estrutura)
3. [Conteúdo da Home](#conteúdo-da-home)
4. [Projetos e Trabalhos](#projetos-e-trabalhos)
5. [Equipe e Apoiadores](#equipe-e-apoiadores)
6. [FAQ](#faq)

---

## Configurações Gerais

### Configuração Global

**Tipo:** `configuracaoGlobal`  
**Quantidade:** Documento único (singleton)  
**Descrição:** Configurações globais do site que aparecem em todas as páginas.

#### Campos:

| Campo                 | Tipo        | Obrigatório | Descrição                          |
| --------------------- | ----------- | ----------- | ---------------------------------- |
| **Nome do Site**      | Texto curto | Não         | Nome oficial do site               |
| **Descrição do Site** | Texto longo | Não         | Descrição para SEO e redes sociais |
| **Logo**              | Imagem      | Não         | Logo principal da organização      |

#### Contato:

| Campo         | Tipo  | Descrição                   |
| ------------- | ----- | --------------------------- |
| **Email**     | Texto | Email principal             |
| **Telefone**  | Texto | Telefone/WhatsApp           |
| **Endereço**  | Texto | Endereço físico             |
| **Facebook**  | URL   | Link da página no Facebook  |
| **Instagram** | URL   | Link do perfil no Instagram |
| **LinkedIn**  | URL   | Link da página no LinkedIn  |

#### Tema Visual:

| Campo               | Tipo  | Descrição                    |
| ------------------- | ----- | ---------------------------- |
| **Cor Primária**    | Texto | Código hex (ex: #0D3B66)     |
| **Cor Secundária**  | Texto | Código hex da cor secundária |
| **Cor de Destaque** | Texto | Código hex para destaques    |
| **Cor de Fundo**    | Texto | Código hex do fundo          |
| **Cor de Texto**    | Texto | Código hex do texto          |

---

## Navegação e Estrutura

### Navbar

**Tipo:** `navbar`  
**Quantidade:** Documento único  
**Descrição:** Menu de navegação principal do site.

#### Campos:

| Campo                   | Tipo             | Obrigatório | Descrição                                             |
| ----------------------- | ---------------- | ----------- | ----------------------------------------------------- |
| **Itens do Menu**       | Array de objetos | Não         | Lista de links do menu                                |
| └─ Título Personalizado | Texto            | Não         | Nome exibido no menu (se vazio, usa título da página) |
| └─ Slug da Página       | Texto            | Sim         | Caminho da página (ex: /sobre, /projetos)             |
| **Botão Principal**     | Objeto           | Não         | Botão de destaque no menu                             |
| └─ Título do Botão      | Texto            | Sim         | Texto do botão (ex: "Quero Patrocinar")               |

#### Exemplo de uso:

```
Itens do Menu:
- Sobre → /sobre
- Projetos → /projetos
- Equipe → /equipe

Botão Principal: "Quero Patrocinar"
```

---

### Rodapé

**Tipo:** `rodape`  
**Quantidade:** Documento único  
**Descrição:** Conteúdo do rodapé em todas as páginas.

#### Campos:

| Campo                           | Tipo        | Obrigatório | Descrição                         |
| ------------------------------- | ----------- | ----------- | --------------------------------- |
| **Slogan**                      | Texto curto | Não         | Frase de impacto no rodapé        |
| **Título Seja Apoiador**        | Texto curto | Não         | Título da seção de apoio          |
| **Subtítulo Seja Apoiador**     | Texto longo | Não         | Descrição da chamada para apoio   |
| **Email que recebe inscrições** | Texto       | Não         | Email para onde vão as inscrições |

#### Contatos:

| Campo                   | Tipo  | Descrição           |
| ----------------------- | ----- | ------------------- |
| **Email**               | Texto | Email de contato    |
| **Telefone / WhatsApp** | Texto | Número para contato |
| **Endereço**            | Texto | Endereço completo   |
| **Link Google Maps**    | Texto | URL do Google Maps  |

---

## Conteúdo da Home

### Hero Section

**Tipo:** `hero`  
**Quantidade:** Múltiplos documentos (apenas 1 ativo por vez)  
**Descrição:** Seção de destaque no topo da página inicial.

#### Campos:

| Campo                | Tipo        | Obrigatório | Descrição                                   |
| -------------------- | ----------- | ----------- | ------------------------------------------- |
| **Título**           | Texto curto | ✅ Sim      | Título principal em destaque                |
| **Tagline**          | Texto curto | Não         | Texto pequeno acima do título               |
| **Subtítulo**        | Texto longo | Não         | Descrição abaixo do título                  |
| **Imagem de Fundo**  | Imagem      | Não         | Imagem de fundo da seção hero               |
| └─ Texto Alternativo | Texto       | Não         | Descrição da imagem para acessibilidade     |
| **CTA Primário**     | Objeto      | Não         | Botão principal de ação                     |
| └─ Texto             | Texto       | ✅ Sim      | Texto do botão                              |
| └─ URL               | Texto       | ✅ Sim      | Link de destino                             |
| **CTA Secundário**   | Objeto      | Não         | Botão secundário                            |
| └─ Texto             | Texto       | Não         | Texto do botão                              |
| └─ URL               | Texto       | Não         | Link de destino                             |
| **Ativo**            | Booleano    | Não         | Se este hero deve ser exibido (padrão: sim) |

#### Exemplo de uso:

```
Título: "Transformando cultura em experiências reais"
Tagline: "Juntos nós criamos impacto"
Subtítulo: "Uma fundação dedicada à preservação da memória..."
CTA Primário: "Quero patrocinar" → /contato
CTA Secundário: "Conheça nossa fundação" → /sobre
```

---

## Projetos e Trabalhos

### Projeto

**Tipo:** `projeto`  
**Quantidade:** Múltiplos documentos  
**Descrição:** Projetos sociais ou culturais da fundação.

#### Campos:

| Campo                | Tipo        | Obrigatório | Descrição                         |
| -------------------- | ----------- | ----------- | --------------------------------- |
| **Título**           | Texto curto | ✅ Sim      | Nome do projeto                   |
| **Slug**             | Slug        | ✅ Sim      | URL amigável (gerado do título)   |
| **Imagem de Capa**   | Imagem      | Não         | Imagem principal do projeto       |
| **Descrição Curta**  | Texto longo | Não         | Resumo para listagens             |
| **Conteúdo**         | Rich Text   | Não         | Descrição completa com formatação |
| **Valor Meta**       | Número      | Não         | Meta de arrecadação (R$)          |
| **Valor Arrecadado** | Número      | Não         | Valor já arrecadado (R$)          |
| **Ativo**            | Booleano    | Não         | Se deve ser exibido (padrão: sim) |

#### Exemplo de uso:

```
Título: "Orquestra Jovem"
Slug: orquestra-jovem
Descrição Curta: "Formação musical para jovens de 12 a 18 anos"
Valor Meta: R$ 50.000,00
Valor Arrecadado: R$ 32.500,00
```

---

### Trabalho

**Tipo:** `trabalho`  
**Quantidade:** Múltiplos documentos  
**Descrição:** Trabalhos, cases ou realizações da fundação.

#### Campos:

| Campo         | Tipo        | Obrigatório | Descrição                                    |
| ------------- | ----------- | ----------- | -------------------------------------------- |
| **Título**    | Texto curto | ✅ Sim      | Nome do trabalho                             |
| **Slug**      | Slug        | ✅ Sim      | URL amigável (gerado do título)              |
| **Imagem**    | Imagem      | Não         | Imagem principal                             |
| **Descrição** | Texto longo | Não         | Resumo do trabalho                           |
| **Conteúdo**  | Rich Text   | Não         | Detalhes completos com formatação            |
| **Categoria** | Texto curto | Não         | Tipo de trabalho (ex: "Cultura", "Educação") |

#### Exemplo de uso:

```
Título: "Festival de Verão 2025"
Categoria: "Cultura"
Descrição: "Evento realizado no verão com 5000 participantes"
```

---

## Equipe e Apoiadores

### Membro da Equipe

**Tipo:** `membro`  
**Quantidade:** Múltiplos documentos  
**Descrição:** Membros da equipe ou conselho da fundação.

#### Campos:

| Campo            | Tipo        | Obrigatório | Descrição                            |
| ---------------- | ----------- | ----------- | ------------------------------------ |
| **Nome**         | Texto curto | ✅ Sim      | Nome completo                        |
| **Cargo**        | Texto curto | Não         | Função na organização                |
| **Foto**         | Imagem      | Não         | Foto do membro                       |
| **Bio Curta**    | Texto longo | Não         | Descrição resumida para cards        |
| **Bio Completa** | Rich Text   | Não         | Biografia detalhada                  |
| **Ordem**        | Número      | Não         | Ordem de exibição (menor = primeiro) |

#### Exemplo de uso:

```
Nome: "Maria Silva"
Cargo: "Diretora Executiva"
Bio Curta: "20 anos de experiência em gestão cultural"
Ordem: 1
```

---

### Apoiador

**Tipo:** `apoiador`  
**Quantidade:** Múltiplos documentos  
**Descrição:** Empresas e organizações parceiras.

#### Campos:

| Campo        | Tipo        | Obrigatório | Descrição                             |
| ------------ | ----------- | ----------- | ------------------------------------- |
| **Nome**     | Texto curto | ✅ Sim      | Nome do apoiador                      |
| **Logo**     | Imagem      | Não         | Logotipo da empresa                   |
| **Site**     | URL         | Não         | Website do apoiador                   |
| **Destaque** | Booleano    | Não         | Se é apoiador principal (padrão: não) |
| **Ordem**    | Número      | Não         | Ordem de exibição                     |

#### Exemplo de uso:

```
Nome: "Empresa ABC"
Site: https://empresaabc.com.br
Destaque: Sim (para apoiadores principais)
Ordem: 1
```

---

## FAQ

### Pergunta Frequente

**Tipo:** `faq`  
**Quantidade:** Múltiplos documentos  
**Descrição:** Perguntas e respostas frequentes sobre a fundação.

#### Campos:

| Campo         | Tipo        | Obrigatório | Descrição                               |
| ------------- | ----------- | ----------- | --------------------------------------- |
| **Pergunta**  | Texto curto | ✅ Sim      | A pergunta                              |
| **Resposta**  | Rich Text   | ✅ Sim      | Resposta detalhada com formatação       |
| **Categoria** | Texto curto | Não         | Agrupamento (ex: "Doações", "Projetos") |
| **Ordem**     | Número      | Não         | Ordem de exibição                       |
| **Ativo**     | Booleano    | Não         | Se deve ser exibido (padrão: sim)       |

#### Exemplo de uso:

```
Pergunta: "Como posso fazer uma doação?"
Categoria: "Doações"
Resposta: "Você pode fazer doações através de..."
Ordem: 1
```

---

## Resumo por Prioridade

### ✅ Essencial para o lançamento:

1. **Hero Section** - Primeira impressão do site
2. **Navbar** - Navegação principal
3. **Configuração Global** - Dados básicos e logo
4. **Projetos** - Conteúdo principal
5. **FAQ** - Dúvidas comuns

### 📊 Importante:

1. **Membros** - Credibilidade da equipe
2. **Apoiadores** - Mostrar parcerias
3. **Rodapé** - Informações de contato

### 📝 Complementar:

1. **Trabalhos** - Portfólio de realizações
2. **Tema Visual** - Personalização de cores

---

## Notas Técnicas

### Campos Rich Text

Campos do tipo "Rich Text" (array of blocks) suportam:

- **Formatação:** Negrito, itálico, sublinhado
- **Listas:** Numeradas e com marcadores
- **Links:** Para páginas internas ou externas
- **Títulos:** H2, H3, H4

### Imagens

Todas as imagens suportam:

- Upload direto no Sanity
- Hotspot (ponto focal para recortes)
- Texto alternativo para acessibilidade
- Otimização automática

### Slugs

Slugs são gerados automaticamente a partir do título, mas podem ser editados:

- Formato: `titulo-do-projeto`
- Apenas letras minúsculas, números e hífens
- Único para cada documento

### Ordem de Exibição

Campos de "Ordem" controlam a sequência de exibição:

- **Menor número = aparece primeiro**
- Exemplo: Ordem 1, 2, 3, 4...
- Se não definido, usa ordem de criação

---

## Acesso ao CMS

**URL:** `http://seusite.com/fundacao-cms`

**Permissões:**

- Administradores: acesso completo
- Editores: criar/editar conteúdo
- Visualizadores: apenas leitura
