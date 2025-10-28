export class Venda
{
    public id?: number
    public id_produto: number
    public qtde: number
    public total?: number
    public criado_em?: Date
    public alterado_em?: Date 
    public deletado_em?: Date | null

    constructor(props:
    {
        id_produto: number
        qtde: number
        total?: number
        criado_em?: Date
        alterado_em?: Date
        deletado_em?: Date | null
    }, id?: number)
    {
        if(!props.id_produto || props.id_produto < 0){ throw new Error("Produto Inválido")}
        if(!props.qtde || props.qtde <= 0 ){ throw new Error("Quantidade inválida.")}

        this.id_produto = props.id_produto
        this.qtde = props.qtde

        if(id) this.id = id
    }
}