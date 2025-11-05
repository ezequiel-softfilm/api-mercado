import { DataTypes, Model } from "sequelize"
import { FornecedorEnumAtivo } from "../entity/Fornecedor"
import { sequelize } from "../../../config/database"

export interface FornecedorModelAttributes
{
    id?: number
    nome: string
    cnpj: string
    telefone?: string
    email: string
    endereco: string
    ativo?: FornecedorEnumAtivo
    criado_por?: number
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class FornecedorModel extends Model<FornecedorModelAttributes> implements FornecedorModelAttributes
{
    public id!: number
    public nome!: string
    public cnpj!: string
    public telefone!: string
    public email!: string
    public endereco!: string
    public ativo!: FornecedorEnumAtivo
    public criado_por!: number
    public readonly criado_em!: Date
    public readonly alterado_em!: Date
    public readonly deletado_em!: Date | null
}

FornecedorModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        cnpj:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone:
        {
            type: DataTypes.STRING
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        ativo:
        {
            type: DataTypes.ENUM(...Object.values(FornecedorEnumAtivo)),
            defaultValue: FornecedorEnumAtivo.Ativo
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
        tableName: "fornecedores",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)