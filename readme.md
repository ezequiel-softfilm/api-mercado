# API Mercado

API RESTful para gerenciamento de **produtos**, **entradas de estoque**, **vendas** e **usuários**, desenvolvida em **TypeScript** com **Express** e **Sequelize ORM** conectando ao **MySQL**, seguindo o padrão de **arquitetura limpa**. Inclui autenticação **JWT**, protegendo todas as rotas exceto login e usuarios.

---

## Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* Sequelize ORM
* MySQL
* dotenv
* bcrypt
* jsonwebtoken

---

## Estrutura do Projeto

```
src/
│
├── config/
│   └── database.ts                  # Configuração do Sequelize e conexão com MySQL
│
├── controllers/
│   ├── ProdutoController.ts
│   ├── EntradaEstoqueController.ts
│   ├── VendaController.ts
│   ├── UsuarioController.ts
│   └── AuthController.ts
│
├── middlewares/
│   └── authMiddleware.ts            # Middleware para proteger rotas com JWT
│
├── models/
│   ├── Produto/
│   │   ├── entity/
│   │   ├── repositories/
│   │   ├── use-cases/
│   │   └── dto/
│   │
│   ├── EntradaEstoque/
│   │   ├── entity/
│   │   ├── repositories/
│   │   └── use-cases/
│   │
│   ├── Venda/
│   │   ├── entity/
│   │   ├── repositories/
│   │   └── use-cases/
│   │
│   ├── Usuario/
│   │   ├── entity/
│   │   ├── repositories/
│   │   ├── use-cases/
│   │   └── dto/
│   │
│   └── Auth/
│       ├── dto/
│       │   └── login-usuario.dto.ts
│       ├── use-cases/
│       │   └── LoginUsuario.use-case.ts
│       └── services/
│           └── JwtService.ts
│
├── routes/
│   ├── index.ts
│   ├── produtos.ts
│   ├── entradaEstoque.ts
│   ├── vendas.ts
│   ├── usuario.ts
│   └── auth.ts
│
├── app.ts
└── server.ts
```

---

## Models

### Produto

* `id` (PK)
* `nome`
* `descricao`
* `preco_unitario`
* `qtde_estoque`
* `ativo` (Ativo/Inativo)
* `criado_por` (FK → Usuario)
* Timestamps: `criado_em`, `alterado_em`, `deletado_em`

### EntradaEstoque

* `id` (PK)
* `id_produto` (FK → Produto)
* `qtde`
* `criado_por` (FK → Usuario)
* Timestamps: `criado_em`, `alterado_em`, `deletado_em`

### Venda

* `id` (PK)
* `id_produto` (FK → Produto)
* `qtde`
* `total` (calculado automaticamente no UseCase)
* `criado_por` (FK → Usuario)
* Timestamps: `criado_em`, `alterado_em`, `deletado_em`

### Usuario

* `id` (PK)
* `nome`
* `email`
* `password` (hash com bcrypt)
* `status` (Ativo/Inativo)
* Timestamps: `criado_em`, `alterado_em`, `deletado_em`

---

## Rotas

### Auth

| Método | Endpoint  | Descrição              |
| ------ | --------- | ---------------------- |
| POST   | /api/auth | Login de usuário (JWT) |

### Usuário

| Método | Endpoint            | Descrição                     |
| ------ | ------------------- | ----------------------------- |
| GET    | /api/usuario        | Lista todos os usuários       |
| GET    | /api/usuario/:id    | Detalhes de usuário por ID    |
| GET    | /api/usuario/:email | Detalhes de usuário por email |
| POST   | /api/usuario        | Cria um novo usuário          |

### Produtos

| Método | Endpoint          | Descrição                      |
| ------ | ----------------- | ------------------------------ |
| GET    | /api/produtos     | Lista todos os produtos ativos |
| GET    | /api/produtos/:id | Obtém produto por ID           |
| POST   | /api/produtos     | Cria um novo produto           |
| PUT    | /api/produtos/:id | Atualiza um produto existente  |
| DELETE | /api/produtos/:id | Inativa (exclusão lógica)      |

### Entrada de Estoque

| Método | Endpoint               | Descrição                                             |
| ------ | ---------------------- | ----------------------------------------------------- |
| GET    | /api/estoque/historico | Lista todas as entradas de estoque                    |
| POST   | /api/estoque/entrada   | Cria uma nova entrada e atualiza o estoque do produto |

Exemplo de POST:

```json
{
  "id_produto": 1,
  "qtde": 20
}
```

### Vendas

| Método | Endpoint        | Descrição                                          |
| ------ | --------------- | -------------------------------------------------- |
| GET    | /api/vendas     | Lista todas as vendas                              |
| GET    | /api/vendas/:id | Obtém venda por ID                                 |
| POST   | /api/vendas     | Registra uma venda e atualiza o estoque do produto |

Exemplo de POST:

```json
{
  "id_produto": 1,
  "qtde": 5
}
```

---

## Observações

* Exclusão de produtos, vendas, entradas e usuários é **lógica** (`deletedAt`).
* Ao registrar uma venda, o **estoque do produto é automaticamente reduzido**.
* Ao registrar uma entrada de estoque, o **estoque do produto é automaticamente incrementado**.
* O **total** da venda é calculado automaticamente no **UseCase**, não é enviado pelo cliente.
* Todas as rotas estão protegidas por **JWT**, exceto `/api/auth` (login) e `/api/usuarios` (usuarios) .
* O `criado_por` de produtos, entradas e vendas é preenchido automaticamente com o **ID do usuário logado**.

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ezequiel-softfilm/api-mercado.git
cd api-mercado
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com suas credenciais do MySQL e a chave JWT:

```
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASS=senha
DB_HOST=localhost
PORT=3000
JWT_SECRET=sua_chave_secreta
```

---

## Executando o Projeto

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## Autor

Ezequiel Farias
[GitHub](https://github.com/ezequiel-softfilm)
