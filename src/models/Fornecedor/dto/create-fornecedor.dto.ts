export class CreateFornecedorDto
{
    nome: string
    cnpj: string
    telefone: string
    email: string
    endereco: string
    criado_por?: number

    constructor(data:
    {
        nome: string
        cnpj: string
        telefone: string
        email: string
        endereco: string
        criado_por?: number
    })
    {
        this.nome = data.nome
        this.cnpj = data.cnpj
        this.telefone = data.telefone
        this.email = data.email
        this.endereco = data.endereco
        this.criado_por = data.criado_por
    }
}