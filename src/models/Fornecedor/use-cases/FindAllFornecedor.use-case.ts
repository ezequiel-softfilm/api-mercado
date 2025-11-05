import { Fornecedor } from "../entity/Fornecedor";
import { IFornecedorRepository } from "../repositories/IFornecedorRepository";

export class FindAllFornecedorUseCase
{
    constructor(private fornecedorRepository: IFornecedorRepository){}

    async execute(): Promise<Fornecedor[]>
    {
        const fornecedores = await this.fornecedorRepository.findAll()

        return fornecedores
    }
}