import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware";
import { UsuarioEnumTipo } from "../models/Usuario/entity/Usuario";
import { UsuarioRepository } from "../models/Usuario/repositories/UsuarioRepository";
import { FindByIdUsuarioUseCase } from "../models/Usuario/use-cases/FindByIdUsuario.use-case";

export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) =>
{
    if (!req.usuarioId) 
    {
        return res.status(401).json({ message: "Não autenticado" })
    }

    try 
    {
        const userRepo = new UsuarioRepository()
        const useCase = new FindByIdUsuarioUseCase(userRepo)
        const usuario = await useCase.execute(req.usuarioId)

        if (!usuario || usuario.tipo !== UsuarioEnumTipo.Administrador)
        {
            return res.status(403).json({ message: "Acesso negado, somente administradores" })
        }

        return next()
    } 
    catch (error: any)
    {
        console.error(error)
        return res.status(500).json({ message: "Erro ao validar o tipo de usuário" })
    }
};
