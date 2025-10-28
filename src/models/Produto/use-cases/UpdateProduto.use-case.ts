import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";

export class UpdateProdutoUseCase
{
    constructor(private produtoRepository: IProdutoRepository){}

    async execute(id: number, data: Partial<Produto>): Promise<boolean>
    {
        const updateProduto = await this.produtoRepository.update(id, data)

        return updateProduto
    }
}