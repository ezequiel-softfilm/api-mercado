export class CompraItens
{
    public id?: number
    public id_compra: number
    public id_produto: number
    public quantidade: number
    public preco_unitario: number
    public subtotal?: number
    public criado_em?: Date
    public alterado_em?: Date
    public deletado_em?: Date | null

    constructor(props:
    {
        id_compra: number,
        id_produto: number,
        quantidade: number,
        preco_unitario: number,
        subtotal?: number
    }, id?: number)
    {
        this.id_compra = props.id_compra
        this.id_produto = props.id_produto
        this.quantidade = props.quantidade
        this.preco_unitario = props.preco_unitario
        this.subtotal = props.subtotal

        if(id) this.id = id
    }
}