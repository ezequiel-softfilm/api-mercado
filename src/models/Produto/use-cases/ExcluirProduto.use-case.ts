import { ProdutoEnumAtivo } from "../entity/Produto"
import { IProdutoRepository } from "../repositories/IProdutoRepository"

export class ExcluirProdutoUseCase
{
    constructor(private produtoRepository: IProdutoRepository){}

    async execute(id: number): Promise<boolean>
    {
        const produto = await this.produtoRepository.findOne(id)
        if (!produto) return false

        const atualizado = await this.produtoRepository.update(id,
        {
            ativo: ProdutoEnumAtivo.Inativo
        })

        const excluirProduto = await this.produtoRepository.excluir(id)

        return excluirProduto
    }
}