export class CreateProdutoDto
{
    nome: string
    descricao?: string
    codigo_barras: string
    preco_custo: number
    preco_venda: number
    estoque_atual: number
    estoque_minimo: number
    id_categoria: number
    criado_por?: number

    constructor(data:
    {
        nome: string
        descricao?: string
        codigo_barras: string
        preco_custo: number
        preco_venda: number
        estoque_atual: number
        estoque_minimo: number
        id_categoria: number
        criado_por?: number
    })
    {
        this.nome = data.nome
        this.descricao = data.descricao
        this.codigo_barras = data.codigo_barras
        this.preco_custo = data.preco_custo
        this.preco_venda = data.preco_venda
        this.estoque_atual = data.estoque_atual
        this.estoque_minimo = data.estoque_minimo
        this.id_categoria = data.id_categoria
        this.criado_por = data.criado_por
    }
}