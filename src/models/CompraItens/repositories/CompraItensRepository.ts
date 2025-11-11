import { CompraItens } from "../entity/CompraItens";
import { CompraItensModel } from "./CompraItensModel";
import { ICompraItensRepository } from "./ICompraItensRepository";

export class CompraItensRepository implements ICompraItensRepository
{
    async findItensCompra(id_compra: number): Promise<CompraItens[] | null>
    {
        const compraItens = await CompraItensModel.findAll(
        {
            where: 
            {
                id_compra
            }
        })

        if(!compraItens) return null

        return compraItens
    }

    async findItemCompra(id: number): Promise<CompraItens | null>
    {
        const compraItem = await CompraItensModel.findByPk(id)

        if(!compraItem) return null

        return compraItem
    }

    async create(compraItens: CompraItens[]): Promise<CompraItens[]>
    {
        const itensCriados: CompraItens[] = []

        for (const item of compraItens)
        {
            const novoItem = await CompraItensModel.create(
            {
                id_compra: item.id_compra,
                id_produto: item.id_produto,
                quantidade: item.quantidade,
                preco_unitario: item.preco_unitario,
                subtotal: item.subtotal
            })

            itensCriados.push(novoItem)
        }

        return itensCriados
    }

    async update(id: number, compraItens: Partial<CompraItens>): Promise<boolean>
    {
        const [updateCompraItem] = await CompraItensModel.update(compraItens, { where: { id }})

        return updateCompraItem > 0
    }

    async excluir(id: number): Promise<boolean>
    {
        const excluirItem = await CompraItensModel.destroy({ where: { id }})

        return excluirItem > 0
    }
}