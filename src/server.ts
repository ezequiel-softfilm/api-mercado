import express from "express";
import app from "./app";
import { sequelize } from "./config/database";
import './models';

import produtosRoutes from "./routes/produtos";
import entradaEstoqueRoutes from "./routes/entradaEstoque";
import vendaRoutes from "./routes/venda"
import usuarioRoutes from "./routes/usuario"
import authRoutes from './routes/auth'
import categoriaRoutes from './routes/categorias'
import fornecedorRoutes from './routes/fornecedor'

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/produtos", produtosRoutes)
app.use("/api/estoque", entradaEstoqueRoutes)
app.use("/api/vendas", vendaRoutes)
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/categorias", categoriaRoutes)
app.use("/api/fornecedores", fornecedorRoutes)

async function startServer() {
    try {
        await sequelize.authenticate();

        console.clear();
        console.log("Conexão com o banco de dados bem-sucedida");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });

    } catch (error) {
        console.error(`Erro ao conectar no banco de dados: ${error}`);
    }
}

startServer();
