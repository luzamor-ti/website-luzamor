# 🎉 Guia de Uso - Eventos no CMS

## 🎯 Visão Geral

O sistema de Eventos permite divulgar e gerenciar todos os eventos da fundação, desde eventos culturais até ações de arrecadação.

## 📝 Campos do Evento

### Informações Básicas

#### **Título do Evento** (obrigatório)

- Nome do evento que será exibido no site
- Exemplo: "Festa Junina Beneficente", "Workshop de Arte"

#### **URL amigável** (obrigatório)

- Gerado automaticamente a partir do título
- Clique em "Generate" para criar
- Usado na URL da página do evento

#### **Imagem de Capa** (obrigatório)

- Imagem principal do evento (proporção recomendada: 16:9)
- Adicione um texto alternativo para acessibilidade
- Esta imagem aparece nos cards do evento

#### **Descrição** (obrigatório)

- Editor de texto rico (Portable Text)
- Descreva o evento, programação, atrações
- Pode incluir formatação: negrito, itálico, listas

#### **Categoria do Evento** (obrigatório)

Escolha a categoria que melhor descreve o evento:

- 🎭 **Cultural** - Apresentações, espetáculos
- 🎓 **Educacional** - Palestras, workshops
- 🤝 **Social** - Ações sociais, campanhas
- 💰 **Arrecadação** - Eventos para captação de recursos
- 🎉 **Celebração** - Festas, comemorações
- 🏃 **Esportivo** - Corridas, torneios
- 🎨 **Arte** - Exposições, oficinas de arte
- 🎵 **Musical** - Shows, apresentações musicais
- 📚 **Literário** - Saraus, feiras de livros
- 🌟 **Outro** - Para eventos que não se encaixam acima

### Detalhes do Evento

#### **Data do Evento** (obrigatório)

- Selecione data e horário
- Use o calendário para escolher
- O horário será exibido na home

#### **Valor do Ingresso**

Configure se o evento é pago ou gratuito:

**Evento Gratuito** (padrão)

- Ative esta opção para eventos de entrada franca
- Aparecerá "Gratuito" no card

**Evento Pago**

- Desative "Evento Gratuito"
- Preencha o **Valor (R$)**
- Exemplo: 25.00 para R$ 25,00
- Opcional: **Informações Adicionais**
  - Exemplo: "Meia-entrada disponível"
  - Exemplo: "Desconto de 20% para grupos"

#### **Call-to-Action (CTA)**

Botão de ação no card do evento:

**CTA Habilitado**

- ✅ Ativo: Mostra botão de ação
- ❌ Inativo: Sem botão (apenas informativo)

**Texto do Botão**

- Padrão: "Garantir meu lugar"
- Exemplos: "Comprar ingresso", "Fazer inscrição", "Saiba mais"

**Tipo de Ação**
Escolha como o botão funciona:

📌 **Link Externo**

- Redireciona para uma URL
- Use para sistemas de venda de ingressos
- Exemplo: Sympla, Eventbrite

📌 **WhatsApp**

- Abre conversa no WhatsApp
- Configure:
  - Número (formato: 5511999999999)
  - Mensagem pré-preenchida

📌 **Email**

- Abre o cliente de email
- Configure o endereço de email

#### **Local do Evento** (opcional)

Informações sobre onde acontecerá:

- **Nome do Local**: "Teatro Municipal", "Sede da Fundação"
- **Endereço**: Endereço completo
- **Link do Google Maps**: URL do mapa

### Configurações

#### **Evento em Destaque**

- ✅ Ativo: Evento aparece maior na home (até 2 eventos)
- ❌ Inativo: Aparece em grid normal
- Use para eventos mais importantes

#### **Evento Ativo**

- ✅ Ativo: Evento aparece no site
- ❌ Inativo: Evento oculto

#### **Cor de Destaque** (opcional)

- Cor em hexadecimal para personalizar o card
- Exemplo: `#FF6B6B` para vermelho
- Exemplo: `#4ECDC4` para turquesa
- Se não preenchido, usa cor padrão

## 🎨 Layout no Site

### EventsSection

**Background:**

- Gradiente cinza escuro neutro (gray-900/gray-800)
- Elementos decorativos em verde (#00B749 - cor primária do projeto)
- Destaca as cores personalizáveis de cada evento

**Eventos em Destaque** (até 2):

- Cards grandes (400px altura)
- Grid 2 colunas (desktop) / 1 coluna (mobile)
- Badge de data no canto
- Badge de categoria
- Gradiente personalizado com a cor de destaque
- Botão de CTA em destaque

**Eventos Regulares** (até 3):

- Cards menores em grid 3 colunas
- Background translúcido
- Exibem próximos eventos futuros

**Animações:**

- Framer Motion para entrada
- Hover eleva os cards
- Imagem aumenta no hover

## 📅 Exibição na Home

O sistema mostra automaticamente:

1. **Eventos em Destaque**: Até 2 eventos marcados como destaque E futuros
2. **Eventos Regulares**: Próximos 3 eventos futuros (não destacados)
3. **Ordenação**: Por data (próximos primeiro)
4. **Filtro**: Só mostra eventos ativos e com data futura

## 💡 Dicas

1. **Imagem de Capa**: Use imagens chamativas e coloridas
2. **Título**: Seja criativo mas claro
3. **Categoria**: Escolha corretamente para melhor organização
4. **Destaque**: Use apenas para eventos muito importantes
5. **Cor de Destaque**: Combine com a paleta visual do evento
6. **CTA**: Configure sempre que houver ação desejada
7. **Data**: Verifique data e horário antes de publicar

## 🎨 Exemplos de Uso

### Evento em Destaque - Arrecadação

```
Título: Festa Junina Beneficente 2024
Categoria: 💰 Arrecadação
Data: 15/06/2024 às 18:00
Ingresso: R$ 30,00 (meia-entrada disponível)
Destaque: ✅ Sim
Cor: #FF6B6B (vermelho festivo)
CTA: Link para Sympla
```

### Evento Regular - Cultural

```
Título: Sarau Poético
Categoria: 📚 Literário
Data: 22/06/2024 às 19:00
Ingresso: Gratuito
Destaque: ❌ Não
CTA: WhatsApp para confirmação
```

### Evento Futuro - Educacional

```
Título: Workshop de Fotografia
Categoria: 🎓 Educacional
Data: 05/07/2024 às 14:00
Ingresso: R$ 50,00
CTA: Email para inscrição
Local: Sede da Fundação + link do Maps
```

## 🚀 Checklist de Publicação

Antes de ativar um evento, verifique:

- [ ] Imagem de capa atrativa e de boa qualidade
- [ ] Título claro e chamativo
- [ ] Categoria correta
- [ ] Data e horário conferidos
- [ ] Descrição completa com programação
- [ ] Informações de ingresso (gratuito ou valor)
- [ ] CTA configurado (se aplicável)
- [ ] Local preenchido (se evento presencial)
- [ ] Definiu se é destaque ou não
- [ ] Cor de destaque (opcional) harmoniza com a imagem
- [ ] Evento marcado como "Ativo"
- [ ] Testou o botão de CTA no site

## 📊 Gestão de Eventos Passados

**Opções:**

1. **Desativar**: Marque como inativo (some do site, dados preservados)
2. **Manter**: Deixe ativo para histórico (não aparece na home por ser passado)

**Dica**: Eventos passados não aparecem automaticamente na home, então podem ficar ativos para fins de documentação.

## 🎭 Categorias - Quando Usar

| Categoria      | Use Para                                    |
| -------------- | ------------------------------------------- |
| 🎭 Cultural    | Teatro, cinema, dança, exposições culturais |
| 🎓 Educacional | Palestras, cursos, workshops, seminários    |
| 🤝 Social      | Campanhas de doação, ações comunitárias     |
| 💰 Arrecadação | Jantares beneficentes, leilões, bingos      |
| 🎉 Celebração  | Aniversários, festas temáticas              |
| 🏃 Esportivo   | Corridas, torneios, campeonatos             |
| 🎨 Arte        | Oficinas artísticas, exposições de arte     |
| 🎵 Musical     | Shows, apresentações musicais               |
| 📚 Literário   | Saraus, lançamentos de livros               |
| 🌟 Outro       | Eventos que não se encaixam acima           |

## 🎨 Sugestões de Cores de Destaque

- **Verde Primário**: `#00B749` - Cor oficial da fundação (recomendado)
- **Verde Esmeralda**: `#26DE81` - Natureza, esperança, crescimento
- **Vermelho**: `#FF6B6B` - Urgência, paixão, energia
- **Laranja**: `#FF9F43` - Energia, entusiasmo, calor
- **Amarelo**: `#FFC107` - Alegria, otimismo, luz
- **Azul**: `#4ECDC4` - Confiança, serenidade, tranquilidade
- **Roxo**: `#A55EEA` - Criatividade, luxo, mistério
- **Rosa**: `#FC5C9C` - Amor, delicadeza, carinho
