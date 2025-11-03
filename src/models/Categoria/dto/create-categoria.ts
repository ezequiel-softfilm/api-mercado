export class CreateCategoriaDto
{
    nome: string
    descricao?: string
    criado_por?: number

    constructor(data:
    {
        nome: string
        descricao?: string
        criado_por?: number
    })
    {
        this.nome = data.nome
        this.descricao = data.descricao
        this.criado_por = data.criado_por
    }
}