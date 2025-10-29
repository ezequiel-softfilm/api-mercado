import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../config/database"
import { ProdutoEnumAtivo } from "../entity/Produto"

export interface ProdutoModelAttributes
{
    id?: number
    nome: string
    descricao?: string
    preco_unitario: number
    qtde_estoque: number
    ativo: ProdutoEnumAtivo
    criado_por?: number
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class ProdutoModel extends Model<ProdutoModelAttributes> implements ProdutoModelAttributes
{
    public id!: number
    public nome!: string
    public descricao?: string
    public preco_unitario!: number
    public qtde_estoque!: number
    public ativo!: ProdutoEnumAtivo
    public criado_por!: number
    public readonly criado_em!: Date
    public readonly alterado_em!: Date
    public readonly deletado_em!: Date | null
}

ProdutoModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:
        {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        descricao:
        {
            type: DataTypes.STRING,
        },
        preco_unitario:
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        qtde_estoque:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ativo:
        {
            type: DataTypes.ENUM(...Object.values(ProdutoEnumAtivo)),
            defaultValue: ProdutoEnumAtivo.Ativo,
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
        tableName: "produtos",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)