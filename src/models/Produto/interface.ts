import { Model } from "sequelize"
import { ProdutoEnumAtivo } from "./index"

interface ProdutoModelInterface extends Model
{
    id: number
    nome: string
    descricao?: string
    preco_unitario: number
    qtde_estoque: number
    ativo: ProdutoEnumAtivo
    criado_em?: Date
    alterado_em?: Date
    deletado_em?: Date | null
}

export default ProdutoModelInterface
