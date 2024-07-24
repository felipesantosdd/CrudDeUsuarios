# Sistema de Autenticação CRUD de Usuários

Este projeto implementa um sistema de autenticação CRUD de usuários utilizando Node.js para o backend e PostgreSQL como banco de dados. A arquitetura segue o padrão monolítico com o uso do Sequelize ORM para gerenciar o banco de dados. A aplicação permite cadastro, autenticação, atualização e exclusão de usuários, retornando um JWT para controle de sessão.

## Funcionalidades

- **Listagem de Usuários:** Permite listar todos os usuários cadastrados, exibindo informações básicas como nome e e-mail.
- **Cadastro de Usuário:** Permite que novos usuários se cadastrem fornecendo informações como nome, e-mail e senha.
- **Autenticação de Usuário:** Permite que usuários registrados façam login utilizando e-mail e senha. Após a autenticação, um JWT é gerado e retornado ao cliente.
- **Atualização de Usuário:** Usuários autenticados podem atualizar suas informações pessoais.
- **Exclusão de Usuário:** Usuários autenticados podem excluir sua conta do sistema.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Docker**

## Requisitos

- Node.js
- Docker
- PostgreSQL

## Configuração do Ambiente

### Docker

Para configurar e iniciar os contêineres Docker, utilize o arquivo `docker-compose.yml` incluído no projeto:

```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_USER=postgres
      - DB_PASS=example
      - DB_NAME=myapp
    depends_on:
      - postgres

  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: example
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Instalando Dependências

Para instalar as dependências do projeto, execute:

```bash
npm install
```

### Iniciando o Projeto

Para iniciar o projeto em um ambiente de desenvolvimento, execute:

```bash
npm start
```

Para iniciar o projeto com Docker, execute:

```bash
docker-compose up -d
```

### Endpoints da API

- **POST /auth/register:** Cadastro de novo usuário.
- **POST /auth/login:** Autenticação de usuário.
- **PUT /users/:id:** Atualização de informações do usuário.
- **DELETE /users/:id:** Exclusão de usuário.
- **GET /users:** Listagem de usuários.

### Exemplo de Requisições

#### Cadastro de Usuário

```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Autenticação de Usuário

```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Listagem de Usuários

```json
GET /users
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

#### Atualização de Usuário

```json
PUT /users/<USER_ID>
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
{
  "name": "John Doe Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"
}
```

#### Exclusão de Usuário

```json
DELETE /users/<USER_ID>
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
```
