import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";

export class FindOneProdutoUseCase
{
    constructor(private produtoRepository: IProdutoRepository){}

    async execute(id: number): Promise<Produto | null>
    {
        const produto = await this.produtoRepository.findOne(id)

        return produto
    }
}