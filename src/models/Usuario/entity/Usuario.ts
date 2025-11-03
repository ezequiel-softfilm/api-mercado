export enum UsuarioEnumStatus
{
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export enum UsuarioEnumTipo
{
    Administrador = "Administrador",
    Operador = "Operador",
    Visualizador = "Visualizador"
}

export class Usuario
{
    public id?: number
    public nome: string
    public email: string
    public password: string
    public status: UsuarioEnumStatus
    public tipo: UsuarioEnumTipo
    public criado_em?: Date
    public alterado_em?: Date
    public deletado_em?: Date | null

    constructor(props: 
    {
        nome: string
        email: string
        password: string
        status?: UsuarioEnumStatus
        tipo?: UsuarioEnumTipo
        criado_em?: Date
        alterado_em?: Date
        deletado_em?: Date | null
    }, id?: number)
    {
        if(!props.nome || props.nome.trim() === "") throw new Error("Nome é obrigatório")
        if(!props.email || props.email.trim() === "") throw new Error("E-mail é obrigatório")
        if(!props.password || props.password.trim() === "") throw new Error("Senha é obrigatório")

        this.nome = props.nome
        this.email = props.email
        this.password = props.password
        this.status = props.status || UsuarioEnumStatus.Ativo
        this.tipo = props.tipo || UsuarioEnumTipo.Visualizador

        if(id) this.id = id
    }
}