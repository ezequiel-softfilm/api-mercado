import { Venda } from "../entity/Venda";
import { IVendaRepository } from "./IVendaRepository";
import { VendaModel } from "./VendaModel";

export class VendaRepository implements IVendaRepository
{
    async findAll(): Promise<Venda[]>
    {
        const vendas = await VendaModel.findAll()

        return vendas
    }

    async findOne(id: number): Promise<Venda | null>
    {
        const venda = await VendaModel.findByPk(id)

        if(!venda) return null

        return venda
    }

    async create(venda: Venda): Promise<Venda>
    {
        const newVenda = await VendaModel.create(
        {
            id_produto: venda.id_produto,
            qtde: venda.qtde,
            total: venda.total
        })

        return newVenda
    }
}