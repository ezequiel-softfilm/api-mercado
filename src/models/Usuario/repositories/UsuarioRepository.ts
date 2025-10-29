import { Usuario } from "../entity/Usuario";
import { IUsuarioRepository } from "./IUsuarioRepository";
import { UsuarioModel } from "./UsuarioModel";

export class UsuarioRepository implements IUsuarioRepository
{
    async findAll(): Promise<Usuario[]>
    {
        const usuarios = await UsuarioModel.findAll()
        
        return usuarios
    }

    async findById(id: number): Promise<Usuario | null>
    {
        const usuario = await UsuarioModel.findByPk(id)

        if(!usuario) return null

        return usuario
    }

    async findByEmail(email: string): Promise<Usuario | null>
    {
        const usuario = await UsuarioModel.findOne({ where: { email }})

        if(!usuario) return null

        return usuario
    }

    async create(usuario: Usuario): Promise<Usuario>
    {
        const newUsuario = await UsuarioModel.create(
        {
            nome: usuario.nome,
            email: usuario.email,
            password: usuario.password,
            status: usuario.status
        })

        return newUsuario
    }
}