import { ICompraItensRepository } from "../repositories/ICompraItensRepository";

export class ExcluirCompraItemUseCase
{
    constructor(
        private excluirCompraItens: ICompraItensRepository
    ) {}

    async execute(id: number): Promise<boolean>
    {
        const excluirCompraItem = await this.excluirCompraItens.excluir(id)

        return excluirCompraItem
    }
}