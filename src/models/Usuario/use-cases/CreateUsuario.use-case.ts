import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { Usuario, UsuarioEnumStatus } from "../entity/Usuario";
import { IUsuarioRepository } from "../repositories/IUsuarioRepository";
import bcrypt from "bcrypt"

export class CreateUsuarioUseCase
{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async execute(dto: CreateUsuarioDto): Promise<Usuario>
    {
        const existUser = await this.usuarioRepository.findByEmail(dto.email)

        if(existUser) throw new Error("E-mail já cadastrado.")

        const hashedPassword = await bcrypt.hash(dto.password, 10)
        
        const usuario = new Usuario(
        {
            nome: dto.nome,
            email: dto.email,
            password: hashedPassword,
            status: dto.status || UsuarioEnumStatus.Ativo
        })

        const newUsuario = await this.usuarioRepository.create(usuario)

        return newUsuario
    }
}