import { Request, Response } from "express";
import { IFornecedorRepository } from "../models/Fornecedor/repositories/IFornecedorRepository";
import { FindAllFornecedorUseCase } from "../models/Fornecedor/use-cases/FindAllFornecedor.use-case";
import { FindOneFornecedorUseCase } from "../models/Fornecedor/use-cases/FindOneFornecedor.use-case";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CreateFornecedorDto } from "../models/Fornecedor/dto/create-fornecedor.dto";
import { CreateFornecedorUseCase } from "../models/Fornecedor/use-cases/CreateFornecedor.use-case";
import { UpdateFornecedoUseCase } from "../models/Fornecedor/use-cases/UpdateFornecedor.use-case";
import { ExcluirFornecedorUseCase } from "../models/Fornecedor/use-cases/ExcluirFornecedor.use-case";

export class FornecedorController
{
    constructor(private fornecedorRepository: IFornecedorRepository){}

    async findAll(req: Request, res: Response ): Promise<Response>
    {
        try
        {
            const useCase = new FindAllFornecedorUseCase(this.fornecedorRepository)
            const fornecedores = await useCase.execute()

            return res.status(200).json(
            {
                message: "Lista de todos os fornecedores",
                data: fornecedores
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async findOne(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)

            const useCase = new FindOneFornecedorUseCase(this.fornecedorRepository)
            const fornecedor = await useCase.execute(id)

            if(!fornecedor) return res.status(404).json({ message: "Fornecedor não encontrado." })

            return res.status(200).json(
            {
                message: "Detalhes do fornecedor",
                data: fornecedor
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
            const dto = new CreateFornecedorDto(req.body)
            dto.criado_por = Number(req.usuarioId)

            const useCase = new CreateFornecedorUseCase(
                this.fornecedorRepository
            )

            const fornecedor = await useCase.execute(dto)

            return res.status(201).json(
            {
                message: "Fornecedor criado com sucesso.",
                data: fornecedor
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

            console.log(data)

            const useCase = new UpdateFornecedoUseCase(this.fornecedorRepository)
            const updateFornecedor = await useCase.execute(id, data)

            if(!updateFornecedor) return res.status(404).json({ message: "Fornecedor não encontrado"})

            return res.status(200).json(
            { 
                message: "Fornecedor alterado com sucesso."
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async excluir(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)

            const useCase = new ExcluirFornecedorUseCase(this.fornecedorRepository)
            const excluirFornecedor = await useCase.execute(id)

            if(!excluirFornecedor) return res.status(404).json({ message: "Fornecedor não encontrado."})

            return res.status(204).send()
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }
}