# 📚 Guia de Uso - Cursos no CMS

## 🎯 Visão Geral

O sistema de Cursos permite gerenciar todos os cursos oferecidos pela fundação, com informações sobre professores, horários e inscrições via WhatsApp.

## 📝 Campos do Curso

### Informações Básicas

#### **Título do Curso** (obrigatório)

- Nome do curso que será exibido no site
- Exemplo: "Informática Básica", "Inglês para Iniciantes"

#### **URL amigável** (obrigatório)

- Gerado automaticamente a partir do título
- Clique em "Generate" para criar
- Usado na URL da página do curso

#### **Foto de Capa** (obrigatório)

- Imagem principal do curso (proporção recomendada: 16:9)
- Adicione um texto alternativo para acessibilidade
- Esta imagem aparece nos cards do curso

#### **Descrição** (obrigatório)

- Editor de texto rico (Portable Text)
- Descreva o conteúdo do curso, objetivos, pré-requisitos
- Pode incluir formatação: negrito, itálico, listas

#### **Datas e Horários das Aulas** (obrigatório)

- Texto livre descrevendo quando as aulas acontecem
- Exemplos:
  - "Toda segunda-feira às 19h"
  - "Terças e quintas, das 14h às 16h"
  - "Sábados pela manhã, das 9h às 12h"

### Professor

#### **Tipo de Professor** (obrigatório)

Escolha uma opção:

**📌 Membro da Equipe**

- Selecione um professor que já está cadastrado como membro
- A foto e nome virão automaticamente do cadastro do membro

**📌 Professor Externo**

- Para professores que não fazem parte da equipe permanente
- Você precisa cadastrar:
  - Nome do professor
  - Foto (opcional)

### Inscrição

#### **Inscrições Ativas**

- ✅ Ativo: Mostra botão de inscrição
- ❌ Inativo: Oculta botão de inscrição

#### **Texto da Mensagem WhatsApp**

- Mensagem que será enviada quando alguém se inscrever
- Use placeholders:
  - `{curso}` - substituído pelo nome do curso
  - `{nome}` - substituído pelo nome do inscrito
- Exemplo:
  ```
  Olá! Gostaria de me inscrever no curso {curso}. Meu nome é {nome}.
  ```

#### **WhatsApp Específico** (opcional)

- Número de WhatsApp só para este curso
- Formato: `5511999999999` (código do país + DDD + número)
- Se não preenchido, usa o WhatsApp global da fundação

#### **Texto do Botão**

- Texto que aparece no botão de inscrição
- Padrão: "Inscreva-se agora"
- Exemplos alternativos: "Quero participar", "Fazer inscrição"

### Configurações Gerais

#### **Curso Ativo**

- ✅ Ativo: Curso aparece no site
- ❌ Inativo: Curso oculto (mas não deletado)

#### **Ordem de Exibição** (opcional)

- Número que define a ordem dos cursos
- Menor número = aparece primeiro
- Se não preenchido, usa ordem de criação

## 📱 Como Funciona a Inscrição

1. Usuário clica em "Inscreva-se agora" no card do curso
2. Modal aparece pedindo o nome
3. Usuário digita o nome e clica em "Inscrever-se"
4. WhatsApp abre com mensagem pré-preenchida
5. Usuário só precisa enviar a mensagem

## ✨ Layout no Site

### CoursesSection

Os cursos aparecem em um grid de 3 colunas (responsivo):

**Card do Curso:**

- 📸 Foto de capa no topo
- 👨‍🏫 Badge do professor (foto + nome)
- 📝 Título do curso
- ⏰ Horário das aulas
- 🔘 Botão de inscrição

**Design:**

- Background: Gradiente azul/roxo suave
- Cards brancos com sombra
- Hover: Eleva o card e aumenta a imagem
- Animações suaves com Framer Motion

## 💡 Dicas

1. **Foto de Capa**: Use imagens relacionadas ao tema do curso
2. **Descrição**: Seja claro sobre o que o aluno vai aprender
3. **Horários**: Seja específico para evitar dúvidas
4. **WhatsApp**: Teste o número antes de publicar
5. **Mensagem**: Mantenha curta e objetiva

## 🎨 Exemplos de Uso

### Curso Simples

```
Título: Informática Básica
Horário: Segundas e quartas, 19h às 21h
Professor: Maria Silva (membro da equipe)
Inscrição: Ativa com WhatsApp global
```

### Curso com Professor Externo

```
Título: Yoga para Iniciantes
Horário: Sábados, 8h às 9h30
Professor Externo: João Santos (foto incluída)
Inscrição: WhatsApp específico + mensagem personalizada
```

### Curso Temporariamente Fechado

```
Status: Inativo
Inscrição: Desativada
(O curso some do site mas não perde os dados)
```

## 🚀 Checklist de Publicação

Antes de ativar um curso, verifique:

- [ ] Foto de capa carregada e com boa qualidade
- [ ] Título claro e atrativo
- [ ] Descrição completa com objetivos
- [ ] Horários bem definidos
- [ ] Professor selecionado (membro ou externo)
- [ ] WhatsApp configurado (específico ou global)
- [ ] Mensagem de inscrição personalizada
- [ ] Curso marcado como "Ativo"
- [ ] Teste o botão de inscrição no site

## 📞 Configuração Global do WhatsApp

Para configurar o WhatsApp padrão:

1. Vá em **Configuração Global** no menu do CMS
2. Em **Contato**, preencha **WhatsApp**
3. Formato: `5511999999999`
4. Este número será usado em todos os cursos que não tiverem WhatsApp específico
