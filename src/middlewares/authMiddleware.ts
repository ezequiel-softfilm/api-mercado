import { NextFunction, Request, Response } from "express"
import { JwtService } from "../models/Auth/services/JwtServices"

export interface AuthRequest extends Request
{
    usuarioId?: number
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) =>
{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        return res.status(401).json({ message: "Token não encontrado" })
    }

    const token = authHeader.split(" ")[1]

    try
    {
        const payload: any = JwtService.verifyToken(token)
        req.usuarioId = payload.id
        next()
    }
    catch(error: any)
    {
        return res.status(401).json({ message: error.message })
    }
}