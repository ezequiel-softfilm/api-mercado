import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../config/database"
import { ProdutoModel } from "../../Produto/repositories/ProdutoModel"

export interface VendaModelAttributes
{
    id?: number
    id_produto: number
    qtde: number
    total?: number
    criado_por?: number
    criado_em?: Date
    alterado_em?: Date 
    deletado_em?: Date | null
}

export class VendaModel extends Model<VendaModelAttributes> implements VendaModelAttributes
{
    public id!: number
    public id_produto!: number
    public qtde!: number
    public total!: number
    public criado_por!: number
    public readonly criado_em!: Date
    public readonly alterado_em!: Date
    public readonly deletado_em!: Date | null
}

VendaModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
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
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        criado_por: 
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: { model: "usuarios", key: "id" },
            onDelete: "RESTRICT"
        }
    },
    {
        sequelize,
        tableName: "vendas",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)

VendaModel.belongsTo(ProdutoModel, {
    foreignKey: "id_produto",
    as: "produto"
})
ProdutoModel.hasMany(VendaModel, {
    foreignKey: "id_produto",
    as: "vendas"
})