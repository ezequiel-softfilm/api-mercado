import { Fornecedor } from "../entity/Fornecedor";
import { IFornecedorRepository } from "../repositories/IFornecedorRepository";

export class UpdateFornecedoUseCase
{
    constructor(private fornecedorRepository: IFornecedorRepository){}

    async execute(id: number, fornecedor: Partial<Fornecedor>): Promise<boolean>
    {
        const updateFornecedor = await this.fornecedorRepository.update(id, fornecedor)

        return updateFornecedor
    }
}