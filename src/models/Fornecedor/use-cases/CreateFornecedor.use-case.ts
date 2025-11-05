import { CreateFornecedorDto } from "../dto/create-fornecedor.dto";
import { Fornecedor } from "../entity/Fornecedor";
import { IFornecedorRepository } from "../repositories/IFornecedorRepository";

export class CreateFornecedorUseCase
{
    constructor(private fornecedorRepository: IFornecedorRepository){}

    async execute(dto: CreateFornecedorDto): Promise<Fornecedor>
    {
        const fornecedor = new Fornecedor(
        {
            nome: dto.nome,
            cnpj: dto.cnpj,
            telefone: dto.telefone,
            email: dto.email,
            endereco: dto.endereco,
            criado_por: dto.criado_por
        })

        const newFornecedor = await this.fornecedorRepository.create(fornecedor)

        return newFornecedor
    }
}