import { CompraItens } from "../entity/CompraItens";
import { ICompraItensRepository } from "../repositories/ICompraItensRepository";

export class FindItemCompraUseCase
{
    constructor(
        private compraItensRepository: ICompraItensRepository
    ) {}

    async execute(id: number): Promise<CompraItens | null>
    {
        const compraItem = await this.compraItensRepository.findItemCompra(id)

        if(!compraItem) return null

        return compraItem
    }
}