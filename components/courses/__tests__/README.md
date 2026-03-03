# Testes dos Componentes de Cursos

Esta pasta contém os testes para todos os componentes relacionados a cursos.

## Componentes Testados

### CourseDescription.test.tsx

Testa o componente que exibe a descrição do curso com Portable Text e informações de horário.

**Cenários cobertos:**

- Renderização do heading "Sobre o Curso"
- Renderização do conteúdo Portable Text
- Renderização condicional da seção de horários
- Estilos aplicados corretamente

### CourseEnrollment.test.tsx

Testa o componente de inscrição/matrícula com WhatsApp.

**Cenários cobertos:**

- Renderização do heading
- Texto customizado vs texto padrão do botão
- Geração correta da URL do WhatsApp
- URL com e sem mensagem
- Estilos da seção e botão

### CourseTeacher.test.tsx

Testa o componente que exibe informações do professor (membro ou externo).

**Cenários cobertos:**

- Renderização de professor membro com role e bio
- Renderização de professor externo (sem role/bio)
- Renderização da foto do professor
- Retorno null quando não há professor
- Renderização condicional de role e shortBio
- Estilos aplicados

### CourseHero.test.tsx

Testa o componente hero da página de curso individual.

**Cenários cobertos:**

- Renderização de título e descrição
- Tag "Curso" presente
- Renderização da foto de capa
- Selo do professor (quando há nome e foto)
- Renderização sem foto de capa
- Variant dark aplicado
- Imagem com prioridade

### RelatedCourses.test.tsx

Testa o componente que exibe cursos relacionados.

**Cenários cobertos:**

- Renderização do header da seção
- Renderização de todos os títulos dos cursos
- Renderização das imagens de capa
- Selos dos professores
- Horários dos cursos
- Textos dos botões de inscrição
- Links para páginas de cursos
- Retorno null para array vazio ou null
- Cursos sem informação de professor

### CursosTemplate.test.tsx

Testa o template da página de listagem de cursos.

**Cenários cobertos:**

- Renderização da seção hero
- Renderização de todos os cursos
- Renderização de horários e imagens
- Selos dos professores
- Botões de inscrição
- Links para páginas de detalhes
- Chamada ao serviço getCourses
- Grid com colunas corretas
- Efeitos de hover nos cards
- Comportamento quando não há cursos
- Cursos sem informação de professor

## Executando os Testes

```bash
# Executar todos os testes
npm run test

# Executar testes com coverage
npm run test:coverage

# Executar apenas testes de courses
npm run test -- courses

# Executar em modo watch
npm run test -- --watch
```

## Mocks Utilizados

- `buildSanityImageUrl`: Retorna URLs mockadas para imagens
- `getCourses`: Retorna dados mockados de cursos

## Cobertura

Todos os componentes possuem cobertura de:

- Renderização básica
- Props opcionais
- Renderização condicional
- Estilos aplicados
- Comportamento com dados ausentes
