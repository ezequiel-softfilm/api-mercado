import { Model } from "sequelize"

interface VendaModelInterface extends Model
{
    id: number
    id_produto: number
    qtde: number
    total: number
    criado_em?: Date
    atualizado_em?: Date
    deletado_em?: Date | null
}

export default VendaModelInterface