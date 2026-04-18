# Livraria API 📚

Uma API RESTful desenvolvida com Node.js e Express para gerenciamento de uma livraria, incluindo funcionalidades de venda, autores, clientes e livros.

## Sobre o Projeto

Este projeto foi desenvolvido como estudo prático de Node.js e implementa uma estrutura completa de API com:
- Autenticação e autorização de usuários
- Gerenciamento de livros, autores, clientes e vendas
- Integração com banco de dados (MongoDB e PostgreSQL)
- Sistema de logging com Winston
- Tratamento de erros centralizado
- Cors habilitado para acesso externo

## 🏗️ Estrutura do Projeto

```
livraria-api/
├── controllers/        # Controladores com lógica de negócio
│   ├── auth.controller.js
│   ├── autor.controller.js
│   ├── cliente.controller.js
│   ├── livro.controller.js
│   └── venda.controller.js
├── models/            # Modelos de dados
│   ├── autor.model.js
│   ├── cliente.model.js
│   ├── livro.model.js
│   └── venda.model.js
├── repositories/      # Camada de acesso a dados
│   ├── db.js
│   ├── mongo.db.js
│   ├── autor.repository.js
│   ├── cliente.repository.js
│   ├── livro.repository.js
│   ├── livroInfo.repository.js
│   └── venda.repository.js
├── routes/           # Definição de rotas da API
│   ├── autor.route.js
│   ├── cliente.route.js
│   ├── livro.route.js
│   └── venda.route.js
├── schemas/          # Schemas de validação
│   ├── avaliacao.schema.js
│   └── livroInfo.schema.js
├── services/         # Serviços de negócio
│   ├── autor.service.js
│   ├── cliente.service.js
│   ├── livro.service.js
│   └── venda.service.js
├── test/            # Testes automatizados
│   └── index.test.js
├── app.js           # Configuração da aplicação Express
├── index.js         # Ponto de entrada
├── package.json     # Dependências do projeto
└── README.md
```

## 📋 Funcionalidades

### Autenticação
- Autenticação Basic Auth com validação assíncrona
- Autorização baseada em roles (ex: admin)
- Middleware de autenticação centralizado

### Gerenciamento de Clientes
- CRUD completo de clientes
- Armazenamento de informações pessoais

### Gerenciamento de Livros
- CRUD de livros
- Associação com autores
- Informações detalhadas de livros (avaliações, etc)

### Gerenciamento de Autores
- CRUD de autores (requer autenticação como admin)
- Associação com livros publicados

### Gerenciamento de Vendas
- Registro de vendas
- Rastreamento de transações

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **PostgreSQL** - Banco de dados relacional
- **Mongoose** - ODM para MongoDB
- **Sequelize** - ORM para PostgreSQL
- **Winston** - Sistema de logging
- **CORS** - Controle de acesso entre domínios
- **Jest** - Framework de testes
- **Supertest** - Testes HTTP

## 📦 Dependências

```json
{
  "express": "^4.18.1",
  "mongoose": "^6.4.1",
  "sequelize": "^6.21.2",
  "postgres": "^8.7.3",
  "mongodb": "^4.7.0",
  "winston": "^3.8.0",
  "cors": "^2.8.5",
  "express-basic-auth": "^1.2.1"
}
```

## ⚙️ Configuração

### Instalação de Dependências

```bash
cd livraria-api
npm install
```

### Executar a API

```bash
npm start
```

A API iniciará na porta **8080**

### Executar Testes

```bash
npm test
```

## 🔐 Autenticação

A API utiliza **Basic Auth** para autenticação. Incluya as credenciais no header:

```
Authorization: Basic base64(username:password)
```

### Rotas Protegidas

- **GET/POST/PUT/DELETE /autor** - Requer autenticação como admin

### Rotas Públicas

- **/cliente** - Gerenciamento de clientes
- **/livro** - Consulta de livros
- **/venda** - Gerenciamento de vendas

## 📝 Logging

O sistema utiliza Winston para logging. Os logs são salvos em:
- **Console** - Output em tempo real
- **Arquivo** - `livraria-api.log`

Níveis de log: error, warn, info, http, debug, verbose, silly

## 🛠️ Padrões de Arquitetura

O projeto segue a arquitetura em camadas:

1. **Routes** - Define os endpoints HTTP
2. **Controllers** - Recebe requisições e coordena respostas
3. **Services** - Contém a lógica de negócio
4. **Repositories** - Acessa e manipula dados
5. **Models** - Define estrutura dos dados

## 🧪 Testes

Testes automatizados usando Jest e Supertest para validar endpoints e lógica de negócio.

## 📄 Licença

ISC

---

**Autor**: Marcela Villani  
**Data de Criação**: 03/07/2022
