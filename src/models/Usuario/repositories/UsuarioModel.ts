import { DataTypes, Model } from "sequelize"
import { UsuarioEnumStatus } from "../entity/Usuario"
import { sequelize } from "../../../config/database"
import { ProdutoModel } from "../../Produto/repositories/ProdutoModel"
import { EntradaEstoqueModel } from "../../EntradaEstoque/repositories/EntradaEstoqueModel"
import { VendaModel } from "../../Venda/repositories/VendaModel"

export interface UsuarioModelAttributes
{
    id?: number
    nome: string
    email: string
    password: string
    status: UsuarioEnumStatus
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class UsuarioModel extends Model<UsuarioModelAttributes> implements UsuarioModelAttributes
{
    public id!: number
    public nome!: string
    public email!: string
    public password!: string
    public status!: UsuarioEnumStatus
    public readonly criado_em!: Date
    public readonly alterado_em!: Date
    public readonly deletado_em!: Date | null
}

UsuarioModel.init(
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
        email:
        {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate:
            {
                isEmail: true
            }
        },
        password:
        {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status:
        {
            type: DataTypes.ENUM(...Object.values(UsuarioEnumStatus)),
            defaultValue: UsuarioEnumStatus.Ativo
        }
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)

ProdutoModel.belongsTo(UsuarioModel,
{
    foreignKey: "criado_por",
    as: "usuario_criador"
})

UsuarioModel.hasMany(ProdutoModel,
{
    foreignKey: "criado_por",
    as: "produtos_criados"
})

EntradaEstoqueModel.belongsTo(UsuarioModel, 
{ 
    foreignKey: "criado_por", 
    as: "usuario_criador" 
})

UsuarioModel.hasMany(EntradaEstoqueModel, 
{ 
    foreignKey: "criado_por", 
    as: "entradas_criadas" 
})

VendaModel.belongsTo(UsuarioModel, 
{ 
    foreignKey: "criado_por", 
    as: "usuario_criador" 
})

UsuarioModel.hasMany(VendaModel, 
{ 
    foreignKey: "criado_por", 
    as: "vendas_criadas" 
})