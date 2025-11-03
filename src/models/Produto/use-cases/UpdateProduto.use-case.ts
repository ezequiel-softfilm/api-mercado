import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";

export class UpdateProdutoUseCase
{
    constructor(private produtoRepository: IProdutoRepository){}

    async execute(id: number, data: Partial<Produto>): Promise<boolean>
    {
        if(data.estoque_atual) throw new Error("Não é possível realizar alteração de quantidade por aqui.")
        if(data.preco_custo || data.preco_venda) throw new Error("Não é possível realizar alteração de preço por aqui.")

        const updateProduto = await this.produtoRepository.update(id, data)

        return updateProduto
    }
}
