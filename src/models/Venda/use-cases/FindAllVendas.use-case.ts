import { Venda } from "../entity/Venda";
import { IVendaRepository } from "../repositories/IVendaRepository";

export class FindAllVendasUseCase
{
    constructor(private vendaRepository: IVendaRepository){}

    async execute(): Promise<Venda[]>
    {
        const vendas = await this.vendaRepository.findAll()

        return vendas
    }
}