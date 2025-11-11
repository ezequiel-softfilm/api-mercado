import { Compra } from "../entity/Compra";
import { ICompraRepository } from "../repositories/ICompraRepository";

export class FindOneCompraUseCase
{
    constructor(private compraRepository: ICompraRepository){}

    async execute(id: number): Promise<Compra | null>
    {
        const compra = await this.compraRepository.findOne(id)
        if(!compra) return null

        return compra
    }
}