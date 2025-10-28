import { Venda } from "../entity/Venda";
import { IVendaRepository } from "../repositories/IVendaRepository";

export class FindOneVendaUseCase
{
    constructor(private vendaRepository: IVendaRepository){}

    async execute(id: number): Promise<Venda | null>
    {
        const venda = await this.vendaRepository.findOne(id)

        return venda
    }
}