import { Usuario } from "../entity/Usuario";

export interface IUsuarioRepository
{
    findAll(): Promise<Usuario[]>
    findById(id: number): Promise<Usuario | null>
    findByEmail(email: string): Promise<Usuario | null>
    create(usuario: Usuario): Promise<Usuario>
}