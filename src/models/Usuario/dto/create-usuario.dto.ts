import { UsuarioEnumStatus } from "../entity/Usuario"

export class CreateUsuarioDto
{
    nome: string
    email: string
    password: string
    status?: UsuarioEnumStatus

    constructor(data:
    {
        nome: string
        email: string
        password: string
        status?: UsuarioEnumStatus
    })
    {
        this.nome = data.nome
        this.email = data.email
        this.password = data.password
        this.status = data.status
    }
}