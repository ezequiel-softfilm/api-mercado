import { Usuario } from "../entity/Usuario";
import { IUsuarioRepository } from "../repositories/IUsuarioRepository";

export class FindByIdUsuarioUseCase
{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async execute(id: number): Promise<Usuario | null>
    {
        const usuario = await this.usuarioRepository.findById(id)

        return usuario
    }
}