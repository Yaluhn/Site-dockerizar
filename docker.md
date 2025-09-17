# Documentação do Ambiente Docker

## Diagrama da Arquitetura

```
┌────────────┐        ┌───
─────────┐        ┌────────────┐
│ Usuário    │ <----> │  NGINX     │ <----> │  Back-end  │
│ Navegador  │        │ (proxy)    │        │ (Node/TS)  │
│            │ <----> │  (Front)   │        └────────────┘
└────────────┘        └────────────┘
```

## Serviços

- **nginx**: Proxy reverso e servidor estático do front-end
- **front-end**: React + Vite (buildado e servido pelo nginx)
- **back-end**: Node.js + Express + TypeScript (API REST)

## Principais Endpoints

- Front-end: [http://localhost](http://localhost)
- Back-end: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- Nginx (proxy): [http://localhost/api/health](http://localhost/api/health)
- Listar posts do Notion: [http://localhost/api/notion/posts](http://localhost/api/notion/posts)

## Como rodar (Linux, Windows ou Mac)

1. Instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Clone o repositório
3. Configure o arquivo `.env` em `/back-end` com suas credenciais
4. No terminal, execute:
   ```bash
   docker-compose build
   docker-compose up -d
   ```
5. Acesse os endpoints acima para testar

## Observações

- O Docker funciona em Windows, Linux e Mac.
- No Windows, prefira usar o terminal do Docker Desktop, PowerShell ou WSL.
- O build do front-end é feito automaticamente no container nginx.
- O nginx faz proxy para o back-end em `/api`.
- O arquivo `.env` do back-end **não deve ser versionado**.

## Comandos úteis Docker/Docker Compose

- **Buildar todos os serviços:**
  ```bash
  docker-compose build
  ```
- **Subir todos os containers em segundo plano:**
  ```bash
  docker-compose up -d
  ```
- **Ver status dos containers:**
  ```bash
  docker ps
  ```
- **Ver logs de um serviço:**
  ```bash
  docker-compose logs <serviço>
  # Exemplo: docker-compose logs back-end
  ```
- **Reiniciar um serviço:**
  ```bash
  docker-compose restart <serviço>
  # Exemplo: docker-compose restart back-end
  ```
- **Parar todos os containers:**
  ```bash
  docker-compose down
  ```
- **Remover containers parados e imagens não usadas:**
  ```bash
  docker system prune -af
  ```

---

---

## Passo a passo de Deploy em Produção (Docker Swarm)

### 1. Pré-requisitos

- Servidor Linux com Docker e Docker Swarm instalados
- Acesso root ou permissão sudo
- Conta no Docker Hub (ou outro registry)
- IP público liberado (porta 80 liberada no firewall)

### 2. Build e Push das Imagens para o Docker Hub

No seu ambiente local, execute:

```bash
# Front-end
docker build -t kayquews/site-frontend:latest ./front-end
docker push kayquews/site-frontend:latest

# Back-end
docker build -t kayquews/site-backend:latest ./back-end
docker push kayquews/site-backend:latest

# Nginx
docker build -t kayquews/site-nginx:latest -f Dockerfile.nginx .
docker push kayquews/site-nginx:latest
```

### 3. Copie os arquivos de configuração para o servidor

- `docker-swarm.yml`
- `nginx.conf`

> Dica: Use `scp` ou outro método seguro para transferir os arquivos.

### 4. Inicialize o Swarm (se ainda não estiver inicializado)

```bash
docker swarm init
```

### 5. Deploy da Stack no Swarm

No servidor, execute:

```bash
docker stack deploy -c docker-swarm.yml site
```

### 6. Verifique os serviços

```bash
docker stack services site
docker service logs site_nginx
```

### 7. Acesse pelo IP público

- Front-end: `http://<SEU_IP_PUBLICO>`
- API: `http://<SEU_IP_PUBLICO>/api/health`

> Certifique-se de que a porta 80 está liberada no firewall do servidor e do provedor.

### 8. Dicas de Troubleshooting

- Use `docker service logs <serviço>` para ver logs detalhados
- Use `docker stack ps site` para ver o status dos containers
- Se não conseguir acessar externamente, verifique regras de firewall e NAT
- Para atualizar o sistema, repita o build/push das imagens e execute novamente o deploy da stack

---

_Dúvidas ou problemas? Consulte este arquivo ou peça suporte!_

Building... img es...

# Front-end

docker build -t kayquews/site-frontend:latest ./front-end
docker push kayquews/site-frontend:latest

# Back-end

docker build -t kayquews/site-backend:latest ./back-end
docker push kayquews/site-backend:latest

# Nginx

docker build -t kayquews/site-nginx:latest -f Dockerfile.nginx .
docker push kayquews/site-nginx:latest
