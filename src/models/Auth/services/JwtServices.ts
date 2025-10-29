import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "default"

export class JwtService
{
    static generateToken(payload: object, expiresIn: "8h"): string
    {
        return jwt.sign(payload, JWT_SECRET, {expiresIn})
    }

    static verifyToken(token: string): any
    {
        try
        {
            return jwt.verify(token, JWT_SECRET)
        }
        catch(error: any)
        {
            throw new Error("Token inválido ou expirado")
        }
    }
}