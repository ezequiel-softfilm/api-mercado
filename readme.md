# API Mercado

API RESTful para gerenciamento de **produtos**, **entradas de estoque** e **vendas**, desenvolvida em **TypeScript** com **Express** e **Sequelize ORM** conectando ao **MySQL**, seguindo o padrão de **arquitetura limpa**.

---

## Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* Sequelize ORM
* MySQL
* dotenv

---

## Estrutura do Projeto

```
src/
│
├── config/
│   └── database.ts              # Configuração do Sequelize e conexão com MySQL
│
├── controllers/
│   ├── ProdutoController.ts
│   ├── EntradaEstoqueController.ts
│   └── VendaController.ts
│
├── models/
│   ├── Produto/
│   │   ├── entity/              # Entity Produto
│   │   ├── repositories/        # Repositório e model Sequelize
│   │   ├── use-cases/           # Casos de uso (Create, Update, Find, Excluir)
│   │   └── dto/                 # DTOs de criação/atualização
│   │
│   ├── EntradaEstoque/
│   │   ├── entity/              # Entity EntradaEstoque
│   │   ├── repositories/        # Repositório e model Sequelize
│   │   └── use-cases/           # Casos de uso (Create, FindAll)
│   │
│   └── Venda/
│       ├── entity/              # Entity Venda
│       ├── repositories/        # Repositório e model Sequelize
│       └── use-cases/           # Casos de uso (Create, FindOne, FindAll)
│
├── routes/
│   ├── index.ts                 # Roteamento principal
│   ├── produtos.ts
│   ├── entradaEstoque.ts
│   └── vendas.ts
│
├── app.ts                       # Configuração do Express
└── server.ts                    # Inicialização do servidor
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
* Timestamps: `criado_em`, `alterado_em`, `deletado_em` (exclusão lógica)

### EntradaEstoque

* `id` (PK)
* `id_produto` (FK → Produto)
* `qtde`
* Timestamps: `criado_em`, `alterado_em`, `deletado_em`

### Venda

* `id` (PK)
* `id_produto` (FK → Produto)
* `qtde`
* `total` (calculado automaticamente no UseCase)
* Timestamps: `criado_em`, `alterado_em`, `deletado_em`

---

## Rotas

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

## Relacionamentos entre tabelas

| Tabela         | Relação                       |
| -------------- | ----------------------------- |
| Produto        | 1:N EntradaEstoque, 1:N Venda |
| EntradaEstoque | N:1 Produto                   |
| Venda          | N:1 Produto                   |

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

3. Configure o arquivo `.env` com suas credenciais do MySQL:

```
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASS=senha
DB_HOST=localhost
PORT=3000
```

---

## Executando o Projeto

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## Observações

* Exclusão de produtos, vendas e entradas é **lógica** (exclusão suave com `deletedAt`).
* Ao registrar uma venda, o **estoque do produto é automaticamente reduzido**.
* Ao registrar uma entrada de estoque, o **estoque do produto é automaticamente incrementado**.
* O **total** da venda é calculado automaticamente no **UseCase**, não é enviado pelo cliente.

---

## Autor

Ezequiel Farias
[GitHub](https://github.com/ezequiel-softfilm)
