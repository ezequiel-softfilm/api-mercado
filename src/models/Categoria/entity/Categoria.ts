export enum CategoriaEnumAtivo
{
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export class Categoria
{
    public id?: number
    public nome: string
    public descricao?: string
    public ativo?: CategoriaEnumAtivo
    public criado_por?: number
    public criado_em?: Date
    public alterado_em?: Date 
    public deletado_em?: Date | null

    constructor(props:
    {
        nome: string
        descricao?: string
        ativo?: CategoriaEnumAtivo
        criado_por?: number
    }, id?: number)
    {
        this.nome = props.nome
        this.descricao = props.descricao
        this.ativo = props.ativo || CategoriaEnumAtivo.Ativo
        this.criado_por = props.criado_por

        if(id) this.id = id
    }
}