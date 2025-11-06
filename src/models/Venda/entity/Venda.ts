export enum VendaEnumStatus
{
    Aprovado = "Aprovado",
	Pendente = "Pendente",
	Reprovado = "Reprovado"
}

export class Venda
{
    public id?: number
    public id_produto: number
    public qtde: number
    public total?: number
    public referencia?: string
    public status?: string
    public criado_por?: number
    public criado_em?: Date
    public alterado_em?: Date 
    public deletado_em?: Date | null

    constructor(props:
    {
        id_produto: number
        qtde: number
        total?: number
        referencia?: string
        status?: string
        criado_por?: number
        criado_em?: Date
        alterado_em?: Date
        deletado_em?: Date | null
    }, id?: number)
    {
        if(!props.id_produto || props.id_produto < 0){ throw new Error("Produto Inválido")}
        if(!props.qtde || props.qtde <= 0 ){ throw new Error("Quantidade inválida.")}

        this.id_produto = props.id_produto
        this.qtde = props.qtde
        this.criado_por = props.criado_por
        this.status = props.status || VendaEnumStatus.Pendente
        this.referencia = props.referencia

        if(id) this.id = id
    }
}