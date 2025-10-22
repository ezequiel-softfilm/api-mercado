import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";
import EntradaEstoqueModelInterface from "./interface";
import { Produto } from "../Produto";

export const EntradaEstoque = sequelize.define<EntradaEstoqueModelInterface>(
    'EntradaEstoque',
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_produto:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references:
            {
                model: Produto,
                key: "id"
            },
            onDelete: "RESTRICT"
        },
        qtde:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:
            {
                min: 1
            }
        }
    },
    {
        tableName: 'entrada_estoques',
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)

Produto.hasMany(EntradaEstoque, { foreignKey: "id_produto"})
EntradaEstoque.belongsTo(Produto, { foreignKey: "id_produto"})