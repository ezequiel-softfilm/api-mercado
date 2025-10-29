import { Request, Response } from "express";
import { IUsuarioRepository } from "../models/Usuario/repositories/IUsuarioRepository";
import { LoginUsuarioDto } from "../models/Auth/dto/login-usuario.dto";
import { LoginUsuarioUseCase } from "../models/Auth/use-cases/LoginUsuario.use-case";

export class AuthController
{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async login(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const dto = new LoginUsuarioDto(req.body)

            const useCase = new LoginUsuarioUseCase(this.usuarioRepository)
            const token = await useCase.execute(dto)
            
            return res.status(200).json({ token })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }
}