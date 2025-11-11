import { Compra } from "../entity/Compra";
import { ICompraRepository } from "../repositories/ICompraRepository";

export class FindAllCompraUseCase
{
    constructor(private compraRepository: ICompraRepository){}

    async execute(): Promise<Compra[]>
    {
        const compras = await this.compraRepository.findAll()

        return compras
    }
}