import { ICompraRepository } from "../../Compra/repositories/ICompraRepository";
import { IProdutoRepository } from "../../Produto/repositories/IProdutoRepository";
import { CreateCompraItensDto } from "../dto/create-compraItens.dto";
import { CompraItens } from "../entity/CompraItens";
import { ICompraItensRepository } from "../repositories/ICompraItensRepository";

export class CreateCompraItensUseCase
{
    constructor(
        private compraItensRepository: ICompraItensRepository,
        private compraRepository: ICompraRepository,
        private produtoRepository: IProdutoRepository
    ){}

    async execute(dto: CreateCompraItensDto[]): Promise<CompraItens[]>
    {
        const itensCriados: CompraItens[] = []

        for(const item of dto)
        {   
            const compra = await this.compraRepository.findOne(item.id_compra)
            if(!compra) throw new Error("Compra não encontrado.")
                
            const produto = await this.produtoRepository.findOne(item.id_produto)
            if(!produto) throw new Error("Produto não encontrado.")

            const compraItem = new CompraItens(
            {
                id_compra: item.id_compra,
                id_produto: item.id_produto,
                quantidade: item.quantidade,
                preco_unitario: item.preco_unitario,
                subtotal: item.preco_unitario * item.quantidade,
            })

            itensCriados.push(compraItem)
        }

        const newCompraItens = await this.compraItensRepository.create(itensCriados)

        return newCompraItens
    }
}