# -----------------------------
# Dockerfile para produção Node.js (TypeScript)
# -----------------------------

FROM node:22.18.0 AS build
WORKDIR /app
# Copia apenas os arquivos de dependências para otimizar o cache
COPY package*.json ./
# Instala só dependências de produção, rápido e previsível
RUN npm ci --omit=dev
# Copia o restante do código
COPY . .
# Compila o TypeScript para a pasta dist
RUN npm run build

FROM node:22.18.0-alpine
WORKDIR /app
# Copia apenas o build e as dependências necessárias
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 5000
# Comando padrão para rodar a API em produção
CMD ["node", "dist/index.js"]