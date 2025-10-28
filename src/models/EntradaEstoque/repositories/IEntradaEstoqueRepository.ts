import { EntradaEstoque } from "../entity/EntradaEstoque";

export interface IEntradaEstoqueRepository
{
    findAll(): Promise<EntradaEstoque[]>

    /**
     * Cria uma nova entrada no estoque
     * @param entradaEstoque 
     */
    create(entradaEstoque: EntradaEstoque): Promise<EntradaEstoque>
}