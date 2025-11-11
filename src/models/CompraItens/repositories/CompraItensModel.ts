import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../config/database"

export interface ICompraItensAttributes
{
    id?: number
    id_compra: number
    id_produto: number
    quantidade: number
    preco_unitario: number
    subtotal?: number
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class CompraItensModel extends Model<ICompraItensAttributes> implements ICompraItensAttributes
{
    public id!: number
    public id_compra!: number
    public id_produto!: number
    public quantidade!: number
    public preco_unitario!: number
    public subtotal!: number
    public criado_em!: Date
    public alterado_em!: Date
    public deletado_em!: Date | null
}

CompraItensModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_compra:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "compras", key: "id" },
            onDelete: "RESTRICT"
        },
        id_produto:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "produtos", key: "id" },
            onDelete: "RESTRICT"
        },
        quantidade:
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        preco_unitario:
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        subtotal:
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "compra_itens",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "excluido_em"
    }
)