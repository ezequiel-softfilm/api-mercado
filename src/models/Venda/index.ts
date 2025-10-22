import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";
import { Produto } from "../Produto";
import VendaModelInterface from "./interface";

export const Venda = sequelize.define<VendaModelInterface>(
    'Venda',
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
        },
        total:
        {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    },
    {
        tableName: 'vendas',
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)

Produto.hasMany(Venda, { foreignKey: "id_produto" })
Venda.belongsTo(Produto, { foreignKey: "id_produto" })