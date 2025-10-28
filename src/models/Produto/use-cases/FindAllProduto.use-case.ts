import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";

export class FindAllProdutosUseCase
{
    constructor(private produtoRepository: IProdutoRepository){}

    async execute(): Promise<Produto[]>
    {
        const produtos = await this.produtoRepository.findAll()

        return produtos
    }
}