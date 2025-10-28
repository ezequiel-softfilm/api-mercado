import express from "express";
import app from "./app";
import { sequelize } from "./config/database";
import './models';

import produtosRoutes from "./routes/produtos";
import entradaEstoqueRoutes from "./routes/entradaEstoque";
import vendaRouter from "./routes/venda"

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/produtos", produtosRoutes);
app.use("/api/estoque", entradaEstoqueRoutes);
app.use("/api/vendas", vendaRouter);

async function startServer() {
    try {
        await sequelize.authenticate();

        console.clear();
        console.log("Conexão com o banco de dados bem-sucedida");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });

        console.log(`
                        Produto
| Método | Endpoint            | Descrição                      |
| ------ | ------------------- | ------------------------------ |
| GET    | /api/produtos       | Lista todos os produtos ativos |
| GET    | /api/produtos/:id   | Obtém produto por ID           |
| POST   | /api/produtos       | Cria um novo produto           |
| PUT    | /api/produtos/:id   | Atualiza um produto existente  |
| DELETE | /api/produtos/:id   | Exclui logicamente um produto  |

                                      Entrada Estoque
| Método | Endpoint               | Descrição                                             |
| ------ | ---------------------- | ----------------------------------------------------- |
| GET    | /api/estoque/historico | Lista todas as entradas de estoque                    |
| POST   | /api/estoque/entrada   | Cria uma nova entrada e atualiza o estoque do produto |

                                       Venda
| Método | Endpoint          | Descrição                                               |
| ------ | -------------     | ------------------------------------------------------- |
| GET    | /api/vendas       | Lista todas as vendas                                   |
| GET    | /api/vendas/:id   | Obtém venda por ID                                      |
| POST   | /api/vendas       | Registra uma nova venda e atualiza o estoque do produto |
        `);
    } catch (error) {
        console.error(`Erro ao conectar no banco de dados: ${error}`);
    }
}

startServer();
