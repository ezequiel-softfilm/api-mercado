import { IProdutoRepository } from "../../Produto/repositories/IProdutoRepository";
import { CreateEntradaEstoqueDto } from "../dto/create-entradaEstoque.dto";
import { EntradaEstoque } from "../entity/EntradaEstoque";
import { IEntradaEstoqueRepository } from "../repositories/IEntradaEstoqueRepository";

export class CreateEntradaEstoqueUseCase
{
    constructor(
        private entradaEstoqueRepository: IEntradaEstoqueRepository,
        private produtoRepository: IProdutoRepository
    ){}

    async execute(dto: CreateEntradaEstoqueDto): Promise<EntradaEstoque>
    {
        const produto = await this.produtoRepository.findOne(dto.id_produto)
        if(!produto) throw new Error("Produto não encontrado.")

        const entrada = new EntradaEstoque(dto)
        const newEntrada = await this.entradaEstoqueRepository.create(entrada)

        const novoEstoque = produto.qtde_estoque + dto.qtde
        await this.produtoRepository.update(dto.id_produto, { qtde_estoque: novoEstoque })

        return newEntrada
    }
}