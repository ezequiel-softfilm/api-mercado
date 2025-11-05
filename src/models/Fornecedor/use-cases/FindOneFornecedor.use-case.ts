import { Fornecedor } from "../entity/Fornecedor";
import { IFornecedorRepository } from "../repositories/IFornecedorRepository";

export class FindOneFornecedorUseCase
{
    constructor(private fornecedorRepository: IFornecedorRepository){}

    async execute(id: number): Promise<Fornecedor | null>
    {
        const fornecedor = await this.fornecedorRepository.findOne(id)

        if(!fornecedor) return null

        return fornecedor
    }
}