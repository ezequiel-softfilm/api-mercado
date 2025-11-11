import { IFornecedorRepository } from "../../Fornecedor/repositories/IFornecedorRepository";
import { Compra } from "../entity/Compra";
import { ICompraRepository } from "../repositories/ICompraRepository";

export class UpdateCompraUseCase
{
    constructor(
        private compraRepository: ICompraRepository,
        private fornecedorRepository: IFornecedorRepository
    ){}

    async execute(id: number, data: Partial<Compra>): Promise<boolean>
    {
        const fornecedor = await this.fornecedorRepository.findOne(Number(data.id_fornecedor))
        
        if(!fornecedor) throw new Error("Fornecedor não encontrado")

        const updateCompra = await this.compraRepository.update(id, data)

        return updateCompra
    }
}