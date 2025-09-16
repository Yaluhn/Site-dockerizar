FROM node:22.18.0

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN npm i

CMD [ "npm", "run", "start:dev" ]

EXPOSE 5000