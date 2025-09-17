# Deploy com Docker Swarm

http://45.161.179.23

http://192.168.0.9:5000/api/

via proxy nginx

http://192.168.0.9/api/

## Passo a passo para produção com Swarm

1. **Build das imagens localmente:**

   ```bash
   docker build -t seu-usuario/front-end:latest ./front-end
   docker build -t seu-usuario/back-end:latest ./back-end
   docker build -t seu-usuario/nginx:latest -f Dockerfile.nginx .
   ```

2. **(Opcional) Faça push das imagens para o Docker Hub:**

   ```bash
   docker push seu-usuario/front-end:latest
   docker push seu-usuario/back-end:latest
   docker push seu-usuario/nginx:latest
   ```

3. **Edite o arquivo `docker-swarm.yml` para usar as imagens:**

   ```yaml
   version: "3.8"
   services:
     front-end:
       image: seu-usuario/front-end:latest
       deploy:
         replicas: 1
         restart_policy:
           condition: on-failure
       networks:
         - site-network

     back-end:
       image: seu-usuario/back-end:latest
       ports:
         - "5000:5000"
       deploy:
         replicas: 1
         restart_policy:
           condition: on-failure
       networks:
         - site-network

     nginx:
       image: seu-usuario/nginx:latest
       ports:
         - "80:80"
       depends_on:
         - front-end
         - back-end
       deploy:
         replicas: 1
         restart_policy:
           condition: on-failure
       networks:
         - site-network

   networks:
     site-network:
       driver: overlay
   ```

4. **Inicialize o Swarm (se ainda não fez):**

   ```bash
   docker swarm init
   ```

5. **Suba a stack:**

   ```bash
   docker stack deploy -c docker-swarm.yml site
   ```

6. **Verifique os serviços:**
   ```bash
   docker stack services site
   docker stack ps site
   ```

---

## Exemplos avançados para Docker Swarm

### 1. Usando secrets (senhas seguras)

Crie um secret:

```bash
echo "minha_senha_super_secreta" | docker secret create db_password -
```

No serviço:

```yaml
services:
  back-end:
    image: seu-usuario/back-end:latest
    secrets:
      - db_password
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password
secrets:
  db_password:
    external: true
```

---

### 2. Usando volumes para persistência

```yaml
services:
  back-end:
    image: seu-usuario/back-end:latest
    volumes:
      - dados-backend:/app/data
volumes:
  dados-backend:
```

---

### 3. Balanceamento de carga automático

No Swarm, todo serviço exposto em uma porta é automaticamente balanceado entre réplicas:

```yaml
services:
  nginx:
    image: seu-usuario/nginx:latest
    ports:
      - "80:80"
    deploy:
      replicas: 3
```

Acesse http://<ip_do_servidor> e o Swarm distribuirá as requisições entre as réplicas.

---

### 4. Restrições de nó (deploy em máquinas específicas)

```yaml
services:
  back-end:
    image: seu-usuario/back-end:latest
    deploy:
      placement:
        constraints:
          - node.labels.tipo==api
```

No nó desejado, rode:

```bash
docker node update --label-add tipo=api <id_do_no>
```

---

Esses exemplos podem ser combinados conforme sua necessidade!
Se quiser exemplos para CI/CD, atualização zero-downtime ou monitoramento, só pedir.

---

- Lembre-se de substituir `seu-usuario` pelo seu usuário do Docker Hub ou registry.
- O Swarm não suporta `build:` no arquivo de stack, apenas `image:`.
- Para atualizar, basta rebuildar e dar push nas imagens, depois redeploy.

Se precisar de exemplos para múltiplos servidores, secrets, volumes ou balanceamento, peça suporte!

---

# Como usar imagens no Docker Swarm (sem build:)

No Docker Swarm, a opção `build:` não é suportada diretamente no arquivo de stack. Você precisa:

1. **Buildar as imagens localmente:**

   ```bash
   docker build -t seu-usuario/front-end:latest ./front-end
   docker build -t seu-usuario/back-end:latest ./back-end
   docker build -t seu-usuario/nginx:latest -f Dockerfile.nginx .
   ```

2. **(Opcional) Fazer push para o Docker Hub:**

   ```bash
   docker push seu-usuario/front-end:latest
   docker push seu-usuario/back-end:latest
   docker push seu-usuario/nginx:latest
   ```

3. **No arquivo `docker-swarm.yml`, troque `build:` por `image:`:**

   ```yaml
   services:
     front-end:
       image: seu-usuario/front-end:latest
       # ...restante da config

     back-end:
       image: seu-usuario/back-end:latest
       # ...restante da config

     nginx:
       image: seu-usuario/nginx:latest
       # ...restante da config
   ```

Assim, o Swarm irá baixar e rodar as imagens já prontas, sem tentar buildar durante o deploy.

Se quiser automatizar o processo, use scripts ou CI/CD para buildar e publicar as imagens antes do deploy Swarm.

2. **(Opcional) Remover a stack:**

   ```bash
   docker stack rm site
   ```