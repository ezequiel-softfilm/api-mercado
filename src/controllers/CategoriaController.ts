import { Request, Response } from "express";
import { ICategoriaRepository } from "../models/Categoria/repositories/ICategoriaRepository";
import { Categoria } from "../models/Categoria/entity/Categoria";
import { FindAllCategoriaUseCase } from "../models/Categoria/use-cases/FindAllCategoria.use-case";
import { FindOneCategoriaUseCase } from "../models/Categoria/use-cases/FindOneCategoria.use-case";
import { CreateCategoriaDto } from "../models/Categoria/dto/create-categoria";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CreateCategoriaUseCase } from "../models/Categoria/use-cases/CreateCategoria.use-case";
import { UpdateCategoriaUseCase } from "../models/Categoria/use-cases/UpdateCategoria.use-case";
import { ExcluirCategoriaUseCase } from "../models/Categoria/use-cases/ExcluirCategoria.use-case";

export class CategoriaController
{
    constructor(private categoriaRepository: ICategoriaRepository){}

    async findAll(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const useCase = new FindAllCategoriaUseCase(this.categoriaRepository)
            const categorias = await useCase.execute()

            return res.status(200).json(
            {
                message: "Lista de todas as categorias",
                data: categorias
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)

            const useCase = new FindOneCategoriaUseCase(this.categoriaRepository)
            const categoria = await useCase.execute(id)

            if(!categoria) return res.status(404).json({ message : "Categoria não encontrada"})

            return res.status(200).json(
            {
                message: "Detalhes da categoria",
                data: categoria
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async create(req: AuthRequest, res: Response): Promise<Response>
    {
        try
        {
            const dto = new CreateCategoriaDto(req.body)
            dto.criado_por = req.usuarioId

            if(!dto.nome || dto.nome === "") throw new Error("Nome é obrigatório")
            
            const useCase = new CreateCategoriaUseCase(this.categoriaRepository)
            const categoria = await useCase.execute(dto)

            return res.status(201).json(
            {
                message: "Categoria criado com sucesso",
                data: categoria
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async update(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)
            const data = req.body

            const useCase = new UpdateCategoriaUseCase(this.categoriaRepository)
            const updateCategoria = await useCase.execute(id, data)

            if(!updateCategoria) throw new Error("Categoria não encontrado.")

            return res.status(200).json(
            {
                message: "Produto alterado com sucesso"
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async excluir(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)
            
            const useCase = new ExcluirCategoriaUseCase(this.categoriaRepository)
            const excluirCategoria = await useCase.execute(id)

            if(!excluirCategoria) throw new Error("Categoria não encontrado")

            return res.status(204).send()
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }
}