import { IProdutoRepository } from "../../Produto/repositories/IProdutoRepository";
import { CreateVendaDto } from "../dto/create-venda.dto";
import { Venda } from "../entity/Venda";
import { IVendaRepository } from "../repositories/IVendaRepository";

export class CreateVendaUseCase
{
    constructor(
        private vendaRepository: IVendaRepository,
        private produtoRepository: IProdutoRepository
    ){}

    async execute(dto: CreateVendaDto): Promise<Venda>
    {
        const produto = await this.produtoRepository.findOne(dto.id_produto)
        if(!produto) throw new Error("Produto não encontrado.")
        if(produto.qtde_estoque < dto.qtde) throw new Error("Saldo insuficiente.")
        
        const venda = new Venda(dto)
        venda.total = dto.qtde * produto.preco_unitario
        const newVenda = await this.vendaRepository.create(venda)
        
        const novoEstoque = produto.qtde_estoque - dto.qtde
        await this.produtoRepository.update(dto.id_produto, { qtde_estoque: novoEstoque })

        return newVenda
    }
}