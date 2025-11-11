import { CompraItens } from "../entity/CompraItens";
import { ICompraItensRepository } from "../repositories/ICompraItensRepository";

export class UpdateItemCompraUseCase
{
    constructor(
        private compraItemRepository: ICompraItensRepository
    ){}

    async execute(id: number, compraItens: Partial<CompraItens>): Promise<boolean>
    {
        const updateCompraItem = this.compraItemRepository.update(id, compraItens)

        return updateCompraItem
    }
}