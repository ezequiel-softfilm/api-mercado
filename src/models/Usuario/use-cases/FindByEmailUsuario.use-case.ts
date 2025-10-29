import { Usuario } from "../entity/Usuario";
import { IUsuarioRepository } from "../repositories/IUsuarioRepository";

export class FindByEmailUsuarioUseCase
{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async execute(email: string): Promise<Usuario | null>
    {
        const usuario = await this.usuarioRepository.findByEmail(email)

        return usuario
    }
}