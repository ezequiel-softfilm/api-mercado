export class CreateProdutoDto
{
    nome: string
    descricao?: string
    preco_unitario: number
    qtde_estoque: number

    constructor(data:
    {
        nome: string
        descricao?: string
        preco_unitario: number
        qtde_estoque: number
    })
    {
        this.nome = data.nome
        this.descricao = data.descricao
        this.preco_unitario = data.preco_unitario
        this.qtde_estoque = data.qtde_estoque
    }
}