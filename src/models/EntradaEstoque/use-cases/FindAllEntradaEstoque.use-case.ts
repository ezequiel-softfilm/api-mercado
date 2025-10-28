import { EntradaEstoque } from "../entity/EntradaEstoque";
import { IEntradaEstoqueRepository } from "../repositories/IEntradaEstoqueRepository";

export class FindAllEntradaEstoqueUseCase
{
    constructor(private entradaEstoqueRepository: IEntradaEstoqueRepository){}
    
    async execute(): Promise<EntradaEstoque[]>
    {
        const entradas = await this.entradaEstoqueRepository.findAll()

        return entradas
    }
}