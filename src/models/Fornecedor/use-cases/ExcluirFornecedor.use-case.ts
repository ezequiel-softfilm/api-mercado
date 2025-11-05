import { FornecedorEnumAtivo } from "../entity/Fornecedor";
import { IFornecedorRepository } from "../repositories/IFornecedorRepository";

export class ExcluirFornecedorUseCase
{
    constructor(private fornecedorRepository: IFornecedorRepository){}

    async execute(id: number): Promise<boolean>
    {
        const fornecedor = await this.fornecedorRepository.findOne(id)
        if(!fornecedor) return false

        await this.fornecedorRepository.update(id,
        {
            ativo: FornecedorEnumAtivo.Inativo
        })

        const excluirFornecedor = await this.fornecedorRepository.excluir(id)

        return excluirFornecedor
    }
}