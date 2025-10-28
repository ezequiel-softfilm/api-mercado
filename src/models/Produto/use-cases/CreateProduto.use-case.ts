import { CreateProdutoDto } from "../dto/create-produto.dto";
import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";

export class CreateProdutoUseCase
{
    constructor(private produtoRepository: IProdutoRepository){}

    async execute(dto: CreateProdutoDto): Promise<Produto>
    {
        const produto = new Produto(
        {
            nome: dto.nome,
            descricao: dto.descricao,
            preco_unitario: dto.preco_unitario,
            qtde_estoque: dto.qtde_estoque
        });

        const newProduto = await this.produtoRepository.create(produto)

        return newProduto
    }
}