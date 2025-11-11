import { CompraItens } from "../entity/CompraItens";
import { ICompraItensRepository } from "../repositories/ICompraItensRepository";

export class FindItensCompraUseCase
{
    constructor(
        private compraItensRepository: ICompraItensRepository
    ) {}

    async execute(id_compra: number): Promise<CompraItens[] | null>
    {
        const compraItens = await this.compraItensRepository.findItensCompra(id_compra)

        if(!compraItens) return null

        return compraItens
    } 
}