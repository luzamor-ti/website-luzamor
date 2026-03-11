# 📚 Guia do CMS - Seções da Home

## 🎯 Visão Geral

O schema `secaoHome` foi completamente reorganizado para ser **mais intuitivo e fácil de usar**. Agora os campos estão organizados em grupos lógicos com descrições claras e validações inteligentes.

---

## ✨ Melhorias Implementadas

### 1. **Organização em Grupos** 📂

Os campos agora estão divididos em 5 grupos claros:

- **🔖 Identificação**: Tipo da seção e status (ativa/inativa)
- **📝 Conteúdo Principal**: Tag, título e descrição
- **🔗 Botões e Links**: Ações principais e secundárias
- **🎴 Cards/Itens**: Conteúdo dos cards da seção
- **⚙️ Configurações**: Opções avançadas (geralmente não necessárias)

### 2. **Seletor Visual de Ícones** 🎨

Antes você precisava digitar o nome exato do ícone (ex: `DollarSign`).

**Agora**: Um dropdown intuitivo com emojis:

- 👥 Pessoas
- 💰 Dinheiro
- ⏰ Tempo/Relógio
- ❤️ Coração
- 🤝 Aperto de Mãos
- 🎓 Educação
- 🎯 Alvo/Meta
- 📈 Crescimento
- 🏆 Troféu/Prêmio
- 💬 Mensagem
- 📧 Email
- 📞 Telefone
- 📍 Localização
- 📅 Calendário
- ✓ Check/Confirmação
- ⭐ Estrela
- ✨ Brilho/Destaque
- ⚡ Raio/Energia

### 3. **Campos Inteligentes** 🧠

- **Placeholders úteis**: Exemplos em cada campo
- **Validações**: Limites de caracteres adequados
- **Campos condicionais**: URL do botão só aparece se você preencher o texto do botão
- **Descrições contextuais**: Cada campo explica claramente seu propósito

### 4. **Preview Melhorado** 👁️

- Lista de seções mostra emojis para identificação rápida
- Status visual (ativa/inativa) claramente marcado
- Cards mostram ícone ou imagem com preview rico
- Descrições truncadas automaticamente

### 5. **Ordenação Flexível** 📊

Agora você pode ordenar as seções por:

- Tipo de seção (alfabético)
- Título (alfabético)

### 6. **Campos Condicionais por Tipo de Seção** 🎛️

Cada tipo de seção exibe apenas os campos relevantes para ela. Isso elimina a confusão de ver campos de outros tipos que não se aplicam ao seu contexto.

**Exemplo:** A seção `supporters` não tem "Título" (pois não é usada no componente). Já a seção `intro` é a única que mostra o campo "Imagem Principal".

Consulte a tabela completa na seção [Campos por Tipo de Seção](#-campos-por-tipo-de-seção) abaixo.

### 7. **Seletor de Páginas Internas** 🗺️

Os campos de URL (botões e links) agora são **dropdowns com todas as páginas do site**. Não é mais necessário digitar caminhos manualmente — basta selecionar a página de destino.

---

## 🚀 Como Usar

### Criar uma Nova Seção

1. **Vá para "Seções da Home"** no CMS
2. **Clique em "Create"**
3. **Selecione o tipo de seção** (ex: "🙋 Como Ajudar")
4. **Preencha os grupos na ordem**:

#### Grupo 1: Identificação

- ✅ **Tipo da Seção**: Escolha qual seção você está criando
- ◻️ **Seção Ativa**: Marque para exibir na página

#### Grupo 2: Conteúdo Principal

- 📌 **Tag Superior**: Texto pequeno acima do título (ex: "Nossa Missão")
- 📝 **Título Principal**: O título grande (ex: "Como você pode nos ajudar")
- 📄 **Descrição**: Texto explicativo

#### Grupo 3: Botões e Links

- 🔘 **Texto do Botão Principal**: Se houver botão principal
- 🔗 **Link do Botão**: Para onde leva (aparece automaticamente)
- 🔘 **Texto do Link Secundário**: Link alternativo
- 🔗 **Link Secundário**: URL do link

#### Grupo 4: Cards/Itens

Adicione quantos cards precisar. Cada card tem:

- 📝 **Título**: Nome do card (obrigatório)
- 📄 **Descrição**: Explicação do card
- 🎨 **Ícone**: Selecione da lista visual
- 🖼️ **Imagem**: Imagem de fundo (opcional)
- 🔗 **Link do Card**: Para onde vai ao clicar (opcional)
- 📊 **Número/Métrica**: Para seções de impacto (opcional)
- 📌 **Subtítulo**: Texto adicional (opcional)

#### Grupo 5: Configurações

⚠️ **Apenas para casos específicos** - geralmente não precisa preencher

---

## 💡 Dicas de Uso

### ✅ Boas Práticas

1. **Títulos concisos**: Máximo 60-100 caracteres
2. **Descrições claras**: Máximo 200 caracteres por card
3. **Use emojis no seletor**: Facilita identificar o ícone certo
4. **Imagens otimizadas**: Use imagens de boa qualidade mas não muito pesadas
5. **Links corretos**: Use o dropdown de páginas internas. Para URLs externas, o campo aceita `https://...` diretamente

### ⚠️ Campos Opcionais vs Obrigatórios

**Obrigatórios** (⭐):

- Tipo da Seção
- Título Principal
- Título de cada Card

**Opcionais**:

- Tudo o mais depende do seu conteúdo

### 🎯 Quando Usar Cada Campo

| Campo               | Quando Usar                               |
| ------------------- | ----------------------------------------- |
| **Tag**             | Para adicionar contexto acima do título   |
| **Botão Principal** | Ação principal da seção (ex: "Doe Agora") |
| **Link Secundário** | Ação alternativa (ex: "Saiba Mais")       |
| **Ícone do Card**   | Sempre que quiser representação visual    |
| **Imagem do Card**  | Para cards com destaque visual forte      |
| **URL do Card**     | Quando o card deve ser clicável           |
| **Número/Métrica**  | Seções de impacto/estatísticas            |

---

## 🔄 Comparação: Antes vs Depois

### ❌ Antes

- Campo de ícone: digitava "DollarSign" (confuso!)
- Campos todos misturados
- Não sabia quais campos eram necessários
- URLs sem exemplo
- Preview simples

### ✅ Agora

- Seletor visual: "💰 Dinheiro" (intuitivo!)
- Campos organizados em grupos lógicos
- Descrições claras em cada campo
- Placeholders com exemplos
- Preview rico com emojis e status
- Campos condicionais (menos confusão)
- Validações de comprimento
- Ordenação flexível

---

## 📋 Exemplo Prático

### Criando a Seção "Como Ajudar"

1. **Identificação**:
   - Tipo: `🙋 Como Ajudar`
   - Ativa: `✅ Sim`

2. **Conteúdo**:
   - Tag: `Faça a diferença`
   - Título: `Como você pode nos ajudar`
   - Descrição: `Existem várias formas de contribuir com nossa missão...`

3. **Botões**:
   - Botão Principal: `Junte-se à nossa missão`
   - Link Botão: `/voluntario`

4. **Cards** (exemplo de 3 cards):

   **Card 1:**
   - Título: `Faça uma doação`
   - Descrição: `Sua contribuição financeira ajuda a manter nossos projetos`
   - Ícone: `💰 Dinheiro`
   - Link: `/doe-agora`

   **Card 2:**
   - Título: `Seja voluntário`
   - Descrição: `Doe seu tempo e talento para transformar vidas`
   - Ícone: `❤️ Coração`
   - Link: `/voluntario`

   **Card 3:**
   - Título: `Divulgue nossa causa`
   - Descrição: `Compartilhe nosso trabalho nas redes sociais`
   - Ícone: `📈 Crescimento`
   - Link: `/compartilhe`

---

## �️ Campos por Tipo de Seção

A tabela abaixo mostra quais campos ficam **visíveis** no Studio para cada tipo de seção. Campos marcados com ✅ são exibidos; ❌ estão ocultos automaticamente.

| Campo          | intro | projects | members | supporters | faq | contact | impact | initiatives | howToHelp |
| -------------- | :---: | :------: | :-----: | :--------: | :-: | :-----: | :----: | :---------: | :-------: |
| tag            |  ✅   |    ✅    |   ✅    |     ✅     | ✅  |   ✅    |   ✅   |     ✅      |    ✅     |
| titulo         |  ✅   |    ✅    |   ✅    |     ❌     | ✅  |   ✅    |   ✅   |     ✅      |    ✅     |
| descricao      |  ✅   |    ✅    |   ✅    |     ✅     | ✅  |   ❌    |   ✅   |     ✅      |    ✅     |
| imagem (seção) |  ✅   |    ❌    |   ❌    |     ❌     | ❌  |   ❌    |   ❌   |     ❌      |    ❌     |
| textoBotao     |  ✅   |    ❌    |   ❌    |     ❌     | ❌  |   ❌    |   ❌   |     ✅      |    ✅     |
| urlBotao       | ✅\*  |    ❌    |   ❌    |     ❌     | ❌  |   ❌    |   ❌   |     ❌      |    ❌     |
| textoLink      |  ❌   |    ✅    |   ❌    |     ✅     | ❌  |   ❌    |   ❌   |     ✅      |    ✅     |
| urlLink        |  ❌   |   ✅\*   |   ❌    |    ✅\*    | ❌  |   ❌    |   ❌   |    ✅\*     |   ✅\*    |
| cards (array)  |  ❌   |    ❌    |   ❌    |     ❌     | ❌  |   ❌    |   ✅   |     ✅      |    ✅     |
| labels         |  ❌   |    ❌    |   ❌    |     ❌     | ❌  |   ✅    |   ❌   |     ❌      |    ❌     |

> **\*** Campo condicional: só aparece quando o campo de texto correspondente está preenchido (ex: `urlBotao` só aparece se `textoBotao` tiver valor).

### Sub-campos dos Cards

| Campo do Card  | impact | initiatives | howToHelp |
| -------------- | :----: | :---------: | :-------: |
| titulo         |   ✅   |     ✅      |    ✅     |
| descricao      |   ✅   |     ❌      |    ✅     |
| icone          |   ❌   |     ❌      |    ✅     |
| imagem         |   ✅   |     ✅      |    ✅     |
| url (destino)  |   ❌   |     ✅      |    ✅     |
| subtitulo      |   ❌   |     ✅      |    ❌     |
| numero/métrica |   ✅   |     ❌      |    ❌     |

---

## �🆘 Problemas Comuns

### Não vejo o campo de URL do Botão

✅ **Solução**: Preencha primeiro o "Texto do Botão". O campo de URL aparece automaticamente.

### Não sei qual ícone escolher

✅ **Solução**: Use os emojis como guia visual. Eles representam exatamente o que o ícone vai mostrar.

### O card não está clicável

✅ **Solução**: Preencha o campo "Link do Card" com a URL desejada.

### A seção não aparece no site

✅ **Solução**: Verifique se o campo "Seção Ativa" está marcado.

---

## 🎓 Campos Avançados

### Labels Customizados

Raramente usado. Serve para seções muito específicas que precisam de labels personalizados (ex: formulário de contato com campos customizados).

**Quando usar**: Quase nunca. 99% das seções não precisam disso.

---

## 📞 Suporte

Dúvidas sobre como usar o CMS? Entre em contato com a equipe de desenvolvimento.

---

**Documentação criada em:** 26/02/2026  
**Versão do Schema:** 3.0 (Campos condicionais + seletor de páginas internas)
