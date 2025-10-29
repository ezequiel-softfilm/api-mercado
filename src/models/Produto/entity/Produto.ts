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
    public preco_unitario: number
    public qtde_estoque: number
    public ativo: ProdutoEnumAtivo
    public criado_por?: number
    public criado_em?: Date
    public alterado_em?: Date 
    public deletado_em?: Date | null

    constructor(props:
    {
        nome: string,
        descricao?: string
        preco_unitario: number
        qtde_estoque: number
        ativo?: ProdutoEnumAtivo
        criado_por?: number
    }, id?: number)
    {
        this.nome = props.nome
        this.descricao = props.descricao
        this.preco_unitario = props.preco_unitario
        this.qtde_estoque = props.qtde_estoque
        this.ativo = props.ativo || ProdutoEnumAtivo.Ativo
        this.criado_por = props.criado_por

        if(id) this.id = id
    }
}

