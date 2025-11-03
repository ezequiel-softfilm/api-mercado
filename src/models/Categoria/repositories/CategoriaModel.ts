import { DataTypes, Model } from "sequelize"
import { CategoriaEnumAtivo } from "../entity/Categoria"
import { sequelize } from "../../../config/database"
import { UsuarioModel } from "../../Usuario/repositories/UsuarioModel"

export interface CategoriaModelAttributes
{
    id?: number
    nome: string
    descricao?: string
    ativo?: CategoriaEnumAtivo
    criado_por?: number
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class CategoriaModel extends Model<CategoriaModelAttributes> implements CategoriaModelAttributes
{
    public id!: number
    public nome!: string
    public descricao?: string
    public ativo!: CategoriaEnumAtivo
    public criado_por!: number
    public readonly criado_em!: Date
    public readonly alterado_em!: Date
    public readonly deletado_em!: Date | null
}

CategoriaModel.init(
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
        ativo:
        {
            type: DataTypes.ENUM(...Object.values(CategoriaEnumAtivo)),
            defaultValue: CategoriaEnumAtivo.Ativo
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
        tableName: "categorias",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)