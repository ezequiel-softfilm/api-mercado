import { UsuarioEnumStatus, UsuarioEnumTipo } from "../entity/Usuario"

export class CreateUsuarioDto
{
    nome: string
    email: string
    password: string
    status?: UsuarioEnumStatus
    tipo?: UsuarioEnumTipo

    constructor(data:
    {
        nome: string
        email: string
        password: string
        status?: UsuarioEnumStatus
        tipo?: UsuarioEnumTipo
    })
    {
        this.nome = data.nome
        this.email = data.email
        this.password = data.password
        this.status = data.status
        this.tipo = data.tipo
    }
}