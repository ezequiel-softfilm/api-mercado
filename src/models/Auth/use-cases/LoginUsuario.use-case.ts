import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUsuarioRepository } from '../../Usuario/repositories/IUsuarioRepository'
import { LoginUsuarioDto } from '../dto/login-usuario.dto'

dotenv.config()

export class LoginUsuarioUseCase
{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async execute(dto: LoginUsuarioDto): Promise<{ token: string }>
    {
        const usuario = await this.usuarioRepository.findByEmail(dto.email)
        if(!usuario) throw new Error("Usuário ou senha incorreta.")

        const isPassword = await bcrypt.compare(dto.password, usuario.password)
        if(!isPassword) throw new Error("Usuário ou senha incorreta.")

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "8h"}
        )

        return { token }
    }
}