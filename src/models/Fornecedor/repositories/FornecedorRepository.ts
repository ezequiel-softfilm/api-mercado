import { Fornecedor } from "../entity/Fornecedor";
import { FornecedorModel } from "./FornecedorModel";
import { IFornecedorRepository } from "./IFornecedorRepository";

export class FornecedorRepository implements IFornecedorRepository
{
    async findAll(): Promise<Fornecedor[]>
    {
        const fornecedores = await FornecedorModel.findAll()

        return fornecedores
    }

    async findOne(id: number): Promise<Fornecedor | null>
    {
        const fornecedor = await FornecedorModel.findByPk(id)

        if(!fornecedor) return null

        return fornecedor
    }

    async create(fornecedor: Fornecedor): Promise<Fornecedor>
    {
        const newFornecedor = await FornecedorModel.create(
        {
            nome: fornecedor.nome,
            cnpj: fornecedor.cnpj,
            telefone: fornecedor.telefone,
            email: fornecedor.email,
            endereco: fornecedor.endereco,
            ativo: fornecedor.ativo,
            criado_por: fornecedor.criado_por
        })

        return newFornecedor
    }

    async update(id: number, fornecedor: Partial<Fornecedor>): Promise<boolean>
    {
        const [updateFornecedor] = await FornecedorModel.update(fornecedor, { where: { id } })

        return updateFornecedor > 0
    }

    async excluir(id: number): Promise<boolean>
    {
        const excluirFornecedor = await FornecedorModel.destroy({ where: { id }})

        return excluirFornecedor > 0
    }
}