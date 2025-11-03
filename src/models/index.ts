import 'dotenv/config'
import { sequelize } from '../config/database'
import { ProdutoModel } from './Produto/repositories/ProdutoModel'
import { CategoriaModel } from './Categoria/repositories/CategoriaModel'
import { VendaModel } from './Venda/repositories/VendaModel'
import { UsuarioModel } from './Usuario/repositories/UsuarioModel'
import { EntradaEstoqueModel } from './EntradaEstoque/repositories/EntradaEstoqueModel'

ProdutoModel.belongsTo(CategoriaModel,
{
    foreignKey: "id_categoria",
    as: "categoria",
    constraints: true
})

VendaModel.belongsTo(ProdutoModel, {
    foreignKey: "id_produto",
    as: "produto",
    constraints: true
})

CategoriaModel.belongsTo(UsuarioModel,
{
    foreignKey: "criado_por",
    as: "usuario_criador",
    constraints: true
})

EntradaEstoqueModel.belongsTo(ProdutoModel, {
    foreignKey: "id_produto",
    as: "produto",
    constraints: true
})

ProdutoModel.belongsTo(UsuarioModel,
{
    foreignKey: "criado_por",
    as: "usuario_criador",
    constraints: true
})

EntradaEstoqueModel.belongsTo(UsuarioModel, 
{ 
    foreignKey: "criado_por", 
    as: "usuario_criador",
    constraints: true
})

VendaModel.belongsTo(UsuarioModel, 
{ 
    foreignKey: "criado_por", 
    as: "usuario_criador",
    constraints: true
})

sequelize.sync(
{
    force: false,
    alter: true
}).then(() =>
{
    console.log("Tabelas sincronizadas")
})