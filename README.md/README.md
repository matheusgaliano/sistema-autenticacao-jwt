# Sistema de Autenticação com JWT

Este é um projeto de exemplo para demonstrar a implementação de um sistema de autenticação e autorização, utilizando JSON Web Tokens (JWT) em uma API com Node.js e Express, e o banco de dados PostgreSQL.

---

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- JSON Web Tokens (JWT)
- Docker e Docker Compose

---

## Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/matheusgaliano/sistema-autenticacao-jwt.git](https://github.com/matheusgaliano/sistema-autenticacao-jwt.git)
    ```
2.  **Entre na pasta do projeto:**
    ```bash
    cd sistema-autenticacao-jwt
    ```
3.  **Inicie os serviços do Docker (PostgreSQL):**
    ```bash
    docker-compose up -d
    ```
4.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```
5.  **Inicie a aplicação:**
    ```bash
    node src/app.js
    ```

A API estará rodando em `http://localhost:3003`.

---

## Endpoints da API

**Registro de Usuário**

- **URL:** `POST http://localhost:3003/api/register`
- **Body (JSON):**
  ```json
  {
    "email": "seu-email@exemplo.com",
    "password": "sua-senha"
  }
  ```

**Login de Usuário**

- **URL:** `POST http://localhost:3003/api/login`
- **Body (JSON):**
  ```json
  {
    "email": "seu-email@exemplo.com",
    "password": "sua-senha"
  }
  ```

**Acesso a Perfil Protegido**

- **URL:** `GET http://localhost:3003/api/profile`
- **Headers:** `Authorization: Bearer [TOKEN_JWT]`
