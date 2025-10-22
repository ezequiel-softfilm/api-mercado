import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";
import ProdutoModelInterface from "./interface";

export enum ProdutoEnumAtivo
{
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export const Produto = sequelize.define<ProdutoModelInterface>(
    'Produto',
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome:
        {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        descricao:
        {
            type: DataTypes.STRING
        },
        preco_unitario:
        {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        qtde_estoque:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ativo:
        {
            type: DataTypes.ENUM(...Object.values(ProdutoEnumAtivo)),
            defaultValue: ProdutoEnumAtivo.Ativo
        }
    },
    {
        tableName: 'produtos',
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)