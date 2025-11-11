import { DataTypes, Model } from "sequelize"
import { CompraEnumStatus } from "../entity/Compra"
import { sequelize } from "../../../config/database"

export interface CompraModelAttributes
{
    id?: number
    id_fornecedor: number
    valor_total?: number
    status?: CompraEnumStatus
    observacao?: string
    criado_por?: number
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export class CompraModel extends Model<CompraModelAttributes> implements CompraModelAttributes
{
    public id!: number
    public id_fornecedor!: number
    public valor_total!: number
    public status!: CompraEnumStatus
    public observacao!: string
    public criado_por!: number
    public criado_em!: Date
    public alterado_em!: Date
    public deletado_em!: Date | null
}

CompraModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_fornecedor:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "fornecedores", key: "id" },
            onDelete: "RESTRICT"
        },
        valor_total:
        {
            type: DataTypes.DECIMAL
        },
        status:
        {
            type: DataTypes.ENUM(...Object.values(CompraEnumStatus)),
            defaultValue: CompraEnumStatus.Registrada
        },
        observacao:
        {
            type: DataTypes.TEXT
        },
        criado_por:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "usuarios", key: "id"},
            onDelete: "RESTRICT"
        }
    },
    {
        sequelize,
        tableName: "compras",
        timestamps: true,
        paranoid: true,
        createdAt: "criado_em",
        updatedAt: "alterado_em",
        deletedAt: "deletado_em"
    }
)