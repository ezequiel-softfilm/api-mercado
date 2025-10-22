import { Model } from "sequelize";

interface EntradaEstoqueModelInterface extends Model
{
    id: number
    id_produto: number
    qtde: number
    criado_em?: Date
    atualizado_em?: Date
    deletado_em?: Date | null
}

export default EntradaEstoqueModelInterface