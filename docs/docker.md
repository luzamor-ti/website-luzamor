# Docker — Website Luzamor

Guia para rodar o projeto com Docker e Docker Compose.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2.20 (já incluso no Docker Desktop)

## Variáveis de ambiente

Antes de usar qualquer perfil, crie um arquivo `.env.local` a partir do exemplo:

```bash
cp .env.local.example .env.local
```

Preencha os valores:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-11

# Opcional — token de leitura para preview/draft
# SANITY_API_READ_TOKEN=seu-token
```

---

## Desenvolvimento (`--profile dev`)

Monta o código-fonte como volume, com **hot-reload** automático. Ideal para desenvolvimento local sem instalar Node na máquina.

```bash
docker compose --profile dev up
```

A aplicação fica disponível em **http://localhost:3000**.

Para parar:

```bash
docker compose --profile dev down
```

> As dependências (`node_modules`) são instaladas automaticamente na primeira execução dentro do container. Mudanças no `package.json` exigem reinicialização do container.

---

## Produção (`--profile prod`)

Build multi-stage otimizado. A imagem final usa o output `standalone` do Next.js com usuário não-root.

### 1. Build da imagem

As variáveis `NEXT_PUBLIC_*` são necessárias em tempo de _build_ (injetadas via `ARG`):

```bash
docker compose --profile prod up --build
```

Ou, para buildar separadamente:

```bash
docker compose build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Subir em background

```bash
docker compose --profile prod up -d
```

### 3. Parar

```bash
docker compose --profile prod down
```

---

## Estrutura dos arquivos

| Arquivo | Descrição |
|---|---|
| `Dockerfile` | Build multi-stage: `deps` → `builder` → `runner` |
| `docker-compose.yml` | Serviços separados por perfis (`dev` e `prod`) |
| `.dockerignore` | Exclui arquivos desnecessários da imagem |
| `next.config.ts` | `output: "standalone"` habilitado para build Docker |

### Estágios do Dockerfile

```
deps      → instala dependências com npm ci
builder   → executa npm run build (Next.js standalone)
runner    → imagem mínima Alpine, usuário não-root, porta 3000
```

---

## Solução de problemas

### Porta 3000 já em uso

```bash
# Verificar quem está usando a porta
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Parar o container conflitante
docker stop <nome-do-container>
```

### Limpar containers e redes parados

```bash
docker compose down --remove-orphans
docker network prune -f
```

### Ver logs do container

```bash
docker logs luzamor-dev -f   # desenvolvimento
docker logs luzamor-app -f   # produção
```

### Forçar reinstalação das dependências (dev)

```bash
docker compose --profile dev down -v
docker compose --profile dev up
```

---

## Comandos úteis

```bash
# Acessar shell do container de dev
docker exec -it luzamor-dev sh

# Ver status dos containers do projeto
docker compose ps

# Remover imagens não utilizadas
docker image prune -f
```
