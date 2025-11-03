export enum ProdutoEnumAtivo
{
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export class Produto
{
    public id?: number
    public nome: string
    public descricao?: string
    public codigo_barras: string
    public preco_custo: number
    public preco_venda: number
    public estoque_atual: number
    public estoque_minimo: number
    public id_categoria: number
    public ativo: ProdutoEnumAtivo
    public criado_por?: number
    public criado_em?: Date
    public alterado_em?: Date 
    public deletado_em?: Date | null

    constructor(props:
    {
        nome: string,
        descricao?: string
        codigo_barras: string
        preco_custo: number
        preco_venda: number
        estoque_atual: number
        estoque_minimo: number
        ativo?: ProdutoEnumAtivo
        id_categoria: number
        criado_por?: number
    }, id?: number)
    {
        this.nome = props.nome
        this.descricao = props.descricao
        this.codigo_barras = props.codigo_barras
        this.preco_custo = props.preco_custo
        this.preco_venda = props.preco_venda
        this.estoque_atual = props.estoque_atual
        this.estoque_minimo = props.estoque_minimo
        this.id_categoria = props.id_categoria
        this.ativo = props.ativo || ProdutoEnumAtivo.Ativo
        this.criado_por = props.criado_por

        if(id) this.id = id
    }
}

