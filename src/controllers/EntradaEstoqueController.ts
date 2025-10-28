import { Request, Response } from "express";
import { IEntradaEstoqueRepository } from "../models/EntradaEstoque/repositories/IEntradaEstoqueRepository";
import { FindAllEntradaEstoqueUseCase } from "../models/EntradaEstoque/use-cases/FindAllEntradaEstoque.use-case";
import { CreateEntradaEstoqueDto } from "../models/EntradaEstoque/dto/create-entradaEstoque.dto";
import { IProdutoRepository } from "../models/Produto/repositories/IProdutoRepository";
import { CreateEntradaEstoqueUseCase } from "../models/EntradaEstoque/use-cases/CreateEntradaEstoque.use-case";

export class EntradaEstoqueController
{
    constructor(
        private entradaEstoqueRepository: IEntradaEstoqueRepository,
        private produtoRepository: IProdutoRepository
    ){}

    async findAll(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const useCase = new FindAllEntradaEstoqueUseCase(this.entradaEstoqueRepository)
            const entradas = await useCase.execute()

            return res.status(200).json(
            {
                message: "Lista de todas as entrdas",
                data: entradas
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async create(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const dto = new CreateEntradaEstoqueDto(req.body)

            const useCase = new CreateEntradaEstoqueUseCase(
                this.entradaEstoqueRepository,
                this.produtoRepository
            )

            const entrada = await useCase.execute(dto)

            return res.status(201).json(
            {
                message: "Entrada de estoque registrada com sucesso",
                data: entrada
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }
}