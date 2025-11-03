import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../config/database"
import { ProdutoEnumAtivo } from "../entity/Produto"
import { CategoriaModel } from "../../Categoria/repositories/CategoriaModel"

export interface ProdutoModelAttributes
{
    id?: number
    nome: string
    descricao?: string
    codigo_barras: string
    preco_custo: number
    preco_venda: number
    estoque_atual: number
    estoque_minimo: number
    id_categoria: number
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
    public codigo_barras!: string
    public preco_custo!: number
    public preco_venda!: number
    public estoque_atual!: number
    public estoque_minimo!: number
    public id_categoria!: number
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
        codigo_barras:
        {
            type: DataTypes.STRING,
        },
        preco_custo:
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        preco_venda:
        {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        estoque_atual:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estoque_minimo:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_categoria:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "categorias", key: "id"},
            onDelete: "RESTRICT"
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