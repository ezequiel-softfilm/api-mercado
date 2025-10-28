import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../config/database"
import { ProdutoModel } from "../../Produto/repositories/ProdutoModel"

export interface EntradaEstoqueModelAttributes
{
    id?: number
    id_produto: number
    qtde: number
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class EntradaEstoqueModel extends Model<EntradaEstoqueModelAttributes> implements EntradaEstoqueModelAttributes
{
    public id!: number
    public id_produto!: number
    public qtde!: number
    public readonly criado_em!: Date
    public readonly alterado_em!: Date
    public readonly deletado_em!: Date | null
}

EntradaEstoqueModel.init(
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
                model: "produtos",
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
        sequelize,
        tableName: "entrada_estoques",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)

EntradaEstoqueModel.belongsTo(ProdutoModel, {
    foreignKey: "id_produto",
    as: "produto"
})
ProdutoModel.hasMany(EntradaEstoqueModel, {
    foreignKey: "id_produto",
    as: "entradas"
})