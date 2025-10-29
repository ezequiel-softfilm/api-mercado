import { Usuario } from "../entity/Usuario";
import { IUsuarioRepository } from "../repositories/IUsuarioRepository";

export class FindAllUsuarioUseCase
{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async execute(): Promise<Usuario[]>
    {
        const usuarios = await this.usuarioRepository.findAll()

        return usuarios
    }
}