import express from "express";
import app from "./app";
import { sequelize } from "./config/database";
import './models';

import produtosRoutes from "./routes/produtos";
import entradaEstoqueRoutes from "./routes/entradaEstoque";
import vendaRoutes from "./routes/venda"
import usuarioRoutes from "./routes/usuario"
import authRoutes from './routes/auth'

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/produtos", produtosRoutes)
app.use("/api/estoque", entradaEstoqueRoutes)
app.use("/api/vendas", vendaRoutes)
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/auth", authRoutes)

async function startServer() {
    try {
        await sequelize.authenticate();

        console.clear();
        console.log("Conexão com o banco de dados bem-sucedida");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });

        console.log(`
====================================================================
📦 PRODUTO (JWT)
--------------------------------------------------------------------
| Método | Endpoint            | Descrição                      |
| ------ | ------------------- | ------------------------------ |
| GET    | /api/produtos       | Lista todos os produtos ativos |
| GET    | /api/produtos/:id   | Obtém produto por ID           |
| POST   | /api/produtos       | Cria um novo produto           |
| PUT    | /api/produtos/:id   | Atualiza um produto existente  |
| DELETE | /api/produtos/:id   | Exclui logicamente um produto  |

====================================================================
📥 ENTRADA DE ESTOQUE (JWT)
--------------------------------------------------------------------
| Método | Endpoint               | Descrição                                             |
| ------ | ---------------------- | ----------------------------------------------------- |
| GET    | /api/estoque/historico | Lista todas as entradas de estoque                    |
| POST   | /api/estoque/entrada   | Cria uma nova entrada e atualiza o estoque do produto |

====================================================================
💰 VENDA (JWT)
--------------------------------------------------------------------
| Método | Endpoint          | Descrição                                               |
| ------ | ----------------- | ------------------------------------------------------- |
| GET    | /api/vendas       | Lista todas as vendas                                   |
| GET    | /api/vendas/:id   | Obtém venda por ID                                      |
| POST   | /api/vendas       | Registra uma nova venda e atualiza o estoque do produto |

====================================================================
👤 USUÁRIO
--------------------------------------------------------------------
| Método | Endpoint                  | Descrição                       |
| ------ | -------------------------- | -------------------------------- |
| GET    | /api/usuarios              | Lista todos os usuários          |
| GET    | /api/usuarios/:id          | Obtém usuário por ID             |
| GET    | /api/usuarios/email/:email | Obtém usuário por e-mail         |
| POST   | /api/usuarios              | Cria um novo usuário             |
====================================================================
====================================================================
👤 Auth
--------------------------------------------------------------------
| Método | Endpoint    | Descrição              |
| ------ | ----------- | ---------------------- |
| POST   | /api/auth   | Login de usuário (JWT) |
====================================================================
        `)
    } catch (error) {
        console.error(`Erro ao conectar no banco de dados: ${error}`);
    }
}

startServer();
