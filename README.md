# 🎬 Movies API

<p align="center">
API desenvolvida durante o <b>Minicurso de Backend</b> promovido para <b>Tristate Consultoria</b>.
</p>

<p align="center">
Uma REST API onde usuários podem criar uma conta e manter sua própria lista de filmes.
</p>

---

# 🛠️ Tecnologias

<p align="center">

![Node](https://img.shields.io/badge/Node.js-18+-green)
![NestJS](https://img.shields.io/badge/NestJS-Framework-red)
![TypeORM](https://img.shields.io/badge/TypeORM-ORM-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange)

</p>

Tecnologias utilizadas no projeto:

* **Node.js**
* **NestJS**
* **TypeORM**
* **PostgreSQL**
* **PGAdmin**
* **Postman**

---

# 📚 Conceitos Abordados

Durante o minicurso foram explorados conceitos importantes do desenvolvimento backend:

* Arquitetura modular com **NestJS**
* **REST API**
* **CRUD (Create, Read, Update, Delete)**
* **DTO (Data Transfer Object)**
* **Entities**
* **Controllers**
* **Services**
* **Modules**
* Integração com banco de dados utilizando **TypeORM**

---

# 🧱 Arquitetura

O projeto segue a arquitetura padrão do **NestJS**, baseada em módulos.

```
src
 ├── auth
 │    ├── dto
 │    ├── auth.controller.ts
 │    ├── auth.service.ts
 │    ├── auth.module.ts
 │    ├── jwt-auth.guard.ts
 │    └── jwt.strategy.ts
 │
 ├── users
 │    ├── dto
 │    ├── entities
 │    ├── users.controller.ts
 │    ├── users.service.ts
 │    └── users.module.ts
 │
 ├── movies
 │    ├── dto
 │    ├── entities
 │    ├── movies.controller.ts
 │    ├── movies.service.ts
 │    └── movies.module.ts
 │
 ├── app.controller.ts
 ├── app.module.ts
 ├── app.service.ts
 ├── main.ts
 │
 └── uploads
```

### Camadas

**Controller**

Responsável por receber as requisições HTTP.

**Service**

Contém as regras de negócio da aplicação.

**Entity**

Representa as tabelas do banco de dados.

**DTO**

Define a estrutura dos dados enviados nas requisições.

---

# 🎥 Funcionalidades

### 👤 Usuários

* Criar conta
* Autenticação/login
* Gerenciamento de dados do usuário

### 🎬 Filmes

Cada usuário pode:

* Adicionar filmes à sua lista
* Listar todos seus filmes
* Listar um filme específico
* Atualizar informações de um filme
* Remover filmes da lista

Cada usuário possui **sua própria coleção de filmes**.

---

# 🗄️ Banco de Dados

O banco de dados utilizado foi **PostgreSQL**, administrado através do **PGAdmin**.

O **TypeORM** foi utilizado para fazer o mapeamento entre **Entities** da aplicação e as tabelas do banco.

---

# ⚙️ Como Rodar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Lsouz44/movies-api.git
```

---

## 2️⃣ Acessar a pasta do projeto

```bash
cd movies-api
```

---

## 3️⃣ Instalar dependências

```bash
npm install
```

---

## 4️⃣ Configurar informações do banco

No arquivo `app.module.ts` colocar as credenciais que utilizou na hora de criar o banco

```
imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678', // coloque a senha que você definiu
      database: 'minicurso_db', // coloque o nome que você definiu
      autoLoadEntities: true,
      synchronize: true,
    }),
...
```

---

## 5️⃣ Rodar o projeto

```bash
npm run start:dev
```

Servidor disponível em:

```
http://localhost:3000
```

---

# 🧪 Testando a API

As requisições podem ser testadas utilizando **Postman**.

---

# 📡 Exemplos de Rotas

### Criar usuário

```
POST /users/create
```

Body:

```json
{
  "name": "Leandro",
  "email": "leandro@email.com",
  "password": "123456"
}
```

---

### Login

```
POST /auth
```

Body:

```json
{
  "email": "leandro@email.com",
  "password": "123456"
}
```

---

### Buscar dados do usuário

```
GET /users/edit
```

Authorizathion:

```Bearer Token
{
  tokendeacessoaqui
}
```

---

### Editar dados do usuário

```
PATCH /users/edit
```

Authorizathion:

```Bearer Token
{
  tokendeacessoaqui
}
```

Body:

```json
{
  "name": "Leandro Souza",
  "email": "leandro1@email.com"
}
```

---

### Alterar senha do usuário

```
PATCH /users/password
```

Authorizathion:

```Bearer Token
{
  tokendeacessoaqui
}
```

Body:

```json
{
  "currentPassword": "123456",
  "newPassword": "1234"
}
```

---

### Alterar avatar do usuário

```
PATCH /users/upload
```

Authorizathion:

```Bearer Token
{
  tokendeacessoaqui
}
```

Body:

```form-data
key: file (type: File)
value: arquivoDaFoto.png
```

---

# 🎓 Sobre o Projeto

Este projeto foi desenvolvido com fins **educacionais**, durante um minicurso de backend promovido para **Tristate Consultoria**, com o objetivo de introduzir o desenvolvimento de APIs utilizando **NestJS + PostgreSQL**.

---

# 👨‍💻 Autor

**Leandro Souza**

GitHub:
https://github.com/Lsouz44

---

# 📄 Licença

Este projeto está sob licença **MIT**.
