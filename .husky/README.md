# Git Hooks com Husky

Este projeto usa [Husky](https://typicode.github.io/husky/) para automatizar verificações antes de commits e pushs.

## Hooks Configurados

### Pre-commit

Executado automaticamente antes de cada commit. Verifica:

1. **Branch Protection**: Impede commits diretos nas branches `main` ou `master`
2. **Linter**: Executa `npm run lint` para verificar a qualidade do código
3. **Testes**: Executa `npm test` para garantir que todos os testes passam
4. **Build**: Executa `npm run build` para garantir que o projeto compila

### Como funciona

Quando você executa `git commit`, o hook pre-commit é acionado automaticamente:

```bash
git commit -m "feat: add new feature"
```

Se qualquer verificação falhar, o commit será bloqueado e você verá uma mensagem de erro explicativa.

## Bypass (usar com cautela)

Em situações excepcionais, você pode pular os hooks com a flag `--no-verify`:

```bash
git commit --no-verify -m "WIP: work in progress"
```

**⚠️ Atenção**: Use apenas quando necessário e certifique-se de corrigir os problemas antes do merge.

### Pular apenas o Build

Se o build está muito lento durante o desenvolvimento, você pode pulá-lo enquanto mantém lint e testes:

```bash
SKIP_BUILD=1 git commit -m "feat: add new feature"
```

Ou adicione ao seu `.bashrc`/`.zshrc`:
```bash
export SKIP_BUILD=1
```

**Importante**: O build ainda será executado no CI/CD.

## Desenvolvimento Local

Os hooks são instalados automaticamente quando você executa `npm install` (através do script `prepare`).

Se você precisar reinstalar os hooks manualmente:

```bash
npm run prepare
```

## Estrutura

```
.husky/
├── _/              # Scripts internos do Husky
├── pre-commit      # Hook executado antes de cada commit
└── README.md       # Este arquivo
```

## Boas Práticas

1. **Sempre trabalhe em branches de feature**: Crie branches para suas mudanças
   ```bash
   git checkout -b feature/minha-feature
   ```

2. **Corrija erros antes de fazer bypass**: Se o hook falhar, corrija o problema ao invés de usar `--no-verify`

3. **Mantenha os testes atualizados**: Escreva testes para novas funcionalidades

4. **Siga o padrão de commits**: Use mensagens descritivas e claras

## Troubleshooting

### Os hooks não estão executando

Execute:
```bash
chmod +x .husky/pre-commit
npm run prepare
```

### Build demora muito no pre-commit

Se o build completo está muito lento, considere:
- Usar `npm run lint && npm test` ao invés de incluir build
- Configurar o build para rodar apenas no CI/CD

### Erro de permissão

Execute:
```bash
chmod +x .husky/*
```

## Referências

- [Documentação Husky](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
