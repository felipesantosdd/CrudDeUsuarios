FROM node:14

WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
