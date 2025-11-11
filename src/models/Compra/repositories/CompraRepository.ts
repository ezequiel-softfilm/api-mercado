import { Compra } from "../entity/Compra";
import { CompraModel } from "./CompraModel";
import { ICompraRepository } from "./ICompraRepository";

export class CompraRepository implements ICompraRepository
{
    async findAll(): Promise<Compra[]>
    {
        const compras = await CompraModel.findAll()
        
        return compras
    }

    async findOne(id: number): Promise<Compra | null>
    {
        const compra = await CompraModel.findByPk(id)

        if(!compra) return null

        return compra
    }

    async create(compra: Compra): Promise<Compra>
    {
        const newCompra = await CompraModel.create(
        {
            id_fornecedor: compra.id_fornecedor,
            valor_total: compra.valor_total,
            status: compra.status,
            observacao: compra.observacao,
            criado_por: compra.criado_por
        })

        return newCompra
    }

    async update(id: number, compra: Partial<Compra>): Promise<boolean>
    {
        const [updateCompra] = await CompraModel.update(compra, { where: { id }})

        return updateCompra > 0
    }

    async excluir(id: number): Promise<boolean>
    {
        const excluirCompra = await CompraModel.destroy({ where: { id }})

        return excluirCompra > 0
    }
}