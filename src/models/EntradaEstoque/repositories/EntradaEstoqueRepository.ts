import { EntradaEstoque } from "../entity/EntradaEstoque";
import { EntradaEstoqueModel } from "./EntradaEstoqueModel";
import { IEntradaEstoqueRepository } from "./IEntradaEstoqueRepository";

export class EntradaEstoqueRepository implements IEntradaEstoqueRepository
{
    async findAll(): Promise<EntradaEstoque[]>
    {
        const entradas = await EntradaEstoqueModel.findAll()
        
        return entradas
    }

    async create(entradaEstoque: EntradaEstoque): Promise<EntradaEstoque>
    {
        const newEntrada = await EntradaEstoqueModel.create(
        {
            id_produto: entradaEstoque.id_produto,
            qtde: entradaEstoque.qtde
        })

        return newEntrada
    }
}