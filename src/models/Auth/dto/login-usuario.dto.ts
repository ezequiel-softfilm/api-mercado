export class LoginUsuarioDto
{
    public email: string
    public password: string

    constructor(data:
    {
        email: string
        password: string
    })
    {
        if(!data.email || data.email.trim() === "") throw new Error("E-mail é obrigatório")
        if(!data.password || data.password.trim() === "") throw new Error("Senha é obrigatória")

        this.email = data.email
        this.password = data.password
    }
}