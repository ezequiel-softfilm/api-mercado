export enum FornecedorEnumAtivo
{
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export class Fornecedor
{
    public id?: number
    public nome: string
    public cnpj: string
    public telefone: string
    public email: string
    public endereco: string
    public ativo: FornecedorEnumAtivo
    public criado_por?: number
    public criado_em?: Date
    public alterado_em?: Date 
    public deletado_em?: Date | null
    
    constructor(props:
    {
        id?: number
        nome: string
        cnpj: string
        telefone: string
        email: string
        endereco: string
        ativo?: FornecedorEnumAtivo
        criado_por?: number       
    }, id?: number)
    {
        this.nome = props.nome
        this.cnpj = props.cnpj
        this.telefone = props.telefone
        this.email = props.email
        this.endereco = props.endereco
        this.criado_por = props.criado_por
        this.ativo = props.ativo || FornecedorEnumAtivo.Ativo

        if(id) this.id = id
    }
}