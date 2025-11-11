import { CompraEnumStatus } from "../entity/Compra";
import { ICompraRepository } from "../repositories/ICompraRepository";

export class ExcluirCompraUseCase
{
    constructor(private compraRepository: ICompraRepository){}

    async execute(id: number): Promise<boolean>
    {
        const compra = await this.compraRepository.findOne(id)

        if(!compra) throw new Error("Compra não encontrada")
        
        await this.compraRepository.update(id,
        {
            status: CompraEnumStatus.Cancelada
        })

        const excluirCompra = await this.compraRepository.excluir(id)

        return excluirCompra
    }
}