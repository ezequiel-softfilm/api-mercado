import { Request, Response } from "express";
import { IUsuarioRepository } from "../models/Usuario/repositories/IUsuarioRepository";
import { FindAllUsuarioUseCase } from "../models/Usuario/use-cases/FindAllUsuario.use-case";
import { FindByIdUsuarioUseCase } from "../models/Usuario/use-cases/FindByIdUsuario.use-case";
import { FindByEmailUsuarioUseCase } from "../models/Usuario/use-cases/FindByEmailUsuario.use-case";
import { CreateUsuarioDto } from "../models/Usuario/dto/create-usuario.dto";
import { CreateUsuarioUseCase } from "../models/Usuario/use-cases/CreateUsuario.use-case";

export class UsuarioController
{
    constructor(
        private usuarioRepository: IUsuarioRepository
    ){}

    async findAll(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const useCase = new FindAllUsuarioUseCase(this.usuarioRepository)
            const usuarios = await useCase.execute()

            return res.status(200).json(
            {
                message: "Lista de usuários",
                data: usuarios
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async findById(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)
            
            const useCase = new FindByIdUsuarioUseCase(this.usuarioRepository)
            const usuario = await useCase.execute(id)

            if(!usuario) return res.status(404).json({ message: "Usuário não encontrado." })

            return res.status(200).json(
            {
                message: "Detalhes de usuário",
                data: usuario
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async findByEmail(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const email = req.params.email

            const useCase = new FindByEmailUsuarioUseCase(this.usuarioRepository)
            const usuario = await useCase.execute(email)

            if(!usuario) return res.status(404).json({ message: "Usuário não encontrado." })

            return res.status(200).json(
            {
                message: "Detalhes de usuário",
                data: usuario
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
            const dto = new CreateUsuarioDto(req.body)

            const useCase = new CreateUsuarioUseCase(this.usuarioRepository)
            const usuario = await useCase.execute(dto)

            return res.status(201).json(
            {
                message: "Usuário criado com sucesso",
                data: usuario
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }
}